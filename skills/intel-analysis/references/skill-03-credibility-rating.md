---
name: skill-03-credibility-rating
description: >
  SKILL-03|Source reliability & information credibility (Systemic layer A, spanning Steps 2–10):
  the Admiralty Code two-axis rating — source reliability (A–F) × information credibility (1–6),
  with a mapping from the legacy A–D × 1–4 scale — plus cross-language corroboration, information-
  operations detection, the MOM/POP/MOSES/EVE deception-detection frameworks, chronological and
  narrative consistency checks, and the structural-bias check by collection discipline. Core
  question: is this reporting credible? Are the sources genuinely independent? Is this deliberate
  deception by the adversary?
---

# SKILL-03|Source reliability & information credibility

> 語言 / Language: [繁體中文](skill-03-credibility-rating.zh-tw.md) · **English**

## Overview
Rate every key item of reporting on both axes — source reliability and information credibility —
trace the independence of the information chain, test narrative consistency, and decide whether
the reporting is usable.

## Framework position
**Systemic layer A**|Information triage and credibility rating (spans Steps 2 through 10)

## Core question
> Is this reporting credible? Are the sources genuinely independent? Does the narrative hold
> together?

## Governing principle
> **A count of sources is not independence.** Several outlets reporting the same thing is not
> corroboration — you must trace whether the information chains are genuinely independent.
> Reporting that fails a consistency check is not to be discarded outright; it goes to the
> holding file for continued tracking.

## Procedure
**1. Two-axis rating**: tag each key item with source reliability × information credibility
**2. Corroboration**: trace the information chain for genuine independence; rule out false corroboration
**3. Narrative consistency**: check whether the overall narrative holds together; flag contradictions
**4. Disposition**: credible reporting proceeds to SKILL-04; doubtful reporting goes to the SKILL-10 holding file

## The two-axis rating (Admiralty Code, NATO standard: A–F × 1–6)

### Source reliability (A–F)

| Grade | Meaning | Example |
|-------|---------|---------|
| **A** Completely reliable | Unimpeachable track record: official first-party statements, confirmed satellite imagery, authoritative institutions (IISS, CSIS, ACLED) | A US Department of Defense statement |
| **B** Usually reliable | Reliable most of the time: mainstream media quoting a named official, OSINT accounts with a track record | Reuters quoting a State Department official |
| **C** Fairly reliable | More often right than wrong: regional media, named experts without an established track record | Named regional-media reporting |
| **D** Not usually reliable | More often wrong than right: anonymous sources, single-outlet exclusives, unverified social content | An anonymous military source |
| **E** Unreliable | Untrustworthy track record: known propaganda organs, belligerents' own claims of results | A belligerent's battle-damage report |
| **F** Cannot be judged | No usage history to rate on — **this is the cell that admits ignorance; new sources enter here by default and are not given A–E on first impression** | A Telegram channel appearing for the first time |

### Information credibility (1–6)

| Grade | Meaning |
|-------|---------|
| **1** Confirmed | Corroborated by independent multiple sources (subject to the cross-language rule below) |
| **2** Probably true | Logically consistent with known facts, but single-sourced |
| **3** Possibly true | Partly consistent with what is known; could not be corroborated |
| **4** Doubtful | Partly contradicts confirmed facts |
| **5** Improbable | Fundamentally contradicts confirmed facts, or shows evidence of deliberate fabrication |
| **6** Cannot be judged | No basis for assessing truth or falsity — **"cannot be judged" ≠ "false"; it means unknown and must not be used as disconfirmation** |

**Tagging examples**: `[A-1]` completely reliable, confirmed | `[D-3]` not usually reliable, possibly true | `[E-5]` suspected information operation | `[F-6]` first report from a new source, neither axis judgeable

### Legacy-scale mapping (the v1.0 A–D × 1–4 scale; read historical tags via this table, do not rewrite them)

| Legacy | Current | Note |
|--------|---------|------|
| Legacy A (high reliability) | A | Same |
| Legacy B (generally reliable) | B | Same |
| Legacy C (to be confirmed) | D or F | Negative indicators → D; simply no history to rate → F |
| Legacy D (unreliable) | E | Same |
| Legacy 1 (confirmed) | 1 | Same |
| Legacy 2 (probably correct) | 2 | Same |
| Legacy 3 (unconfirmed) | 3 or 6 | Partly checkable → 3; wholly unverifiable → 6 |
| Legacy 4 (doubtful) | 4 or 5 | Partial contradiction → 4; fundamental contradiction or signs of fabrication → 5 |

