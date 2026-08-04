---
name: skill-20-cross-family-transfer
description: >
  SKILL-20|Cross-family transfer testing (extension module, triggered every 14 days): force a
  full SKILL-01…11 forecast on a structurally different crisis family and compare the stress-test
  Brier score against the main family's, separating "the methodology transfers" from "the score is
  inflated by familiarity with one family". Core question: does the methodology still run on an
  unfamiliar case? A low Brier score is not the same as good judgment.
---

# SKILL-20|Cross-family transfer testing

> 語言 / Language: [繁體中文](skill-20-cross-family-transfer.zh-tw.md) · **English**

## Overview
Force forecasts on structurally different crisis cases, so the methodology's score is not inflated
by inertia within a single family, and the transferability of the SKILL framework is actually tested.

## Framework position
**Extension module** — triggered every 14 days

## Core question
> Does the methodology still run on an unfamiliar case, or is it just recalling a familiar story?

## Governing principle
> **A low Brier score is not the same as good judgment.** When you track one crisis family
> continuously (the same set of actors in the same geography), much of a low Brier score comes
> from **memory of those specific actors** rather than from the methodology. Memory does not
> transfer; method does — and in the data the two look identical, so only a deliberately designed
> stress test separates them.

## Procedure

### Step A: triggers
Run the test when any of the following holds:
- The same crisis family has been tracked continuously for more than 14 days
- The main family's Brier score is below 0.15 while the middle band realises > 75%
- Directional error has been zero for three consecutive periods
- The user triggers it deliberately (to test whether the methodology has decayed)

### Step B: choose the case
Draw at random a recent event from a family other than the one being tracked:

| No. | Family | Example events |
|-----|--------|----------------|
| 1 | **Taiwan Strait / South China Sea** | PLA exercises, Philippine grey-zone incidents, Taiwanese elections |
| 2 | **India–Pakistan** | Kashmir clashes, trade sanctions, nuclear-test indicators |
| 3 | **Africa** | The Sudan civil war, Sahel coups, Ethiopia–Eritrea |
| 4 | **Latin America** | Venezuela, Mexico's counter-narcotics campaign, the Argentine economy |
| 5 | **Financial markets** | Fed decisions, the dollar index, emerging-market debt crises |
| 6 | **Technology policy** | Semiconductor export controls, AI regulation, crypto assets |
| 7 | **Public health / disasters** | Outbreaks, extreme weather, food crises |
| 8 | **Korean peninsula** | North Korean tests, South Korean domestic politics, US–DPRK contacts |

Selection requirements:
- Not adjacent to the family currently being tracked (if tracking the Middle East, Iran–Pakistan does not qualify)
- Must contain a concrete event node adjudicable within 14 days

### Step C: run the full SKILL workflow once
- Run a full deliberate analysis over the selected case using SKILL-01…11
- Produce at least 3–5 forecasts and log them to the prediction ledger
- Mark them in the ledger as stress-test items (suggested tag: `stress-test`)

### Step D: compare after 14 days
Compute the stress test's Brier score and compare with the main family's over the same period:

| Gap | Verdict | Follow-up |
|-----|---------|-----------|
| Stress test exceeds main family by ≤ 0.03 | **The methodology transfers** | Keep the current SKILL settings |
| Stress test exceeds main family by 0.03–0.07 | **Partly inflated by familiarity** | Deduct 0.02 from the main family's overall Brier before reassessing |
| Stress test exceeds main family by ≥ 0.08 | **Severe family inertia** | Treat the main family's overall score as unreliable; a structural review is required |

### Step E: attribution
If the stress test performs markedly worse than the main family, check:
- Did SKILL-04 actor analysis lean on remembered actor cards from the main family?
- Did SKILL-05 constraint screening miss constraints peculiar to the unfamiliar family?
- Did SKILL-07 decision preferences misapply the main family's actor preferences?

## Stress-test template

```
[TEST CASE]
Date:
Event:
Family:
Distance from the main tracked family: [adjacent / moderate / distant]

[FULL SKILL WORKFLOW]
Output of SKILL-01…11 (an abbreviated form is acceptable, but every step must be present)

[FORECAST LOG]
Forecast 1: [statement]  Probability: [%]  Verification window:
Forecast 2: …
Forecast 3: …
(tagged: stress-test = yes)

[VERIFICATION AFTER 14 DAYS]
Stress-test Brier:
Main-family Brier over the same period:
Gap:
Verdict: [transfers / partly inflated / severe family inertia]
Attribution:
```

## Output format
- Stress-test results go in a fixed section of the SKILL-12 calibration review
- Two consecutive "severe family inertia" verdicts trigger a structural review of the SKILL Manager

## Cautions
- ⚠️ Do not pick an adjacent case you have already tracked — it must be genuinely unfamiliar
- ⚠️ Stress-test analyses must not be published externally (unless clearly marked as such)
- ✅ On completion, fold the results into SKILL-12 as a separate computation
- 💡 After four consecutive strong stress-test results, consider expanding the main family into two families tracked in parallel
