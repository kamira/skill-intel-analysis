---
name: skill-12-calibration-backtest
description: >
  SKILL-12|Calibration & backtesting (systemic layer E): log forecasts, backtest them at expiry,
  quantify calibration with the Brier score (formula and interpretation bands), the mandatory
  backtest triggers, the calibration feedback path (revising SKILL-04/09/10 and the country-
  position baseline), and the long-run structural calibration guardrails. Core question: were
  past forecasts accurate, and where is the bias? The point is knowing when you are likely to be
  wrong.
---

# SKILL-12|Calibration & backtesting

> 語言 / Language: [繁體中文](skill-12-calibration-backtest.zh-tw.md) · **English**

## Overview
Log forecasts, backtest them on a schedule, compute calibration metrics, and revise the
corresponding SKILLs and the country-position baseline accordingly — the long-run
self-improvement loop of the analytic system.

## Framework position
**Systemic layer E**|Calibration and backtesting

## Core question
> Were past forecasts accurate? Where is the bias concentrated? How is it corrected over time?

## Governing principle
> **The ultimate aim of calibration is not to be right every time, but to know when you are likely
> to be wrong.**
> A system whose "high" really means high and whose "low" really means low is worth more than one
> claiming a high hit rate on miscalibrated confidence labels.

## Procedure
**1. Log the forecast**: on completing SKILL-09, enter the forecast in the prediction ledger
**2. Backtest at expiry**: once a forecast expires, record the actual outcome and a calibration note
**3. Compute calibration metrics**: run a full calibration review every 20–30 expired forecasts
**4. Apply the feedback**: update the corresponding SKILLs per sections C and D

### Mandatory backtest triggers
A backtest must be run — never skipped — when any of the following holds:
- **Every analysis backtests what has expired**: when producing new analysis, check every expired forecast in the ledger and fill in the actual outcome and Brier score
- **Three consecutive adjustments in the same direction**: if the same forecast is adjusted the same way three periods running (three successive reductions, say), a structural review is required — check for systematic bias rather than continuing to nudge
- **Adding or removing a scenario in a single analysis**: a new scenario must be logged to the ledger; a removed scenario must have its reason recorded under "narrative lines exited"
- **Any single Brier score ≥ 0.40**: a single forecast scoring 0.40 or worse (a major miss) requires immediate attribution analysis and a review of whether the corresponding SKILL or the country-position baseline needs updating

## A. Forecast record (logged at the time of forecasting)

Each forecast must record the following (entered in the file-based version-chain ledger; field
mapping in prediction-ledger):

```
Forecast ID: [P-YYYY-MMDD-NN]
Forecast: [a concrete, adjudicable statement]
Probability label: [high / medium / low / very low] (percentage)
Forecast percentage: [the analyst's best estimate, e.g. 70%]
Verification window: [expiry date, e.g. 2026-04-16]
Trigger indicator: [which SKILL-10 indicator corresponds]

Actual outcome (filled in at expiry):
  ✅ Occurred (outcome value = 1)
  ❌ Did not occur (outcome value = 0)
  ⚠️ Partly occurred (outcome value = 0.5)
  ❓ Not adjudicable (excluded from the Brier calculation)

Calibration note (filled in at backtest):
  [a short attribution of why it was right or wrong]
```

### Rules for quantified percentages
- Every probability label **must carry the forecast percentage in parentheses**: `High (70%)`, `Medium (40%)`, `Low (15%)`, `Very low (5%)`
- The percentage is the analyst's point estimate, in 5-point increments
- The change in that percentage over time *is* the traceable record of probability adjustment (version-chain snapshots, Discipline 18)
- The percentage is what the Brier score is computed from at expiry

## B. Periodic calibration review (every 20–30 expired forecasts)

### Calibration metrics

| Metric | How it is computed | Alert threshold |
|--------|--------------------|-----------------|
| **Hit rate vs confidence** | Hit rate of "high" forecasts vs hit rate of "low" forecasts | The gap should be substantial |
| **Overconfidence** | Share of "high" forecasts that did not occur | Above 30% needs review |
| **Overcaution** | Share of "low / very low" forecasts that did occur | Above 15% needs review |
| **Blind-spot type** | Whether errors cluster in a particular domain or actor | Clustering is systematic bias |
| **Narrative drift** | Whether probability adjustments are backed by observable signals | An adjustment with no signal behind it is drift |

## C. Calibration feedback paths

Once a backtest is complete, update according to what it found:

| Finding | What to update |
|---------|----------------|
| Bias in how probability is used | Revise how probability labels are applied in SKILL-09 |
| Persistent errors about an actor | Update the SKILL-04 actor card (ranked interests or red lines) |
| An indicator has stopped working | Replace or supplement the SKILL-10 signal watchlist |
| Long-run bias in a particular domain | Bring in a new external source |
| **An actor's behaviour departs systematically from the standing assumptions (confirmed over time)** | **Calibrate the country-position baseline (see section D)** |

## D. Long-run country-position calibration (only after confirmation over time)

> This mechanism is for structural corrections that short-term backtesting cannot trigger. Update
> the country-position baseline only when an actor's actual behaviour departs from the standing
> interest assumptions **across several events and over an extended window**.