## Corroboration rules

- ✅ **Genuine corroboration**: multiple **independent information chains** converging on the same conclusion
- ❌ **False corroboration**: many outlets reporting it, all tracing back to the same anonymous source

**Operation**: for every item rated below C on reliability (C/D/E/F), trace whether the information chain is genuinely independent

### Cross-language corroboration rule

Credibility 1 (confirmed) requires at least **two information chains in different languages**.
Same-language outlets citing one another do not count as independent sources.

- **Language groups**: English (Reuters, AP, BBC, CNN, NYT and similar), Arabic (Al Jazeera, Al Mayadeen, Al Arabiya), Persian (Tasnim, IRNA, Fars), Hebrew (Haaretz, Ynet, Times of Israel), Chinese (Xinhua, CNA, UDN), Japanese (NHK, Kyodo), European languages (DW, Le Monde, Corriere), Korean (Yonhap, Chosun Ilbo), Urdu/Hindi (Dawn, The Hindu)
- **Decision rules**:
  - Reuters cites Tasnim → AP cites Reuters → BBC cites AP: **one information chain** (all English-language, originating in Persian-language Tasnim) → credibility 2 at most
  - Reuters reporting (English) + independent Al Jazeera reporting (Arabic): **two independent chains** → credibility 1 available
  - S&P Global data (English) + MarineTraffic AIS satellite data (hard data): **hard data is not bound by the language rule** → credibility 1 available
- **Where only same-language cross-citation exists**, cap at credibility 2 and annotate "⚠️ false-corroboration risk (same language)"
- **Hard-data exemption**: independently verifiable hard data — live financial-market data, AIS satellite tracking, meteorological data — is not bound by the language rule and counts as an independent chain on its own

## Information-operations detection checklist

For each item — especially reliability D/E/F or credibility 4–6 — check for these indicators of an information operation:

- **Coordinated amplification**: nominally independent accounts or outlets pushing an identical narrative within a short window (check publication times and wording similarity)
- **Single-origin diffusion**: many outlets reporting it, all tracing back to one anonymous source or one Telegram channel
- **Anomalous share of emotive language**: emotive wording markedly above that outlet's own baseline
- **Chronological anomaly**: the report predates the time the event could have occurred, or contradicts the sequence of other confirmed events
- **Signs of AI-generated content**: analysis pieces or expert commentary on non-mainstream platforms with overly uniform style, no concrete detail, or an author with no traceable publication history

On any such indicator, flag ⚠️ and downgrade: source reliability drops one grade automatically (B→C, for instance), with the reason recorded in the calibration note.

## Deception detection: the four frameworks (MOM/POP/MOSES/EVE)

The checklist above catches the **surface signature of diffusion**; when the concern is
**deliberate, targeted deception by the adversary**, switch to this structured assessment (SAT canon).

**Triggers (any one is sufficient)**:
- A high-impact judgment rests on a single source or a single collection leg
- The adversary is in a situation with strong incentives to deceive (before negotiations, before launching an operation, covering a deployment)
- The four collection legs agree too closely (the "reverse question" of the structural-bias check has fired)
- A HUMINT source's motive or background is in doubt

| Framework | Full name | What it assesses | Questions to ask |
|-----------|-----------|------------------|------------------|
| **MOM** | Motive, Opportunity, Means | The adversary's motive, opportunity and means to deceive | What does the adversary gain by deceiving me? Is there a channel to reach or shape my sources? Is there the capability to fabricate this kind of evidence? |
| **POP** | Past Opposition Practices | The adversary's history of deception | Has this adversary used deception before? What patterns recur? Do the conditions that made it work then still hold? |
| **MOSES** | Manipulability of Sources | How susceptible our own sources are | How easily could the adversary reach or feed this source? Does the source have a history of being manipulated? |
| **EVE** | Evaluation of Evidence | The evidence itself | Is the key evidence complete? Is it internally consistent? Is it "too good to be true"? Where are the gaps concentrated? |

