# intel-analysis — 情報分析方法論大補帖

> 語言 / Language: **繁體中文** · [English](README.md)

把 Notion「SKILL Manager|分析方法論技能總管理」保真遷移為可安裝 plugin:**從利益到行動的十步驟框架**(SKILL-01〜12 核心流程 + SKILL-13〜20 擴展模組)、**23 條核心紀律**、**檔案化預測驗證帳本**(版本鏈快照、Brier 校準)。自 CHG-20260729-01 起雙語成對:`.md` 為英文(預設)、`.zh-tw.md` 為繁中。

## 安裝(Claude Code)

```
/plugin marketplace add kamira/ai-skills
/plugin install intel-analysis@ai-skills
```

## 內容物

| 元件 | 路徑 | 說明 |
|------|------|------|
| SKILL.md | `skills/intel-analysis/` | orchestrator:三流程(快情報/慢情報/追蹤循環)+ 20 skill 偵測表 + 23 紀律索引(複本;單一真相在 repo 頂層 `skills/`) |
| references ×24 | `skills/intel-analysis/references/` | skill-01〜20 + disciplines(紀律全文)+ tracking-loop(追蹤循環分工)+ prediction-ledger(帳本規範) |
| 術語表 | `skills/intel-analysis/assets/glossary.md` | IC 術語單一真相:繁中 ↔ 正式英文 ↔ 出處標準,並列出禁用的直翻版本 |
| 預測帳本 schema | `skills/intel-analysis/assets/` | prediction_entry.schema.json + estimative_language.json(措辭↔機率表) |
| 帳本工具 | `skills/intel-analysis/scripts/` | `prediction_lint.py`(fail-loud 鏈驗證+INDEX 生成)/`brier_report.py`(Brier+措辭對表+漂移清單)/`intel_loop.py`(每回合盤點:待覆蓋鏈/視窗到期/冷鏈候選/處置記錄——**資訊獲取由使用者自理**,見 tracking-loop) |

## 標準對齊

內容對齊既有情報學標準,術語一律採該領域正式用語(見術語表):ICD 203 分析工藝標準(不確定性表述、替代分析、來源描述、判斷變化解釋)、ICD 206 關鍵判斷來源附錄、NATO Admiralty 評級(來源可靠度 A–F × 內容確認度 1–6)、SAT 結構化技法(ACH、紅隊、對手代言人、MOM-POP-MOSES-EVE 欺騙偵測)。

## 預測驗證帳本(檔案化版本鏈)

預測落在**目標專案** `docs/intel/predictions/`,一鏈版本一 JSON 快照(`P-YYYY-MMDD-NN[-vK].json`):歷史快照不可覆蓋、每鏈單一 latest、v2+ 必附 version_note。

```
python3 skills/intel-analysis/scripts/prediction_lint.py --repo .          # 鏈驗證(可接 pre-commit/CI)
python3 skills/intel-analysis/scripts/prediction_lint.py --repo . --index  # 重生 INDEX.md
python3 skills/intel-analysis/scripts/brier_report.py --repo .             # Brier 校準報告
```

## 與 ai-sdlc-suite 的關係

獨立領域、獨立安裝——情報分析不相依開發治理。若同時安裝,knowledge/預測帳本互不干涉(各自目錄)。追蹤循環的**帳本側**已由 `intel_loop.py` 機械化(紀律 19-23);資訊獲取與判讀由使用者自理(tracking-loop 明定分工)。

## 來源與正典

自 Notion 2026-07-07 快照保真遷移;遷移後**以本 repo 為正典**,Notion 原頁轉唯讀查閱。既有 Notion 預測資料庫保留查閱,新預測鏈一律落檔案帳本。
