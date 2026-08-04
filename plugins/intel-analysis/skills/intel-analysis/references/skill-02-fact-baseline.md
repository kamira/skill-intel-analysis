---
name: skill-02-fact-baseline
description: >
  SKILL-02|Fact baseline & background (Step 2): establish a shared factual basis, separating
  confirmed fact [FACT], reasoned inference [INFER] and unverified reporting [PENDING]; a
  six-tier collection priority plus mandatory collection-discipline tagging
  (HUMINT/SIGINT/IMINT/OSINT). Core question: what is established fact? Never let an assumption
  pass as a fact.
---

# SKILL-02|Fact baseline & background

> 語言 / Language: [繁體中文](skill-02-fact-baseline.zh-tw.md) · **English**

## Overview
Establish a shared factual basis, separating confirmed fact, reasoned inference and unverified
reporting, so that everything downstream rests on an honest information base.

## Framework position
**Step 2**|Ten-step analytic framework

## Core question
> What is established fact?

## Governing principle
> **Never let an assumption pass as a fact.** This step forces you to mark the line: what you
> know, and what you are inferring. The quality of every later step is capped by how honest you
> are here.

## Procedure

**1. List established facts**
- Events confirmed to have occurred, with sources where available
- Format: `[event] [source] [date]`
- **An assumption must never be entered in this section**

**2. Establish the essential background**
- Why this matters (2–4 sentences at most)
- Relationship to prior analysis (where applicable)

**3. Mark what changed since the prior analysis** (where applicable)
- New signals
- Forecasts confirmed or broken
- Whether probability labels need adjusting

**4. Collection priority**
When building the fact baseline, actively seek sources in this order rather than waiting for
material to arrive:
- **First**: official first-party statements (governments, militaries, central-bank releases)
- **Second**: local-language mainstream media (Persian-language reporting on Iran, Hebrew-language
  on Israel, Arabic-language on Lebanon and the Gulf, and so on)
- **Third**: international wire services (Reuters, AP, AFP) and multilingual mainstream media
- **Fourth**: hard OSINT data (AIS and satellite tracking, live financial-market data,
  meteorological data, ACLED / FIRMS satellite monitoring) — see the index of directly
  obtainable OSINT sources
- **Fifth**: authoritative think tanks and research institutes (IISS, CSIS, ICG, Atlantic
  Council and similar)
- **Sixth**: social media and OSINT accounts (usable only after rating under SKILL-03)

> ❗ This ordering is what makes the cross-language corroboration rule (SKILL-03) executable. On
> English-language input alone, cross-language corroboration cannot be performed at all.

**5. Separate fact from assumption**

| Type | Tag | Meaning |
|------|-----|---------|
| Confirmed fact | `[FACT]` | Reliably sourced; may be cited directly |
| Reasoned inference | `[INFER]` | Logically consistent with the facts, but must be labelled |
| Unverified | `[PENDING]` | Not yet confirmed; goes to the holding file |

**6. Tag the collection discipline (mandatory)**
Every established fact must carry its collection discipline; this feeds the structural-bias check
in SKILL-03 directly:
- **HUMINT**: human intelligence (sources, defectors, diplomatic observation, interviews)
- **SIGINT**: signals intelligence (intercepted communications, electronic emissions, radar)
- **IMINT**: imagery intelligence (satellite, aerial, ground imagery, UAV)
- **OSINT**: open-source intelligence (media, official statements, social posts, public records,
  trade data)
- **Multi-source**: fused from several disciplines; name the primary one

> ⚠️ A fact with no collection discipline may not enter later analysis. Each collection leg
> carries an irreducible structural bias; leaving it untagged is giving up on calibration.

## Output format

```
[ESTABLISHED FACTS]
- [FACT] Event A (source, date) | discipline: [HUMINT/SIGINT/IMINT/OSINT/multi-source]
- [FACT] Event B (source, date) | discipline: [HUMINT/SIGINT/IMINT/OSINT/multi-source]

[BACKGROUND]
- Why it matters: [2–4 sentences]

[CHANGES SINCE PRIOR ANALYSIS]
- New: []
- Confirmed: []
- Broken: []
```

## Cautions
- ⚠️ **Never** let assumptions bleed into the fact section; the quality of all later analysis
  depends on the honesty of this step
- ✅ Next: **SKILL-03** (source reliability & information credibility) and **SKILL-04** (actor analysis)
- 💡 Unverified reporting flows automatically into the **SKILL-10** holding file for tracking
