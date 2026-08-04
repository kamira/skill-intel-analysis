---
name: skill-19-probability-engineering
description: >
  SKILL-19|Probability distribution engineering (extension module, cutting across systemic layer
  E, reinforcing SKILL-07/09): making sure the number reflects the actual judgment rather than
  writerly hedging — a mandatory six-dimension decomposition, an anti-hedging checklist, a
  distribution health check (commitment band / middle band / strong-signal band), and a link to
  backtesting. Core question: is this probability genuine uncertainty, or hedged reluctance to
  commit?
---

# SKILL-19|Probability distribution engineering

> 語言 / Language: [繁體中文](skill-19-probability-engineering.zh-tw.md) · **English**

## Overview
This module deals with the craft of the probability label itself — making sure every number
reflects the actual judgment rather than writerly hedging, preventing resolution from collapsing
and keeping the distribution discriminating.

## Framework position
**Extension module|cuts across systemic layer E** — reinforces every step that emits a probability
(SKILL-07 and SKILL-09 above all), keeping the **label** and the **actual judgment** aligned

## Core question
> Is this probability label genuine uncertainty, or hedged reluctance to commit?

## Governing principle
> **The Brier score measures calibration but not resolution.** An analyst who labels everything
> 0.5 can post a respectable Brier score while exercising no judgment at all. The aim of
> probability distribution engineering is to hold the Brier score down **while forcing labels to
> spread across three bands**, so forecasts do not all pile into the middle.

Four common hedging traps:
1. **Escape-hatch hedging**: you judge 70% and write 55% so you cannot be caught out
2. **Audience-perception hedging**: fearing you look too certain, you mark yourself down
3. **Scenario-balance hedging**: artificially pulling several scenarios toward 50% so it looks "even-handed"
4. **Semantic-safety hedging**: describing anything uncertain as "medium (55%)", using the label as an adjective rather than a probability

## Procedure

### Step A: decomposition (six mandatory dimensions)

Before writing an overall probability, decompose into six dimensions, each scored 0–1 with one line of supporting evidence:

| Dimension | Question | Score |
|-----------|----------|-------|
| **Interest intensity** | Do the actor's core interests strongly support this action? | 0–1 |
| **Constraint rigidity** | Do the five hard constraints permit it? | 0–1 |
| **Time pressure** | Is the actor in a window that forces a decision now? | 0–1 |
| **Loss / gain domain** | Prospect Theory: is the actor in the loss domain or the gain domain? | 0–1 |
| **Internal political authorisation** | Does domestic politics support it? | 0–1 |
| **Historical base rate** | How often has this happened in comparable situations? | 0–1 |

**Compose the overall probability**: arithmetic or weighted mean (a clearly dominant dimension may
carry more weight, but the reason must be stated).

### Step B: anti-hedging checklist (mandatory once the overall probability exists)

- [ ] Is my number 10%+ below the six-dimension mean? If so, the reason for marking down must be written
- [ ] Does my number fall in 0.50–0.60? If so, did I actually find offsetting evidence in both directions?
- [ ] If a reader asked "why not more certain?", could I point to concrete contrary evidence? If not → raise the probability
- [ ] Is the number I wrote the same as the judgment I hold? If not → write the actual judgment

### Step C: distribution health check (once the scenario list is complete)

Tabulate every probability in this product and check the distribution:

| Band | Name | Target share | Alert threshold |
|------|------|--------------|-----------------|
| ≥ 0.65 or ≤ 0.35 | **Commitment band** | ≥ 20% | Below 20% counts as over-hedging |
| 0.40–0.60 | **Middle band** | ≤ 50% | Above 50% means the scenario list is over-hedged |
| ≥ 0.75 or ≤ 0.20 | **Strong-signal band** | ≥ 1 entry | None at all means no judgment is being demonstrated |

If the distribution falls short:
- Too much middle band → cut one or two scenarios into the lead scenario and raise the lead scenario to ≥ 0.65
- No strong-signal band → re-examine whether a genuinely high- or genuinely low-probability event is being understated

### Step D: link to backtesting (post-hoc calibration)

- After each SKILL-12 run, adjust label discipline for the next period against the realised rate in each band
- If the "medium (55%)" band realises ≥ 75% for two consecutive periods, shift that band to "medium-high (70%)" going forward
- If the "low (25%)" band realises ≤ 5% for two consecutive periods, shift that band to "low (15%)" going forward

## Template

```
[SIX-DIMENSION DECOMPOSITION]
- Interest intensity:            [0–1] | evidence:
- Constraint rigidity:           [0–1] | evidence:
- Time pressure:                 [0–1] | evidence:
- Loss / gain domain:            [0–1] | evidence:
- Internal political authorisation: [0–1] | evidence:
- Historical base rate:          [0–1] | evidence:
Composed probability: [%] | method: [mean / weighted]

[ANTI-HEDGING CHECK]
- Deviation from the six-dimension mean: [+/-X%] | reason:
- Falls in the middle band (0.50–0.60): [Yes/No] | offsetting evidence:
- Can I name contrary evidence: [Yes/No] | what:
- Actual judgment == written number: [Yes/No]

[DISTRIBUTION HEALTH CHECK]
Total forecasts in this product: N
Commitment band (≥65% or ≤35%) share: X% [meets / falls short]
Middle band (40–60%) share: Y% [meets / falls short]
Strong-signal band (≥75% or ≤20%) count: Z [meets / falls short]
```

## Output format

The scenario-probability section of every analysis must end with one line:
> Distribution health check: commitment band X%, middle band Y%, strong-signal band Z entries

## Cautions
- ⚠️ Never use this SKILL to force probabilities upward — the point is that the written number equals the actual judgment, not that numbers become extreme
- ⚠️ If the six-dimension decomposition genuinely lands on "medium", label it medium; the health check only tests whether the product as a whole is over-concentrated
- ✅ Use in mandatory conjunction with SKILL-07, SKILL-09 and SKILL-12
- 💡 After four consecutive periods passing the health check, the check may drop to every other period
