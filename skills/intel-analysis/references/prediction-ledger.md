---
name: prediction-ledger
description: >
  The versioning mechanism of the prediction ledger (file-based): one JSON snapshot per chain
  version, historical snapshots never overwritten, exactly one latest per chain, versions strung
  together by chain_root for Brier calibration. Read this when logging a forecast in SKILL-09,
  updating observations in SKILL-10, backtesting in SKILL-12, or running a chain-coverage tracking
  cycle (Disciplines 19–23). Includes the Notion 中文欄名 ↔ JSON English key mapping.
---

# prediction-ledger — the prediction ledger (version-chain snapshots)

> 語言 / Language: [繁體中文](prediction-ledger.zh-tw.md) · **English**

> **Governing principle: a historical snapshot is never overwritten.** Every forecast is a
> **version chain** strung together by `chain_root` (the original forecast ID). When a new signal
> arrives you do not edit the old snapshot; you create a new snapshot file and mark the old one
> superseded. This preserves each period's judgment for Brier scoring and calibration backtesting.

## Location and file form

Under the target project's `docs/intel/predictions/`, **one JSON file per chain version**, named
after the snapshot id:

```
docs/intel/predictions/
├── INDEX.md                    # generated (prediction_lint.py --index); never hand-edit
├── P-2026-0520-03.json         # first snapshot (version 1)
├── P-2026-0520-03-v2.json      # version 2 of the same chain
└── archive/                    # verified / invalidated chains may be archived (optional)
```

JSON in split files, for the same reason knowledge records are split: parsing is binary — it
succeeds, or it fails loudly; git can merge it, the AI can read it directly, and the diff is
auditable.

## ID naming

- **First instance**: `P-YYYY-MMDD-NN` (e.g. `P-2026-0520-03`)
- **Subsequent versions**: `original ID + -v{sequence}` (e.g. `P-2026-0519-03-v2`, `-v3`…). The suffix always matches `version_seq`

## Fields (JSON English key ↔ original Notion column)

| JSON key | Notion column | Meaning |
|----------|---------------|---------|
| `id` | 預測 ID | = the filename; `P-YYYY-MMDD-NN` first, `-vK` thereafter |
| `chain_root` | 原始預測 ID | The chain's first-instance ID; shared by every version; for the first instance, its own id |
| `prev_id` | 前版 ID | The id of the immediately preceding version; null for version 1 |
| `version_seq` | 版本序 | 1 for the first instance, +1 per snapshot |
| `version_status` | 版本狀態 | `latest` / `superseded` / `verified` / `invalidated`. **At any moment a chain has exactly one latest or one terminal state** |
| `version_note` | 版本說明 | The triggering signal or reason for this snapshot, in one sentence; **mandatory for v≥2** (Discipline 18 narrative-drift detection) |
| `tracking_status` | 追蹤狀態 | `active` / `observing` / `dormant` / `verified` / `invalidated` |
| `statement` | 預測內容 | The scenario, in testable wording |
| `probability` | 機率 | Integer %, in **5-point increments** (Discipline 6); where wording conflicts, the % governs (Discipline 16) |
| `wording` | 機率措辭 | Optional: almost certain / very likely / likely / roughly even / unlikely / very unlikely / almost certainly not (mapping in assets/estimative_language.json) |
| `key_assumptions` | 關鍵假設 | Array; each must pass the falsifiability self-check (Discipline 14) |
| `triggers` | 觸發條件 | Array; which signals indicate movement toward this scenario |
| `indicators` | 觀測指標 | Array; used for SKILL-10 verification |
| `window` | 驗證視窗 | `{"start": "YYYY-MM-DD", "end": "YYYY-MM-DD"}` |
| `source_analysis` | 來源分析 | The analysis product or CHG reference that created this snapshot |
| `outcome` | 實際結果 | Filled at verification: `{"result": "...", "value": 0 or 1, "calibration_note": "..."}` |
| `tags` / `actors` | (topic / actors) | Arrays of lower-case retrieval keys; the matching axes for chain coverage (Discipline 19) and theatre scanning (Discipline 22) |

## Procedure

1. **First instance**: create a new file. `chain_root = id`; `version_seq = 1`; `version_status = "latest"`; `prev_id = null`.
2. **Update (a new signal on an existing forecast)**:
   1. **Create a new snapshot file** (**editing an existing file is forbidden**). Give `id` the version suffix; `chain_root =` the chain root; `prev_id =` the previous version's id; `version_seq =` previous + 1; `version_status = "latest"`; `source_analysis =` this cycle's analysis; `version_note =` a one-sentence reason.
   2. **Change the previous version's** `version_status` from `latest` to `superseded` (the only field on an old file that may ever be touched — this field only, this value only).
3. **Verification**: fill `outcome` on the latest version and set `version_status` to `verified` and `tracking_status` to `verified`. Historical snapshots keep `superseded` and are not touched.
4. **Invalidation**: when a forecast's premise is fundamentally disproved, set the latest version's `version_status` to `invalidated`.

## How SKILL-12 calibration reads the ledger

- Backtesting indexes chains by `chain_root` and computes the Brier score from the probability and actual outcome of the **last non-superseded version** in the chain (usually `verified`); `brier_report.py` automates this.
- Narrative-drift detection checks whether each probability change across a chain's versions is backed by a `version_note`; a version without one is non-compliant (the linter enforces this for v≥2).
- The comparison-and-revision section of a situation assessment strings the whole chain by `chain_root`, showing the full v1 → v2 → … → latest evolution.

## Machine support

```
python3 scripts/prediction_lint.py --repo .            # fail-loud: missing field / bad enum / id≠filename / broken chain / multiple latest / probability off the 5% grid / v2+ missing note → blocked
python3 scripts/prediction_lint.py --repo . --index    # regenerate INDEX.md; --check verifies freshness
python3 scripts/brier_report.py --repo .               # Brier + wording table (Discipline 16) + drift list (Discipline 18)
```
