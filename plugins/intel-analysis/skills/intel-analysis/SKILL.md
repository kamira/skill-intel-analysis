---
name: intel-analysis
description: >
  Intelligence-analysis methodology (a ten-step framework from interests to action): problem
  definition → fact baseline → actor analysis → options screening → attribution & interest
  calibration → decision preferences → second-order effects → scenario forecasting → indicators
  → intelligence gaps, plus source-credibility rating, calibration backtesting, and six extension
  modules (quantitative / narrative / institutional / historical analogy / supply chain /
  structural trends). Use this for intelligence analysis, geopolitical assessment, actor-intent
  analysis, scenario forecasting and probability estimation, indicator tracking, forecast
  backtesting (Brier), and narrative analysis. Invoke a single SKILL, run the full deliberate
  workflow, or take the quick-turn current-intelligence path; every forecast is logged to a
  file-based version-chain ledger (docs/intel/predictions/). 23 core disciplines are mandatory.
metadata:
  version: 1.3.0
---

# intel-analysis — analytic methodology skill manager

> 語言 / Language: [繁體中文](SKILL.zh-tw.md) · **English**

> Migrated with fidelity from Notion "SKILL Manager|分析方法論技能總管理" (2026-07-07 snapshot);
> this repo is canonical thereafter. Terminology follows [`assets/glossary.md`](assets/glossary.md)
> — established discipline terms, never literal back-translation.

## Overview

This skill is the modular entry point for "a shared analytic methodology: a ten-step framework
from interests to action". Each SKILL maps to one step or systemic layer of that framework and
can be invoked on its own or in combination.

