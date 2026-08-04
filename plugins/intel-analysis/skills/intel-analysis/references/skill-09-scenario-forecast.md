---
name: skill-09-scenario-forecast
description: >
  SKILL-09|Scenario forecasting (Step 8): a baseline scenario plus at least one or two
  alternatives, probability labels carrying a % (5-point increments), trigger conditions, and a
  mandatory red-team rebuttal of the baseline (a concrete alternative premise + the assumption it
  breaks + observable disconfirming signals); every forecast is logged to the prediction ledger
  (version chain) at the same time. Core question: where could this go, at what probability?
  Never bet on a single conclusion.
---

# SKILL-09|Scenario forecasting

> 語言 / Language: [繁體中文](skill-09-scenario-forecast.zh-tw.md) · **English**

## Overview
Hold several possible scenarios concurrently, label each with a probability and trigger
conditions, run a red-team rebuttal against the baseline, and log every forecast to SKILL-12.

## Framework position
**Step 8**|Ten-step analytic framework

## Core question
> Where could this go? What is the probability of each scenario?

## Governing principle
> **Do not bet on a single conclusion.** Hold several possible scenarios concurrently, each with
> its own probability and trigger conditions.
> Betting on one conclusion trains the mind to ignore contradicting signals as new information
> arrives (confirmation bias).

## Procedure
**1. Build the baseline scenario**: the most likely path on current information, with probability and key assumptions
**2. Build alternative scenarios**: at least one or two, with the point at which each diverges from the baseline
**3. Run the red-team rebuttal**: at least one structural rebuttal of the baseline (mandatory)
**4. Log the forecasts**: enter every forecast in the SKILL-12 prediction record

## Required output

Every scenario forecast must contain:

| Item | Description |
|------|-------------|
| **Baseline scenario** | The most likely path on current information |
| **1–2 alternative scenarios** | Where things go if key variables change |
| **Probability label** | High / medium / low / very low |
| **Trigger conditions** | Which signals indicate movement toward this scenario |
| **Red-team rebuttal (mandatory)** | At least one structural rebuttal of the baseline |
| **Decision-insurance section (mandatory)** | Most-dangerous-scenario alert — a lightweight MDCOA, see the section below; attached to every product regardless of probability |

## Three conditions for a red-team rebuttal

A red-team rebuttal must:
1. Rest on a **concrete alternative premise** (not a vague "it might not happen")
2. Identify which **necessary condition or assumption**, once overturned, breaks the baseline
3. Come with **observable disconfirming signals**

## Scenario forecast template

```
[BASELINE SCENARIO]
Description: [the most likely path]
Probability: [high / medium / low]
Key assumptions: [the 2–3 premises holding it up]
Trigger conditions: [which signals indicate movement toward it]

[ALTERNATIVE SCENARIO A]
Description: []
Probability: [high / medium / low / very low]
Divergence from the baseline: [which variable differs]
Trigger conditions: []

[ALTERNATIVE SCENARIO B]
Description: []
Probability: [high / medium / low / very low]
Divergence from the baseline: []
Trigger conditions: []

[RED-TEAM REBUTTAL (mandatory)]
Alternative premise challenging the baseline: []
The assumption that fails when it is overturned: []
Observable disconfirming signals: []
```

## Probability labels

| Label | Range | Meaning | Written as |
|-------|-------|---------|------------|
| **High** | 60–85% | Current evidence strongly supports it | High (70%) |
| **Medium** | 30–60% | Reasonable grounds, with material uncertainty | Medium (45%) |
| **Low** | 10–30% | Possible, but requires several conditions to align | Low (20%) |
| **Very low** | < 10% | Theoretically possible, unsupported by current evidence | Very low (5%) |

### Rules for quantified probability
- Every probability label **must carry the forecast percentage in parentheses**, e.g. `High (70%)`, `Medium (45%)`, `Low (15%)`
- The percentage is the analyst's point estimate, not a range
- The change in that percentage for the same scenario over time *is* the traceable record of probability adjustment
- Percentages are given in 5-point increments (65%, 40%, 15%) to avoid false precision (never 67%, 43%)
- The percentages across scenarios **need not** sum to exactly 100% (scenarios may overlap, or their mutual exclusivity may be unclear), but should stay within a reasonable range

> ⚠️ Probability labels and percentages must come from the preference adjustment in SKILL-07, never from a feel for it.
> 💡 Once enough percentage forecasts have accumulated, SKILL-12 can compute an approximate Brier score for quantified calibration.

## Decision insurance: the most-dangerous-scenario alert (lightweight MDCOA, attached to every product)

**This is an alert, not a second analytic track.** No full scenario development, no probability —
its only job is to guarantee that **the most painful card still in play** always appears at a fixed
position in the product, as insurance and a firewall for political and military decision-making.
Lineage: IPB (ATP 2-01.3) requires reporting at least the most likely and the most dangerous COA;
this is a lightweight version of that.

Fixed format (three lines plus the disclaimer, placed after the scenario-probability section):

```
[DECISION INSURANCE|MOST-DANGEROUS-SCENARIO ALERT]
Most painful card: [from the options surviving SKILL-05 screening, the one with the greatest impact on our core interests that no hard constraint has excluded — regardless of probability]
Impact: [irreversibility / denial of reaction time / which core interest it strikes — one sentence]
Minimum monitoring: [hang one dedicated trigger indicator in SKILL-10; never removed for low probability]
Disclaimer: this section is decision insurance, not a probability forecast; it does not change the lead judgment or the probability allocation.
```

Rules:
- **Attached to every delivered product** (including a current-intelligence "initial assessment" — that is exactly when the most painful card is most easily missed)
- Where most dangerous and most likely coincide, note the overlap; do not develop it twice
- **Division of labour with Discipline 12**: Discipline 12 **raises** the probability of the dangerous card when the adversary is under high pressure in the loss domain (it changes the lead judgment); this section **never touches probability** and only preserves field of view — one adjusts probability, the other preserves visibility
- **Firewall semantics (both directions)**: for the decision-maker, the worst case has been delivered in writing and the line of responsibility is clear; for the analyst, a fixed format attached every time cannot be characterised as alarmism or as hindsight (the output-side counterpart of Discipline 13's politicization protection)
- Rank impact by **expected loss (probability × impact) and irreversibility**, not by probability alone; a calibration reminder: an event marked 5% comes true about five times in every hundred chains over the long run (see SKILL-12)

## Forecast logging (interface to SKILL-12)

Every forecast is logged at the same time (**a file-based version chain**; format in
prediction-ledger; Discipline 18 is mandatory):

```
Forecast: [a concrete, adjudicable statement]
Probability label: [high/medium/low/very low] (%)
Verification window: [expiry date]
Trigger indicator: [the corresponding SKILL-10 indicator]
```

## Output format

```
Baseline: [description]  Probability: [high/medium/low]  Triggers: []
Alternative A: [description]  Probability: []  Divergence: []  Triggers: []
Alternative B: [description]  Probability: []  Divergence: []  Triggers: []
Red-team rebuttal: alternative premise [] / assumption broken [] / disconfirming signals []
Decision insurance: most painful card [] / impact [] / minimum monitoring [] (disclaimer: not a forecast, does not change the lead judgment)
```

## Cautions
- ⚠️ In current-intelligence mode, a scenario forecast must be marked **initial assessment**, declaring that it has not been through the full workflow
- ✅ Next: **SKILL-10** (indicator management)
- ✅ Log every forecast to the **SKILL-12** prediction record at the same time
