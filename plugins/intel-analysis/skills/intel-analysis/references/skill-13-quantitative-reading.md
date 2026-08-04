---
name: skill-13-quantitative-reading
description: >
  SKILL-13|Quantitative reading (extension module, pairs with SKILL-02/10): the three-dimension
  test (magnitude / speed / persistence) plus four comparison baselines (historical mean /
  seasonality / event benchmark / trend line), separating structural change from short-run noise,
  with multi-indicator corroboration. Core question: is this change structural or noise?
---

# SKILL-13|Quantitative reading

> 語言 / Language: [繁體中文](skill-13-quantitative-reading.zh-tw.md) · **English**

## Overview
Read quantitative indicators for trend, anomaly and baseline deviation, separating **structural
change** from **short-run noise**, to give the qualitative analysis a data footing.

## Framework position
**Extension module**|Used with SKILL-02 (fact baseline) and SKILL-10 (indicators)

## Core question
> What does this change in the data mean? Is it a structural shift or short-run noise?

## Governing principle
> **Data does not speak; the frame you read it through decides what it means.** The same number
> can point to entirely different conclusions against different baselines, time scales and
> contexts. Establish the comparison baseline first, then judge the anomaly.

## Procedure
**1. Identify the key indicators**: pick the SKILL-10 indicators that need quantitative reading
**2. Establish the baseline**: define the normal range (historical mean, seasonal pattern, structural trend line)
**3. Judge the deviation**: how far, how fast and for how long the current value departs from the baseline
**4. Separate signal from noise**: corroborate across indicators to rule out a single misleading series
**5. Feed back into the qualitative analysis**: return the reading to the corresponding SKILL step

## The reading framework

### Three-dimension test

| Dimension | Question | Criterion |
|-----------|----------|-----------|
| **Magnitude** | How far from the baseline? | Beyond 1 historical standard deviation = worth noting; 2 = markedly anomalous |
| **Speed** | How fast did it happen? | Gradual (weeks) = possibly a trend; abrupt (within days) = possibly event-driven |
| **Persistence** | How long has it held? | < 1 week = possibly noise; > 2 weeks = possibly structural |

### Common comparison baselines

| Baseline | Use | Example |
|----------|-----|---------|
| **Historical mean** | Judging whether the current value is anomalous | Five-year mean Brent crude price |
| **Seasonal pattern** | Removing cyclical factors | The Q4 seasonal rise in energy demand |
| **Event benchmark** | Comparing with a similar historical episode | The oil-price reaction after the 2019 Saudi facility strike |
| **Structural trend line** | Judging departure from the long-run direction | Annual growth in global LNG capacity |

## Reading template

```
Indicator: []
Current value: []  Date: []
Baseline: [] (type: historical mean / seasonality / event benchmark / trend line)

[DEVIATION]
Magnitude: [X% off baseline, roughly N standard deviations]
Speed: [gradual / abrupt, over what window]
Persistence: [held for N days / weeks]

[CORROBORATION]
Other indicators pointing the same way: []
Indicators pointing the other way: []

[CONCLUSION]
Judgment: [structural change / event-driven / short-run noise / to be watched]
Effect on the analysis: [which judgment in which SKILL it feeds back to]
Confidence: [high/medium/low]  Reasoning: []
```

## Output format

```
Indicator: []  Current value: []  Baseline: []
Deviation: [magnitude / speed / persistence]
Judgment: [structural / event-driven / noise]
Corroboration: [supporting / contradicting indicators]
Feeds back to: [which judgment in SKILL-XX]
```

## Cautions
- ⚠️ **One indicator is never enough for a conclusion** — corroborate across at least two independent indicators
- ⚠️ Watch for **survivorship bias** — the data you can see may not include the most important missing data
- ✅ Feed the conclusion back to SKILL-02 (fact baseline) or SKILL-10 (indicators)
- 💡 Use alongside SKILL-03 (credibility rating): data sources need rating too
