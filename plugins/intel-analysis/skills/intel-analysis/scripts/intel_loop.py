#!/usr/bin/env python3
"""
intel_loop.py — 追蹤循環 runner(紀律 19-23 的帳本側狀態機;intel-analysis)

機制的單位是**盤點回合(tracking cycle)**,不是日曆天——節奏(每日/每週/事件驅動)由使用者
決定,危機期間一天跑數回合亦成立。紀律 21 的「連續 3 次真無訊號」數的是回合。

分工邊界:**資訊獲取由使用者自理**——本工具零網路、零搜尋,只做:
  盤點清單(該覆蓋的鏈+查證關鍵詞)/ 視窗到期清單(紀律 23)/ 真空偵測(紀律 20)/
  冷鏈候選計算(紀律 21:連續 3 個盤點回合 A)/ 處置結果記錄(append-only,紀律 19d)。

用法:
  python3 intel_loop.py new    --repo .                       # 宣告新回合(建本回合 coverage 檔)
  python3 intel_loop.py status --repo .                       # 機器可讀狀態(JSON)
  python3 intel_loop.py brief  --repo . [--date YYYY-MM-DD]   # 本回合盤點簡報(人讀)
  python3 intel_loop.py log    --repo . --chain P-… --outcome A|B|C|D [--note "…"] [--cycle N]

退出碼:0 正常 | 1 錯誤 | 2 coverage 檔格式無效或回合序號衝突
"""
from __future__ import annotations
import argparse
import json
import re
import sys
from datetime import date
from pathlib import Path

# 釘住輸出編碼(CHG-20260803-01 T1):不依賴主控台/locale 的 ambient 編碼。
# 非 UTF-8 主控台(如 Windows cp932)印 CJK/emoji 會 UnicodeEncodeError;
# 釘住後同一份程式在任何平台的輸出行為一致。errors="replace" 確保永不因輸出而崩潰。
for _stream in (sys.stdout, sys.stderr):
    if hasattr(_stream, "reconfigure"):
        _stream.reconfigure(encoding="utf-8", errors="replace")

OUTCOMES = ("A", "B", "C", "D")
COLD_STREAK = 3  # 紀律 21:連續 3 個盤點回合真無訊號 → 冷鏈候選
OPEN_TRACKING = ("active", "observing")  # 待覆蓋盤點的追蹤狀態(紀律 19)
# coverage 檔名:YYYY-MM-DD-NN(NN=當日回合序號);舊格式 YYYY-MM-DD 讀為該日第 01 回合
COV_NAME = re.compile(r"^(\d{4}-\d{2}-\d{2})(?:-(\d{2,}))?$")


def cov_path(cdir: Path, day: str, cycle: int) -> Path:
    return cdir / f"{day}-{cycle:02d}.json"


def parse_cov_name(stem: str):
    """回傳 (date, cycle) 或 None(非 coverage 檔名)。舊格式無序號 → 視為第 1 回合。"""
    m = COV_NAME.match(stem)
    if not m:
        return None
    return m.group(1), int(m.group(2) or 1)