**Standards alignment**: ICD 203 Analytic Standards (expression of uncertainty / alternative
analysis / source descriptors / explanation of changes to judgments), the estimative-language
mapping table (Discipline 16), the NATO Admiralty Code A–F × 1–6 (SKILL-03, with legacy-scale
mapping), ICD 206 sourcing appendix for Key Judgments (SKILL-11), and Structured Analytic
Techniques (ACH / Red Team / Devil's Advocacy / MOM-POP-MOSES-EVE deception detection).

## How to use

- **Single step**: name the SKILL number — e.g. "run SKILL-04 actor analysis over this material"
- **Full workflow**: SKILL-01 → SKILL-11 in order; suited to deliberate analysis
- **Quick-turn path (current intelligence)**: SKILL-01 → SKILL-02 → SKILL-04 → SKILL-09 →
  SKILL-10, then mark the product an **initial assessment**
- **Systemic reinforcement**: add SKILL-03 (source rating), SKILL-08b (cross-domain matrix),
  SKILL-10b (holding file), SKILL-12 (backtesting) at the matching step

## Detect → load (SKILL index)

| No. | Name | Step / layer | Core question | Load |
|-----|------|--------------|---------------|------|
| SKILL-01 | Problem definition & scoping | Step 1 | What is this analysis answering? | [`references/skill-01-problem-definition.md`](references/skill-01-problem-definition.md) |
| SKILL-02 | Fact baseline & background | Step 2 | What is established fact? | [`references/skill-02-fact-baseline.md`](references/skill-02-fact-baseline.md) |
| SKILL-03 | Source reliability & information credibility | Systemic layer A | Is this reporting credible? | [`references/skill-03-credibility-rating.md`](references/skill-03-credibility-rating.md) |
| SKILL-04 | Actor analysis | Step 3 | Who is in play, and what do they want? | [`references/skill-04-actor-analysis.md`](references/skill-04-actor-analysis.md) |
| SKILL-05 | Options screening | Step 4 | What cards are on the table? | [`references/skill-05-option-screening.md`](references/skill-05-option-screening.md) |
| SKILL-06 | Attribution & interest calibration | Step 5 | Why this option? | [`references/skill-06-attribution-calibration.md`](references/skill-06-attribution-calibration.md) |
| SKILL-07 | Decision preferences & probability adjustment | Step 6 | Which card do they most likely play? | [`references/skill-07-decision-preference.md`](references/skill-07-decision-preference.md) |
| SKILL-08 | Second-order & cascading effects | Step 7 + layer B | How does the board change afterwards? | [`references/skill-08-chain-reaction.md`](references/skill-08-chain-reaction.md) |
| SKILL-09 | Scenario forecasting | Step 8 | Where could this go, at what probability? | [`references/skill-09-scenario-forecast.md`](references/skill-09-scenario-forecast.md) |
| SKILL-10 | Indicator management (I&W) | Step 9 + layer C | Which signals confirm or break the scenario? | [`references/skill-10-indicator-management.md`](references/skill-10-indicator-management.md) |
| SKILL-11 | Intelligence gaps statement | Step 10 | Where is the analysis solid, where fragile? | [`references/skill-11-gap-statement.md`](references/skill-11-gap-statement.md) |
| SKILL-12 | Calibration & backtesting | Systemic layer E | Were past forecasts accurate? Where is the bias? | [`references/skill-12-calibration-backtest.md`](references/skill-12-calibration-backtest.md) |
| SKILL-13 | Quantitative reading | Extension | Is this change structural or noise? | [`references/skill-13-quantitative-reading.md`](references/skill-13-quantitative-reading.md) |
| SKILL-14 | Narrative tracking | Extension | What story is each side telling? Has it shifted? | [`references/skill-14-narrative-tracking.md`](references/skill-14-narrative-tracking.md) |
| SKILL-15 | Institutional & legal constraints | Extension | What does the law permit? What does circumvention cost? | [`references/skill-15-institutional-constraints.md`](references/skill-15-institutional-constraints.md) |
| SKILL-16 | Historical analogy | Extension | Which historical case is structurally similar? | [`references/skill-16-historical-analogy.md`](references/skill-16-historical-analogy.md) |
| SKILL-17 | Supply chain & technical systems | Extension | Where is the bottleneck? How long is the alternative path? | [`references/skill-17-supply-chain.md`](references/skill-17-supply-chain.md) |
| SKILL-18 | Structural trends | Extension | Which long-run trends are shifting the baseline? | [`references/skill-18-structural-trends.md`](references/skill-18-structural-trends.md) |
| SKILL-19 | Probability distribution engineering | Extension | (see the file) | [`references/skill-19-probability-engineering.md`](references/skill-19-probability-engineering.md) |
| SKILL-20 | Cross-family transfer testing | Extension | (see the file) | [`references/skill-20-cross-family-transfer.md`](references/skill-20-cross-family-transfer.md) |
| tracking-loop | Tracking-loop drive contract | Disciplines 19–23, ledger side | Which chains are due this cycle? Which go dormant? (collection is the user's own) | [`references/tracking-loop.md`](references/tracking-loop.md) |

## Workflow

**Quick-turn path (initial assessment)**
SKILL-01 problem definition → SKILL-02 fact baseline → SKILL-04 actor analysis →
SKILL-09 scenario forecasting → SKILL-10 indicators → mark **initial assessment**

**Deliberate path (completing the initial assessment)**
SKILL-03 source rating → SKILL-05 options screening → SKILL-06 attribution & interest
calibration → SKILL-07 decision preferences → SKILL-08 second-order effects →
SKILL-11 intelligence gaps → revise the initial assessment

**Tracking loop**
SKILL-10 indicators (continuous) → SKILL-12 calibration & backtesting (periodic)

**Extension modules (insert at any step as needed)**
- SKILL-13 quantitative reading → pairs with SKILL-02 fact baseline, SKILL-10 indicators
- SKILL-14 narrative tracking → pairs with SKILL-04 actor analysis, SKILL-07 decision preferences
- SKILL-15 institutional & legal constraints → pairs with SKILL-05 options screening
- SKILL-16 historical analogy → pairs with SKILL-07 decision preferences, SKILL-09 forecasting
- SKILL-17 supply chain → pairs with SKILL-08 second-order effects
- SKILL-18 structural trends → pairs with SKILL-04, SKILL-05 constraint screening, SKILL-09

## Core disciplines (23, mandatory — full text in [`references/disciplines.md`](references/disciplines.md))

1. Start from interests; do not infer intent backwards from behaviour
2. Separate fact from assumption
3. Do not bet on a single conclusion; hold multiple scenarios concurrently
4. Red-team self-challenge is mandatory
5. Output must be checkable; forecasts map to observable signals
6. Probability labels carry a % (5-point increments, for Brier calibration)
7. When attribution conflicts, open an ACH matrix
8. In second-order analysis, run Devil's Advocacy for at least one key actor
9. Tag source type (HUMINT / SIGINT / IMINT / OSINT)
10. Above 10 items of reporting, classify signal vs. noise first
11. High-risk analysis triggers two-axis grouping (function × position) and dual-track audit
12. Under pressure and in the loss domain, option logic inverts (Prospect Theory)
13. Reverse-audit customer pressure (politicization audit)
14. Self-check hypothesis falsifiability
15. Assess structural failure in the adversary's own intelligence system (adversary IC audit)
16. Standard wording ↔ probability mapping (on conflict, the % governs)
17. Down-rank overconfidence (≥90% must pass a rewritability test)
18. Forecast logging uses the snapshot-chain mechanism (mandatory)
19. Chain coverage completeness (mandatory)
20. An information vacuum ≠ holding probability constant (mandatory)
21. Cold-chain auto-downgrade and wake-up (mandatory)
22. Theatre deep-scan (mandatory)
23. Window-driven active verification (mandatory)

## Prediction ledger (file-based version chain)

Every SKILL-09 forecast and SKILL-12 backtest is logged to the **target project's**
`docs/intel/predictions/` — one JSON snapshot per chain version (`P-YYYY-MMDD-NN[-vK].json`),
**historical snapshots are never overwritten and each chain has exactly one latest**. The
specification and the EN↔繁中 field mapping are in
[`references/prediction-ledger.md`](references/prediction-ledger.md); the schema is
[`assets/prediction_entry.schema.json`](assets/prediction_entry.schema.json).

Machine support:
```
python3 scripts/prediction_lint.py --repo .            # fail-loud chain validation (pre-commit/CI)
python3 scripts/prediction_lint.py --repo . --index    # regenerate INDEX.md (generated; never hand-edit)
python3 scripts/brier_report.py --repo .               # Brier calibration + wording table + drift list (report, not a gate)
python3 scripts/intel_loop.py brief --repo .          # tracking-cycle brief (ledger side; collection is the user's own — see tracking-loop)
python3 scripts/intel_loop.py log --repo . --chain P-… --outcome A|B|C|D   # disposition record (Discipline 19d)
```
