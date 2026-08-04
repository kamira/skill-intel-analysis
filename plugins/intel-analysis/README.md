# intel-analysis — intelligence-analysis methodology bundle

> 語言 / Language: [繁體中文](README.zh-tw.md) · **English**

A fidelity migration of the Notion workspace "SKILL Manager|分析方法論技能總管理" into an
installable plugin: a **ten-step framework from interests to action** (SKILL-01…12 core workflow
+ SKILL-13…20 extension modules), **23 mandatory core disciplines**, and a **file-based forecast
verification ledger** (version-chain snapshots, Brier calibration). Bilingual since
CHG-20260729-01: `.md` is English (default), `.zh-tw.md` is Traditional Chinese.

## Install (Claude Code)

```
/plugin marketplace add kamira/ai-skills
/plugin install intel-analysis@ai-skills
```

## Contents

| Component | Path | Description |
|-----------|------|-------------|
| SKILL.md | `skills/intel-analysis/` | Orchestrator: three workflows (current intelligence / deliberate analysis / tracking loop) + a 20-SKILL detection table + the 23-discipline index (a copy; the single source of truth is the top-level `skills/`) |
| references ×24 | `skills/intel-analysis/references/` | skill-01…20 + disciplines (full text) + tracking-loop (division of labour for the tracking cycle) + prediction-ledger (ledger specification) |
| Glossary | `skills/intel-analysis/assets/glossary.md` | Single source of truth for IC terminology: 繁中 ↔ established English ↔ source standard, with the literal renderings that must not be used |
| Ledger schema | `skills/intel-analysis/assets/` | prediction_entry.schema.json + estimative_language.json (estimative wording ↔ probability table) |
| Ledger tooling | `skills/intel-analysis/scripts/` | `prediction_lint.py` (fail-loud chain validation + INDEX generation) / `brier_report.py` (Brier + wording table + drift list) / `intel_loop.py` (per tracking cycle: chains due for coverage, windows expiring, cold-chain candidates, disposition records — **collection is the user's own**, see tracking-loop) |

## Standards alignment

Content is aligned to published intelligence standards, and terminology always uses the
established term of the discipline (see the glossary): **ICD 203 Analytic Standards**
(expression of uncertainty, alternative analysis, source descriptors, explanation of changes to
judgments), the **ICD 206 sourcing appendix** for Key Judgments, the **NATO Admiralty Code**
(source reliability A–F × information credibility 1–6), and **Structured Analytic Techniques**
(ACH, Red Team, Devil's Advocacy, MOM-POP-MOSES-EVE deception detection).

## Prediction ledger (file-based version chain)

Forecasts are written to the **target project's** `docs/intel/predictions/` — one JSON snapshot
per chain version (`P-YYYY-MMDD-NN[-vK].json`): historical snapshots are never overwritten, each
chain has exactly one latest, and v2+ must carry a version_note.

```
python3 skills/intel-analysis/scripts/prediction_lint.py --repo .          # chain validation (wire to pre-commit/CI)
python3 skills/intel-analysis/scripts/prediction_lint.py --repo . --index  # regenerate INDEX.md
python3 skills/intel-analysis/scripts/brier_report.py --repo .             # Brier calibration report
```

## Relationship to ai-sdlc-suite

Separate domain, separate install — intelligence analysis does not depend on development
governance. When both are installed, the knowledge and prediction ledgers do not interfere (each
has its own directory). The **ledger side** of the tracking loop is mechanised by `intel_loop.py`
(Disciplines 19–23); collection and interpretation remain the user's own (tracking-loop states the
division of labour explicitly).

## Provenance and canon

Migrated with fidelity from a Notion snapshot dated 2026-07-07; **this repo is canonical
thereafter**, and the original Notion pages are read-only reference. The existing Notion
prediction database is retained for lookup; every new forecast chain goes to the file ledger.