def load_chains(pdir: Path):
    """回傳 {chain_root: tip}(tip=版本序最大的快照;壞檔交給 prediction_lint,此處跳過)。"""
    chains = {}
    for f in sorted(pdir.glob("*.json")):
        try:
            d = json.loads(f.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            continue
        root = d.get("chain_root") or d.get("id")
        if not root:
            continue
        cur = chains.get(root)
        if cur is None or d.get("version_seq", 1) > cur.get("version_seq", 1):
            chains[root] = d
    return chains


def load_coverage(cdir: Path):
    """回傳依 (日期, 回合) 排序的 [((date, cycle), {chain: outcome})];格式錯/衝突 → (None, 訊息)。"""
    cycles, seen = [], {}
    for f in sorted(cdir.glob("*.json")):
        key = parse_cov_name(f.stem)
        if key is None:
            continue  # 非 coverage 命名的檔案不參與盤點計數
        if key in seen:
            return None, (f"回合序號衝突:{seen[key]} 與 {f.name} 同為 {key[0]} 第 {key[1]:02d} 回合"
                          "(舊格式無序號檔視為第 01 回合;請將其一改名)")
        seen[key] = f.name
        try:
            d = json.loads(f.read_text(encoding="utf-8"))
            entries = {e["chain"]: e["outcome"] for e in d["entries"]}
        except (json.JSONDecodeError, KeyError, TypeError):
            return None, f"coverage 檔格式無效:{f.name}(見 tracking-loop coverage 檔格式)"
        cycles.append((key, entries))
    cycles.sort(key=lambda x: x[0])
    return cycles, None


def latest_cycle(cdir: Path, day: str) -> int:
    """該日已存在的最大回合序號;無則 0。"""
    if not cdir.is_dir():
        return 0
    got = [parse_cov_name(f.stem) for f in cdir.glob("*.json")]
    return max([g[1] for g in got if g and g[0] == day] or [0])


def analyze(repo: Path, today: str):
    pdir = repo / "docs" / "intel" / "predictions"
    cdir = repo / "docs" / "intel" / "coverage"
    chains = load_chains(pdir) if pdir.is_dir() else {}
    cycles, bad = load_coverage(cdir) if cdir.is_dir() else ([], None)
    if bad:
        return None, bad

    to_cover, window_due, dormant, cold_candidates = [], [], [], []
    recent = [entries for _, entries in cycles[-COLD_STREAK:]]
    for root, tip in sorted(chains.items()):
        vs, ts = tip.get("version_status"), tip.get("tracking_status", "active")
        keys = {"tags": tip.get("tags", []), "actors": tip.get("actors", []),
                "indicators": tip.get("indicators", [])}
        if ts == "dormant":
            dormant.append({"chain": root, "keywords": keys, "statement": tip.get("statement", "")})
            continue
        if vs != "latest" or ts not in OPEN_TRACKING:
            continue  # verified/invalidated/superseded 不入盤點(紀律 19 範圍)
        end = (tip.get("window") or {}).get("end", "")
        item = {"chain": root, "tip": tip["id"], "probability": tip.get("probability"),
                "statement": tip.get("statement", ""), "keywords": keys, "window_end": end}
        to_cover.append(item)
        if end and end <= today:
            window_due.append({**item, "action": "紀律 23:主動查證結案;仍真空 → 處置 D(紀律 20 延續性估計)"})
        if len(recent) == COLD_STREAK and all(root in e and e[root] == "A" for e in recent):
            cold_candidates.append({"chain": root, "reason": f"最近 {COLD_STREAK} 個盤點回合皆 A(真無訊號)",
                                    "action": "確認後將 latest 的 tracking_status 改 dormant(就地更新)"})
    return {"date": today, "cycles_recorded": len(cycles), "chains_total": len(chains),
            "to_cover": to_cover, "window_due": window_due,
            "cold_candidates": cold_candidates, "dormant": dormant}, None


def cmd_new(args) -> int:
    repo = Path(args.repo).resolve()
    cdir = repo / "docs" / "intel" / "coverage"
    cdir.mkdir(parents=True, exist_ok=True)
    cycle = latest_cycle(cdir, args.date) + 1
    f = cov_path(cdir, args.date, cycle)
    f.write_text(json.dumps({"date": args.date, "cycle": cycle, "entries": []},
                            ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"✅ 開啟盤點回合 {args.date} 第 {cycle:02d} 回合 → {f.name}")
    print("   本回合的 log 皆記入此檔;要另起一輪請再跑一次 new。")
    return 0


def cmd_status(args) -> int:
    result, err = analyze(Path(args.repo).resolve(), args.date)
    if err:
        print(f"ERROR: {err}")
        return 2
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


def cmd_brief(args) -> int:
    repo = Path(args.repo).resolve()
    result, err = analyze(repo, args.date)
    if err:
        print(f"ERROR: {err}")
        return 2
    r = result
    cur = latest_cycle(repo / "docs" / "intel" / "coverage", args.date)
    tag = f"{args.date} 第 {cur:02d} 回合" if cur else f"{args.date}(本日尚未開回合,log 將自動開第 01 回合)"
    print(f"# 盤點回合簡報 — {tag}(鏈總數 {r['chains_total']},已記錄回合 {r['cycles_recorded']};"
          "資訊獲取由你自理,本簡報只列「該查什麼」)")
    print(f"\n## 待覆蓋鏈({len(r['to_cover'])})——逐鏈以你的資料源查證,處置 A/B/C/D 後 log")
    for c in r["to_cover"]:
        kw = ", ".join(c["keywords"]["tags"] + c["keywords"]["actors"] + c["keywords"]["indicators"][:3])
        print(f"  - {c['chain']}(p={c['probability']}%,window.end={c['window_end'] or '—'}):{c['statement'][:50]}")
        print(f"    查證關鍵詞:{kw or '(無——建議補 tags/indicators)'}")
    print(f"\n## 視窗到期待結案({len(r['window_due'])})(紀律 23/20)")
    for c in r["window_due"]:
        print(f"  - {c['chain']}(end={c['window_end']}):{c['action']}")
    print(f"\n## 冷鏈候選({len(r['cold_candidates'])})(紀律 21;連續 {COLD_STREAK} 回合皆 A;降階由你確認)")
    for c in r["cold_candidates"]:
        print(f"  - {c['chain']}:{c['reason']} → {c['action']}")
    print(f"\n## 休眠鏈({len(r['dormant'])})——你本回合的資料若命中其關鍵詞,依紀律 21 喚醒")
    for c in r["dormant"]:
        kw = ", ".join(c["keywords"]["tags"] + c["keywords"]["actors"])
        print(f"  - {c['chain']}:{kw or '(無關鍵詞)'}")
    return 0


def cmd_log(args) -> int:
    if args.outcome not in OUTCOMES:
        print(f"ERROR: outcome 須為 {OUTCOMES}(紀律 19d 四類處置)")
        return 1
    repo = Path(args.repo).resolve()
    cdir = repo / "docs" / "intel" / "coverage"
    cdir.mkdir(parents=True, exist_ok=True)
    cycle = args.cycle if args.cycle else max(latest_cycle(cdir, args.date), 1)
    f = cov_path(cdir, args.date, cycle)
    if not f.is_file() and cycle == 1:
        legacy = cdir / f"{args.date}.json"  # 舊格式無序號檔即該日第 01 回合,就地續寫
        if legacy.is_file():
            f = legacy
    data = {"date": args.date, "cycle": cycle, "entries": []}
    if f.is_file():
        try:
            data = json.loads(f.read_text(encoding="utf-8"))
        except json.JSONDecodeError as e:
            print(f"ERROR: 本回合 coverage 檔解析失敗(fail-loud):{e}")
            return 2
    data.setdefault("date", args.date)
    data["cycle"] = cycle
    data["entries"] = [e for e in data.get("entries", []) if e.get("chain") != args.chain]
    data["entries"].append({"chain": args.chain, "outcome": args.outcome, "note": args.note or ""})
    f.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"✅ {args.date} 第 {cycle:02d} 回合記錄:{args.chain} → {args.outcome}(共 {len(data['entries'])} 鏈)")
    return 0


def main(argv) -> int:
    ap = argparse.ArgumentParser(description="intel-analysis 追蹤循環 runner(帳本側;零網路;單位=盤點回合)")
    sub = ap.add_subparsers(dest="cmd", required=True)
    for name in ("new", "status", "brief", "log"):
        p = sub.add_parser(name)
        p.add_argument("--repo", default=".")
        p.add_argument("--date", default=date.today().isoformat())
        if name == "log":
            p.add_argument("--chain", required=True)
            p.add_argument("--outcome", required=True)
            p.add_argument("--note", default="")
            p.add_argument("--cycle", type=int, default=0, help="指定回合序號;預設為當日最新回合")
    args = ap.parse_args(argv[1:])
    try:
        return {"new": cmd_new, "status": cmd_status, "brief": cmd_brief, "log": cmd_log}[args.cmd](args)
    except FileNotFoundError as e:
        print(f"ERROR: {e}")
        return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv))
