---
name: skill-10-indicator-management
description: >
  SKILL-10|Indicator management (Step 9 + systemic layer C): set observable verification
  indicators for each scenario (a signal watchlist) and run the four-state holding-file lifecycle
  (Active / Pending / Contested / Discredited). Core question: which signals confirm or break the
  scenario? Only a judgment that can be checked afterwards is analysis; the rest is opinion.
---

# SKILL-10|Indicator management

> 語言 / Language: [繁體中文](skill-10-indicator-management.zh-tw.md) · **English**

## Overview
Set observable verification indicators for each scenario and manage the four-state lifecycle of
the holding file, so that the analysis can be checked after the fact.

## Framework position
**Step 9 + systemic layer C**|Ten-step analytic framework

## Core question
> Which concrete signals show a scenario is materialising? How is contradictory reporting tracked?

## Governing principle
> **Only a judgment that can be checked afterwards is analysis; the rest is opinion.** Indicators
> are the verification criteria written down in advance. The value of reporting is dynamic —
> today's "doubtful" may be tomorrow's "confirmed"; discarding an item is easy, but rediscovering
> it is extremely expensive.

## Procedure
**1. Set indicators for each scenario**: for every SKILL-09 scenario, define concrete observable signals
**2. Review holding-file promotions and demotions**: every time the fact baseline is updated, check whether any item should move state
**3. Log new unverified reporting**: bring the pending items from SKILL-02 and SKILL-03 into the holding file
**4. Mark the impact link**: for each unverified item, record which scenario it would affect if confirmed

## A. Indicators (signal watchlist)

Every indicator must contain:

```
Indicator: [concrete description of the signal]
Scenario: [which SKILL-09 scenario this signal indicates movement toward]
Meaning of a change in the signal:
  - Appears / rises: [what it means]
  - Disappears / falls: [what it means]
  - Anomalous: [what it means]
Observation frequency: [daily / weekly / event-triggered]
Data source: [where the signal comes from]
```

### Standing indicator library (draw on as the event requires)

| Category | Example indicators |
|----------|--------------------|
| Energy | Brent crude futures, Hormuz transit volume, LNG spot price |
| Shipping | AIS vessel tracking, Baltic Dry Index, insurance rates |
| Financial | Dollar index, gold price, sovereign CDS spreads |
| Diplomatic | UN statements, ambassadors recalled, frequency of diplomatic meetings |
| Military | Deployment changes, exercise scale, logistics movement |
| Information | Frequency of official statements, narrative shifts, signs of media control |

## B. Holding-file management (systemic layer C)

The four states of an item of reporting:

| State | Tag | Meaning |
|-------|-----|---------|
| **Confirmed** | `[Active]` | Corroborated; usable in analysis directly |
| **Unverified** | `[Pending]` | Not confirmed but not excluded; under continued tracking |
| **Doubtful** | `[Contested]` | Contradicts confirmed facts, or failed the narrative-consistency check |
| **Unusable** | `[Discredited]` | Repeated independent checks confirm deliberate fabrication or outright error |

### Holding-file rules
1. Reporting at reliability **D/E/F** or credibility **4/5/6** enters `[Pending]` or `[Contested]` automatically (F/6 = cannot be judged → Pending by default; 4/5 = contradiction → Contested by default)
2. Every time the fact baseline is updated, review the holding file for promotions and demotions
3. **Promotion** requires at least one fully independent information chain in support
4. **Demotion to unusable** requires positive evidence of fabrication, not merely "it has not been verified"
5. `[Pending]` reporting does not enter the main scenario-forecasting judgment, but must be listed in the intelligence gaps
6. **Decision-insurance minimum monitoring** (SKILL-09): the dedicated trigger indicator for the most dangerous scenario is **never removed for low probability**; if it truly must be removed, state the reason explicitly in the product — monitoring withdrawn in advance is the common antecedent of every strategic surprise

### Holding-file entry template

```
Item: [description]
SKILL-03 rating: [A-1 / D-3 / F-6 etc.]
Current state: [Pending / Contested / Active / Discredited]
Date entered: []
Date last reviewed: []
Which scenario's probability changes if this is confirmed: []
Evidence required for promotion: [what it would take to confirm]
```

## Output format

```
[SIGNAL WATCHLIST]
Indicator 1: [signal]  Scenario: []  Frequency: []  Source: []
Indicator 2: [signal]  Scenario: []  Frequency: []  Source: []

[HOLDING FILE]
[Active] Item A: []
[Pending] Item B: []  Effect if confirmed: []
[Contested] Item C: []  Required for promotion: []
```

## Cautions
- ✅ Next: **SKILL-11** (intelligence gaps statement)
- ✅ Indicators should map one-to-one to the SKILL-09 trigger conditions
- 💡 Review the holding file at the start of every new analytic round to see whether any `[Pending]` item can be promoted
