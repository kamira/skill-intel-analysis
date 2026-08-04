---
name: skill-11-gap-statement
description: >
  SKILL-11|Intelligence gaps statement (Step 10): mark honestly where the analysis is solid and
  where it is fragile — the key assumptions list (with confirming and disconfirming signals),
  information gaps, confidence levels, and the most likely direction of error; plus three
  pre-delivery self-checks (falsifiability / politicization / overconfidence, Disciplines
  13/14/17). Core question: what limitations does the reader need to know?
---

# SKILL-11|Intelligence gaps statement

> 語言 / Language: [繁體中文](skill-11-gap-statement.zh-tw.md) · **English**

## Overview
Mark honestly where the analysis is solid and where it is fragile — key assumptions, information
gaps, confidence levels and the most likely direction of error — so the reader can judge how much
to trust it.

## Framework position
**Step 10**|Ten-step analytic framework

## Core question
> Where is this analysis solid and where is it fragile? What limitations does the reader need to know?

## Governing principle
> **Analysis that does not mark its uncertainty is dangerous.**
> Readers will treat every judgment as equally reliable. Mark what you are confident about and
> what you are guessing at, and let the reader decide how much to believe.

## Procedure
**1. List the key assumptions**: 3–5, each with the impact if overturned, plus confirming and disconfirming signals
**2. List the information gaps**: which judgments rest on assumption rather than fact, and how much it matters
**3. Mark confidence levels**: high / medium / low for each core judgment, with the reasoning
**4. State the most likely direction of error**: if this analysis is wrong, where is it most likely wrong
**5. Produce the sourcing appendix for the Key Judgments**: a supporting-source list per core judgment (see the ICD 206 section below)

## Required output

### 1. Key assumptions list (3–5)
Format for each:
```
Assumption [N]: [the assumption in one sentence]
Impact if overturned: [which scenario / which judgment]
Confirming signal: [what would confirm this assumption]
Disconfirming signal: [what would overturn it]
```

### 2. Known information gaps
```
Gap [N]: [which judgments rest on assumption rather than confirmed fact]
Impact: [high / medium / low]
How it could be filled: [what information is needed]
```

### 3. Confidence levels

| Judgment | Confidence | Reasoning |
|----------|-----------|-----------|
| [Core judgment A] | High / medium / low | |
| [Core judgment B] | High / medium / low | |

### 4. Most likely direction of error
```
If this analysis is wrong, it is most likely wrong in: [be concrete]
Why this direction is the most error-prone: []
```

## Full statement template

```
[KEY ASSUMPTIONS]
Assumption 1: []
  Impact if overturned: [] | Confirming signal: [] | Disconfirming signal: []
Assumption 2: []
  Impact if overturned: [] | Confirming signal: [] | Disconfirming signal: []
Assumption 3: []
  Impact if overturned: [] | Confirming signal: [] | Disconfirming signal: []

[INFORMATION GAPS]
Gap 1: []  Impact: [high/medium/low]
Gap 2: []  Impact: [high/medium/low]

[CONFIDENCE]
[Core judgment]: [high/medium/low]  Reasoning: []

[MOST LIKELY DIRECTION OF ERROR]
[explanation]

[HOLDING-FILE ITEMS BEARING ON THIS ANALYSIS]
If [item X] is confirmed, the probability of [scenario Y] changes.
```

## Supplementary self-checks (Disciplines 13, 14, 17)

### 1. Falsifiability check on assumptions (Discipline 14)
For each key assumption, ask:
> **What evidence would overturn it?**

If the answer is "none", or "any disconfirmation would be explained as the adversary deceiving,
concealing or hiding it well", that assumption is demoted to a **belief**: it may not serve as a
pivot for scenario probability allocation, and must be flagged explicitly under "most likely
direction of error".

### 2. Reverse audit of customer pressure (Discipline 13)
Before delivery, answer:
- What conclusion does the customer or reader most want to see right now?
- If the opposite conclusion emerged, what implicit cost would follow (trust, renewal, standing, position)?

If either answer points to directional pressure → put the core conclusions through another Red
Team pass and annotate "politicization vulnerability" under confidence levels.
**Implicit check at the writing layer**: even when both sides are presented, does the *presentation*
(placement, wording, emphasis) still imply the favoured conclusion? (The aluminium-tubes dispute
is exactly this trap.)

### 3. Overconfidence down-ranking (Discipline 17)
If any core conclusion is labelled ≥90%, you must answer:
> **Among the observable signals that exist today, is there any that would make me rewrite this probability?**

If there is none → lower the probability below 80% and explain in the information gaps why no
"signal that would make me rewrite it" could be found.

### Self-check output template

```
[FALSIFIABILITY]
Assumption 1: []  Overturned by: [what evidence] / falsifiable: ✅/❌
Assumption 2: []  Overturned by: [] / falsifiable: ✅/❌

[POLITICIZATION VULNERABILITY]
Conclusion the customer wants to see: []
Implicit cost of the opposite conclusion: []
Additional Red Team pass triggered: ✅/❌
Presentation-bias self-check: [checked / adjustment needed]

[OVERCONFIDENCE]
Conclusions labelled ≥90%: []
Signals that could rewrite the probability: [list at least 1 / if none → down-rank]
```

## Sourcing appendix for Key Judgments (aligned to ICD 206)

**Every core judgment** in the delivered product carries a supporting-source list — a traceable
link between judgment and evidence, so the reader can independently audit what a judgment stands on:

```
[SOURCING APPENDIX]
Judgment 1: [the Key Judgment in one sentence]
  - Source 1: [description] (discipline: OSINT; rating: [A-1]; date: YYYY-MM-DD)
  - Source 2: [description] (discipline: IMINT; rating: [B-2]; date: YYYY-MM-DD)
Judgment 2: […]
  - Source 1: […]
```

Rules:
- Every core judgment entering the conclusions carries **at least one** supporting source; ratings follow SKILL-03 (Admiralty Code A–F × 1–6)
- `[F-6]` (neither axis judgeable) may never be the **sole** support for any judgment
- The appendix is separate from the body and placed after the statement — the body carries the argument, the appendix carries the audit trail

## Cautions
- ✅ On completion, the analysis is finished (deliberate analysis)
- ✅ Update the **SKILL-12** prediction record at the same time (fill in the verification window and trigger indicator)
- 💡 This step also closes the transition from current intelligence to deliberate analysis: check whether the current-intelligence "initial assessment" was carried across unchanged and never re-verified
- 🧪 The three supplementary self-checks (falsifiability, politicization, overconfidence) are the last gate before delivery
- 📎 The three closing items of every delivery: the gaps statement + the sourcing appendix (ICD 206) + the **decision-insurance section** (the SKILL-09 most-dangerous-scenario alert) — all three ship with the product; missing one means the delivery is incomplete