### Triggers (either group must be satisfied in full)

**Group A (quantitative)**
- Forecasts about the same actor have been wrong ≥3 times, clustered in the same type of judgment (persistently overrating a state's willingness to escalate, for instance)
- Those wrong forecasts carried "high" or "medium" labels — meaning this is not incidental noise

**Group B (qualitative)**
- A state's assumed red lines repeatedly failed to trigger the expected response
- A state's ranking of core interests shows an observable structural shift (economic priority visibly overtaking security priority, say)
- A state's habitual options went unused across several events, with a new alternative pattern emerging

### Calibration procedure

```
1. Assemble the backtest records that triggered calibration
   - List the IDs of the deviating forecasts
   - Characterise the deviation (misjudged interest ranking / red line set too high or too low / shift in preferred options)

2. Compare against the corresponding fields in the country-position baseline
   - Identify which "core interest", "red line" or "habitual option" needs revising
   - Confirm there is enough cross-event evidence (avoid over-correcting on a single event)

3. Draft the revision (mark it "proposed revision" before applying)
   - Revision: [the field changed and its new content]
   - Supporting evidence: [the corresponding forecast IDs and events]
   - Magnitude: [minor adjustment / moderate adjustment / fundamental revision]

4. Apply the update
   - Edit the corresponding actor fields in the country-position baseline
   - Note in the margin: "calibrated per SKILL-12, updated [date], basis: [event summary]"

5. Update the SKILL-04 actor card in step
   - Once the baseline is updated, the next use of SKILL-04 works from the new version
```

### Calibration guardrails (against over-correction)
- ⚠️ **Never trigger long-run calibration on a single event**: short-term anomalies may be tactical deviation, not structural change
- ⚠️ **A correction needs positive evidence**: "the forecast was wrong" ≠ "the interest assumption was wrong"; rule out other explanations first (information gaps, one-off constraints)
- ⚠️ **Keep the historical version**: record the previous content before editing the country-position baseline, so it can be compared later
- ✅ **Prefer minor adjustment over fundamental revision**: assume the existing frame is broadly right and adjust only the clearest deviation

## E. Brier score (once enough forecasts have accumulated)

### What the Brier score is
The Brier score is the standard measure of probabilistic forecast accuracy, introduced by Glenn
Brier in 1950 and used widely in superforecasting research (Tetlock) and intelligence calibration.

### Formula

```
Single Brier score = (forecast percentage - actual outcome value)²

where:
- forecast percentage = the probability given by the analyst (70% = 0.70)
- actual outcome value = 1 (occurred), 0 (did not occur), or 0.5 (partly occurred)

Examples:
- Forecast 70%, it occurred     → (0.70 - 1)² = 0.09 (good)
- Forecast 70%, it did not      → (0.70 - 0)² = 0.49 (bad)
- Forecast 50%, either outcome  → (0.50 - 0 or 1)² = 0.25 (equivalent to guessing)

Mean Brier score = the average of all single scores
```

### Interpretation bands

| Mean Brier score | Meaning | Reference |
|------------------|---------|-----------|
| 0.00 | Perfect forecasting (theoretical bound) | Unattainable |
| 0.00–0.10 | Excellent | Superforecaster level |
| 0.10–0.20 | Good | A reasonable target for a professional analyst |
| 0.20–0.25 | Mediocre | Equivalent to chance (labelling everything 50%) |
| > 0.25 | Poor | Worse than guessing |

### When to run it
- Once **10 or more** forecasts have expired, start computing the overall mean Brier score
- Run a full calibration review every **20–30** expired forecasts (in step with section B)
- Compute it separately by actor, domain and period to locate systematic bias

### Calibration action triggers
- Mean Brier score > 0.20 → review how probability labels are being used (overconfidence or overcaution)
- Persistently high Brier scores on forecasts about one actor → review whether that actor's interest judgment needs revising
- Persistently high Brier scores in one category (military / economic / diplomatic) → review whether sourcing in that domain is adequate

## Output format

```
[FORECAST LOG]
Forecast ID: [P-YYYY-MMDD-NN]
Statement: []  Probability: [high/medium/low/very low] (percentage)  Expiry: []  Trigger indicator: []
Outcome: [✅/❌/⚠️/❓]  Brier: [single score]  Note: []

[CALIBRATION REVIEW SUMMARY]
Mean Brier score: [overall mean]
Overconfidence: [share of "high" forecasts that did not occur]
Blind-spot type: [which domain / actor errors cluster in]
Feedback action: [which SKILL / the country-position baseline to update]
```

## Cautions
- ✅ Log every SKILL-09 scenario forecast to the prediction ledger as it is made (machine support: `brier_report.py` computes Brier scores and the drift list automatically)
- ✅ Run a full calibration review every 20–30 expired forecasts
- 💡 This SKILL is the core mechanism for the analytic system's long-run self-improvement; it should never be skipped

> Migration note: the original Notion forecast ID format was "date-sequence (20260409-01)"; the
> file ledger standardises on `P-YYYY-MMDD-NN` (see prediction-ledger). To map a historical ID,
> add the `P-` prefix and zero-pad.
