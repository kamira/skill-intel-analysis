---
name: skill-05-option-screening
description: >
  SKILL-05|Options screening (Step 4, COA screening in military usage): list every theoretical
  option open to an actor and screen each against five hard constraints (capability / resources /
  political authorisation / time / interaction), producing a clean board unaffected by subjective
  preference; includes a domestic-politics scan and an automatic red-team trigger on a collection
  gap. Core question: what cards are on the table? Never let "I don't think they would" enter at
  this step.
---

# SKILL-05|Options screening

> 語言 / Language: [繁體中文](skill-05-option-screening.zh-tw.md) · **English**

## Overview
Working from each actor's interests, list every theoretical option, screen each against five hard
constraints, and produce a "clean board" — entirely free of subjective preference.

## Framework position
**Step 4**|Ten-step analytic framework

## Core question
> What cards are on the table? (the clean list that survives hard-constraint screening)

## Governing principle
> **Layer one: the intelligence-analysis layer** — produce an objective list of courses of action
> that are executable now. That list is **unaffected by anyone's preferences**. Produce the full
> set of options first; preference comes later.

## The five hard constraints

| Constraint | Core question | Example |
|------------|---------------|---------|
| **Capability** | Can they actually do it? | Wants nuclear weapons but lacks centrifuge technology |
| **Resources** | Can they afford to sustain it? | Wants a price war but has three months of cash flow |
| **Political authorisation** | Are they permitted to do it? | The military is capable but the legislature has not authorised it |
| **Time** | Is there time? Is the window open? | A policy pushed three days before an election is too late to move the vote |
| **Interaction** | Does playing this card kill another one? | Comprehensive sanctions forfeit the leverage of trading economics for diplomatic concessions |

## Procedure

**For each actor (from SKILL-04)**:
1. **List every theoretical option** (rule nothing out up front)
2. **Scan domestic political dynamics** (the last seven days, plus medium-term events not yet in play)
   - Scan scope: elections, trials, budget bills, protests, political crises, energy crises, leadership changes, legislative progress
   - For each actor, judge whether domestic events change the rating of any hard constraint (a trial reopening → political authorisation drops from ✅ to ⚠️; an energy crisis → the time constraint drops from ✅ to ❌)
   - The output of this step feeds the constraint tags in the next step directly, and also serves the "domestic political dynamics and decision constraints" section
3. **Tag each hard constraint** (✅ feasible | ❌ infeasible | ⚠️ conditionally feasible); "political authorisation" and "time" must reflect the domestic scan from step 2
4. **Screen out what cannot be executed**
5. **Produce the screened list of available options**

## Constraint checklist template

```
Actor: []
Theoretical option: []

Capability:              ✅ / ❌ / ⚠️   Note:
Resources:               ✅ / ❌ / ⚠️   Note:
Political authorisation: ✅ / ❌ / ⚠️   Note:
Time:                    ✅ / ❌ / ⚠️   Note:
Interaction:             ✅ / ❌ / ⚠️   Note:

→ Screening result: [available / infeasible / conditional]
```

## Output format

```
[AVAILABLE OPTIONS FOR ACTOR X]
✅ Option A: [note]
✅ Option B: [note, with conditions]
❌ Option C: excluded because ([constraint type])
❌ Option D: excluded because ([constraint type])
```

## Automatic red-team trigger on a collection gap

Go back and check the discipline tags from SKILL-02. If the evidence underpinning this screening:
- **lacks HUMINT-type intent signals** (that is, carries only activity-type signals such as IMINT/SIGINT/OSINT)
- **or contains a card marked "feasible" with no support at all from the adversary's intent side**

then the **red team fires automatically**: before entering SKILL-06, invoke Devil's Advocacy from
SKILL-08 and argue the reverse case for at least one key option — why the adversary would in fact
play the card you have marked down.

> ⚠️ Activity signals always tell you what an actor *can* do, never what it *wants* to do. Without
> calibration on the intent side, it is easiest to close the causal loop too fast — "concentration
> = attack", "sanctions = war". That shortcut is the common root of both overreaction and
> underreaction.

## Absolutely prohibited

> ⚠️ **Never** let "I don't think they would do that" into this step.
> Produce the full set of options first; preference is handled in SKILL-07.
> Ruling out an adversary's options with your own bias is the deadliest error in intelligence analysis.

## Cautions
- ✅ Next: **SKILL-06** (attribution & interest calibration)
- 💡 The interaction constraint matters most: watch whether playing one card invalidates other important options
