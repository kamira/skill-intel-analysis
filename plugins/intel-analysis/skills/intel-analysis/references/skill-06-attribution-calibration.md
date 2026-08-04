---
name: skill-06-attribution-calibration
description: >
  SKILL-06|Attribution & interest calibration (Step 5): use the action the actor has already
  taken to calibrate the interest judgment — which card on the board does it correspond to, and
  does it overturn the assumed ranking of interests? Where attribution is inconsistent and more
  than one explanation is equally plausible, an ACH evidence × hypothesis matrix is mandatory.
  Core question: why this option? Calibrate interests against behaviour before entering the
  cognitive layer.
---

# SKILL-06|Attribution & interest calibration

> 語言 / Language: [繁體中文](skill-06-attribution-calibration.zh-tw.md) · **English**

## Overview
Use the action the actor has already taken to calibrate the interest judgment, check whether the
behaviour fits the assumptions, and — where it does not — revise the assumed ranking of interests
before entering the cognitive layer.

## Framework position
**Step 5**|Ten-step analytic framework

## Core question
> Which card on the board does the actor's observed action correspond to? Does it change our
> understanding of how it ranks its interests?

## Governing principle
> **Calibrate interests against behaviour before entering the cognitive layer.**
> Jumping from the screened board straight to the cognitive layer assumes your read of the actor's
> interests is already correct. Their actual behaviour is the best calibration tool you have.

## Procedure

**1. Attribution**
- What action has the actor taken? (from the SKILL-02 fact baseline)
- Which card on the SKILL-05 board does it correspond to?
- What possibilities does it rule out?

**2. Interest calibration**
- Does this choice change our understanding of how the actor ranks its interests?
- Does it reveal a dimension of interest we had missed?
- Does it show that an assumed priority needs revising?

**3. Consistency check**
- Is the chosen option logically consistent with known interests?
- If **inconsistent**: is the interest judgment wrong, or is there an unidentified constraint or motive?

## Attribution template

```
Actor: []
Observed action: []

[ATTRIBUTION]
Corresponding option on the board: [which card from SKILL-05]
Possibilities ruled out: []
Was the choice unexpected? [yes/no]  Note: []

[INTEREST CALIBRATION]
Original ranking assumption: [from SKILL-04]
Does the behaviour fit? [yes / partly / no]
Assumptions to revise: []
Newly discovered dimension of interest: []
Unidentified constraint or motive: []

[CONSISTENCY CONCLUSION]
[Consistent: retain the SKILL-04 interest judgment]
[Inconsistent: update to version X]
```

## Output format

```
Actor: []
Observed action: []
Corresponding option on the board: [which card from SKILL-05]
Possibilities ruled out: []
Interest calibration: [judgment retained / updated to version X]
Consistency: [consistent / inconsistent, because:]
```

## The ACH evidence × hypothesis matrix (mandatory at key turning points)

Open a full Analysis of Competing Hypotheses matrix whenever:
- The actor's behaviour is **inconsistent** with the interest assumptions and no single cause explains it
- The same event admits **two or more equally plausible attributions**
- A scenario forecast has **missed badly** (SKILL-12 backtesting found the forecast wrong)

### Procedure

**1. List every competing hypothesis** (at least three)
- Hypotheses are not limited to "the interest judgment was wrong"; include unidentified constraints, deliberate deception, internal factional division, short-term tactics departing from long-term interest, and so on

**2. List every key item of evidence**
- Include confirmed facts (`[FACT]`), reasoned inferences (`[INFER]`) and unverified reporting (`[PENDING]`), each tagged

**3. Build the matrix: mark consistency item by item**

```
                  │ Hypothesis A │ Hypothesis B │ Hypothesis C
──────────────────┼──────────────┼──────────────┼──────────────
Evidence 1 [FACT] │ ✅ consistent│ ❌ inconsist.│ ⚠️ neutral
Evidence 2 [FACT] │ ✅ consistent│ ✅ consistent│ ❌ inconsist.
Evidence 3 [INFER]│ ⚠️ neutral   │ ✅ consistent│ ✅ consistent
Evidence 4 [PEND.]│ ⚠️ neutral   │ ❌ inconsist.│ ✅ consistent
──────────────────┼──────────────┼──────────────┼──────────────
Inconsistency cnt │ 0            │ 2            │ 1
```

**4. Elimination and conclusion**
- Eliminate the hypothesis with the most inconsistencies first (do not delete it; demote it to "alternative")
- Retain the hypothesis with the fewest inconsistencies as the lead judgment
- If two hypotheses tie on inconsistency count, mark them "not distinguishable" and carry them into the SKILL-11 intelligence gaps

**5. Mark the diagnostic evidence**
- For each item ask: "does this piece discriminate between hypotheses?"
- Evidence consistent with all hypotheses, or inconsistent with all of them, has no diagnostic value
- **The most valuable evidence is what is consistent with one hypothesis and inconsistent with another**

### Matrix output format

```
[ACH MATRIX]
Actor: []
Trigger: [which behaviour requires attribution]

Hypothesis A: [description]
Hypothesis B: [description]
Hypothesis C: [description]

Key evidence × hypothesis consistency: [matrix]

Conclusion: [lead judgment]  Basis: [fewest inconsistencies]
Diagnostic evidence: [which item discriminates most]
Alternative hypotheses: [explanations not fully ruled out]
Signals that would verify an alternative: []
```

### When the matrix is not needed
- The consistency check passes (behaviour fits interest logic) → the normal flow suffices
- The deviation has a single clear explanation → state it in the attribution template

> 💡 The value of an ACH matrix is not in running it every time, but in **forcing deliberate
> reasoning exactly where error is most likely**.

## Cautions
- ✅ Next: **SKILL-07** (decision preferences & probability adjustment)
- 💡 If the consistency check fails and cannot be explained, mark it as an intelligence gap and declare it in SKILL-11
- 💡 If the consistency check fails and several explanations are possible, **the ACH matrix is mandatory**