### Output template for the four frameworks

```
Item: [description]  Current rating: [X-n]
MOM: motive [] / opportunity [] / means [] → feasibility of deception: [high/medium/low]
POP: historical pattern [] → match to past practice: [high/medium/low/no record]
MOSES: source susceptibility [] → [high/medium/low]
EVE: completeness [] / consistency [] / too good to be true? [yes/no]
Conclusion: [no indication of deception / deception possible (N frameworks point to it) / deception confirmed]
```

**Disposition**: ≥2 frameworks pointing to deception → downgrade that reporting chain (reliability
down one grade, or to F) and annotate "deception vulnerability" in SKILL-11; deception confirmed →
`[Discredited]`, followed by a **reverse intelligence-value analysis** — what the adversary wants
you to believe is itself a signal of the adversary's intent (feeds back to SKILL-04/07).

## Chronological consistency check

Across multiple reports of the same event, check whether the sequence is coherent:
- Event A is claimed to have occurred at 14:00, but event B (which should follow A) was already reported at 13:30 → **chronological contradiction** ⚠️
- A government's official statement predates the reporting of the event → possibly pre-prepared propaganda material ⚠️
- Timestamps across reports match the development of the event → **chronologically consistent** ✅

A chronological contradiction does not by itself disprove the reporting, but it should lower
credibility and put the item in the holding file for tracking.

## Narrative consistency check

- A party claims a "decisive victory" while simultaneously requesting international mediation → **narrative contradiction** ⚠️
- Military moves (forward deployment) and diplomatic moves (tabling negotiating terms) appear together → **narratively consistent** ✅

> ⚠️ Narrative inconsistency ≠ discard the reporting. Contradictory reporting goes to the holding
> file (SKILL-10) and stays under tracking.

## Structural-bias check by collection discipline

For each item, answer the structural counter-question matching its collection discipline (tagged
in SKILL-02). This is not optional — each of the four legs has an ineradicable native weakness,
and skipping the question outsources your judgment to the adversary's intermediary.

| Discipline | What it provides | Structural weakness | Counter-question |
|------------|------------------|---------------------|------------------|
| **HUMINT** | Intent, decision logic, internal divisions | Motive contamination | Why is the source providing this? Is it adversary feed-back? Is the validation history clean? |
| **SIGINT** | Communications content, operational orders | Signal-to-noise, deliberate leakage | Does the adversary know this channel is intercepted? Is this a strategic leak or a lure? |
| **IMINT** | Physical deployment, activity on the ground | Visual deception | Is this camouflage, decoys, or a psychological-operations display? Does it match the logistics signature? |
| **OSINT** | Public posture, narrative, declarations | Influence operations | Is this a coordinated narrative push? Is the publication timing synchronised with other narrative nodes? |

**Disposition rules**:
- If the counter-question has no concrete answer ("cannot be determined" counts as concrete), downgrade the item into the pending pool
- If the answer is "may be affected by structural bias" but the item is still to be used, record a confidence deduction in the SKILL-09 scenarios
- **Reverse question**: if all four legs point the same way, you must ask "why is no leg dissenting?" — excessive agreement is itself an indicator of bias (see the 2003 Iraq WMD case)

> 💡 This check is downstream of the SKILL-02 discipline tagging: with no discipline tag, the
> structural counter-question cannot be run at all.

## Output format

```
Item: [description]
Source reliability: [A/B/C/D/E/F]  Rationale: []
Information credibility: [1/2/3/4/5/6]  Rationale: []
Combined tag: [A-1] / [D-3] / [F-6] etc.
Corroboration: independent chains [] / genuinely independent [yes/no]
Narrative consistency: [consistent / contradictory / to be watched]
Disposition: [citable directly / to the holding file / downgraded, not used]
```

## Cautions
- ⚠️ Reporting at reliability **D/E/F** or credibility **4/5/6** does **not** enter the main scenario-forecasting judgment (it goes to the SKILL-10 holding file); F/6 = cannot be judged ≠ discard, keep tracking
- ✅ Once rated, credible reporting proceeds to SKILL-04 and doubtful reporting to the SKILL-10 holding file
- 📏 The scale is the Admiralty Code (NATO standard, A–F × 1–6); read v1.0 legacy tags through the mapping table above
