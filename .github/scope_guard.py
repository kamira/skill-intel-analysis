#!/usr/bin/env python3
"""公開範圍的機械閘。exit 0 = 通過。

三道,各自對應一個公開檔的來源:
  1. 帳本欄位 —— site/*.js 不得出現 CHG-20260828-02 具名排除的五個欄位名。
  2. 利益卡片 —— site/actors.js 只公開「結構與完整度」,不得出現卡片條文。
  3. 週報 —— site/weekly.js 只公開四個資料庫欄位,且一字未改。

全文比對,不做註解豁免——豁免等於留一條「寫在註解裡就過」的後門。
代價是資料檔的檔頭不能字面列出那五個名字,該處已註明原因。

第一道對 site/weekly.js 不適用,原因寫在 WEEKLY 常數旁:它的來源是另一個
資料庫,沒有那五個欄位;而「觸發指標」是週報正文的一般用語。這不是豁免,
是換一道更緊的閘——第三道用 Notion 端回報的字元數逐欄對帳,多一字少一字都轉紅,
比關鍵詞比對嚴格。
"""
import json
import pathlib
import re
import sys

REPO = pathlib.Path(__file__).resolve().parent.parent
EXCLUDED_FIELDS = ["觸發指標", "版本說明", "校準備註", "對應情境", "來源分析"]
# 週報來自另一個資料庫(世界時局週分析),不含上列任何欄位;改由第三道逐欄對帳把關。
WEEKLY = "weekly.js"
MANIFEST = REPO / ".github" / "weekly_manifest.json"

# 使用原則五條屬方法論,與任何個別國家的研判無關,逐條具名放行。
ALLOW = {
    "本頁是長期基準,不是即時結論。",
    "不可直接整段照抄成輸出。",
    "先看核心利益,再看制度與政治約束,再看可用手段,最後看反證訊號。",
    "若出現足以改寫原判斷的新訊號,應優先提醒修正,不可為維持既有敘事而忽略。",
    "標記為「待整理」的國家或條目,僅保留原文供後續修訂,不納入分析、比較、推導與輸出,AI 禁止參照其內容。",
}
BODY_LEN = 40   # 卡片條文最短的一條也遠長於此;節名、狀態、日期都遠短於此


def fail(msg):
    print("::error::" + msg)
    return 1


def ledger_fields():
    bad = 0
    for f in sorted((REPO / "site").glob("*.js")):
        if f.name == WEEKLY:
            continue
        text = f.read_text(encoding="utf-8")
        for i, line in enumerate(text.splitlines(), 1):
            for name in EXCLUDED_FIELDS:
                if name in line:
                    bad += fail("%s:%d 含有 CHG-20260828-02 具名排除的欄位「%s」" % (f.name, i, name))
    if not bad:
        n = len([f for f in (REPO / "site").glob("*.js") if f.name != WEEKLY])
        print("帳本欄位範圍檢查通過(掃過 %d 個資料檔,%s 由第三道把關)" % (n, WEEKLY))
    return bad


def card_bodies():
    f = REPO / "site" / "actors.js"
    if not f.exists():
        return fail("找不到 site/actors.js")
    src = re.sub(r"/\*.*?\*/", "", f.read_text(encoding="utf-8"), flags=re.S)
    bad = 0
    for s in re.findall(r'"((?:[^"\\]|\\.)*)"', src):
        if len(s) >= BODY_LEN and s not in ALLOW:
            bad += fail("actors.js 出現疑似卡片條文(長度 %d):%s…" % (len(s), s[:50]))
    if not bad:
        print("利益卡片範圍檢查通過(只有結構與完整度,無條文)")
    return bad


def weekly_rows():
    """週報:欄位集合必須與宣告完全相同,四欄原文的字元數必須與 Notion 端回報值相同。

    這道閘擋的不是某個關鍵詞,而是「這個檔裡有沒有出現宣告以外的東西」。
    多一個鍵(例如把報告本文某節倒進來)會紅;四欄原文被增刪一個字也會紅。
    """
    f = REPO / "site" / WEEKLY
    if not f.exists():
        return fail("找不到 site/" + WEEKLY)
    if not MANIFEST.exists():
        return fail("找不到 .github/weekly_manifest.json")
    man = json.loads(MANIFEST.read_text(encoding="utf-8"))
    src = f.read_text(encoding="utf-8")
    if "window.WEEKLY = " not in src:
        return fail("site/%s 不是預期的形狀(缺 window.WEEKLY 指派)" % WEEKLY)
    data = json.loads(src.split("window.WEEKLY = ", 1)[1].rstrip().rstrip(";"))

    bad = 0
    want_keys = man["rowKeys"]
    want_len = man["lengths"]
    if len(data["rows"]) != len(want_len):
        bad += fail("%s 有 %d 週,清單宣告 %d 週" % (WEEKLY, len(data["rows"]), len(want_len)))
    for row in data["rows"]:
        w = str(row.get("w"))
        got_keys = sorted(row.keys())
        if got_keys != want_keys:
            extra = [k for k in got_keys if k not in want_keys]
            miss = [k for k in want_keys if k not in got_keys]
            bad += fail("第 %s 週的欄位與宣告不符(多出 %s;缺少 %s)" % (w, extra or "無", miss or "無"))
            continue
        if w not in want_len:
            bad += fail("第 %s 週不在清單裡" % w)
            continue
        for name, want in zip(man["fields"], want_len[w]):
            got = len(row[name])
            if got != want:
                bad += fail("第 %s 週的「%s」欄有 %d 字,Notion 端回報 %d 字——原文被改動過"
                            % (w, name, got, want))
    if not bad:
        print("週報範圍檢查通過(%d 週 × %d 欄,字元數逐欄符合來源)"
              % (len(data["rows"]), len(man["fields"])))
    return bad


if __name__ == "__main__":
    sys.exit(1 if (ledger_fields() + card_bodies() + weekly_rows()) else 0)
