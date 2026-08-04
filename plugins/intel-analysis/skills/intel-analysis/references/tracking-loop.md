---
name: tracking-loop
description: >
  Tracking-loop drive contract (the ledger-side mechanisation of Disciplines 19–23):
  intel_loop.py produces "which chains are due, which are entering or past their verification
  window, which are cold-chain candidates"; you verify hits and interpret them with your own
  sources, then record an A/B/C/D disposition back to the ledger. Cadence is yours (daily,
  weekly or event-driven) — the mechanism only knows tracking cycles. Collection is the user's
  own; the runner does no search and touches no network. Read this before each tracking cycle.
---

# tracking-loop — tracking-loop drive contract

> 語言 / Language: [繁體中文](tracking-loop.zh-tw.md) · **English**

## Cadence is not identity (stated up front)

The unit of this mechanism is the **tracking cycle**, not the calendar day. Run it daily, weekly
or event-driven; three cycles in one day during a crisis is equally valid. **Discipline 21's
"three consecutive no-signal results" counts cycles, not days** — a denser cadence therefore
demotes cold chains faster, which is the intended design and not a side effect.

> ⚠️ This file was previously named `daily-loop`. That name wrote the then-current daily
> requirement into the identity of the mechanism (corrected in CHG-20260729-02).

## Division of labour

> **Collection is the user's own.** The runner calls no search, fetches no data and touches no
> network — it is the ledger's state machine and record keeper. For the directed verification of
> Discipline 19(c) and the theatre scan of Discipline 22, **the runner lists what to check;
> going and checking it, and interpreting the result, is done by you (or an agent you assign)
> with your own sources.**

| Who | Does what |
|-----|-----------|
| **Runner (mechanical)** | The coverage list (chains due + keywords to match), the window due / due-soon list (Discipline 23), vacuum detection (Discipline 20), cold-chain candidate computation (Discipline 21), disposition records (append-only) |
| **User (judgment)** | Matching and verifying against your own sources (Discipline 19c three levels: consistent / insufficient / contrary), deciding the A/B/C/D disposition, creating snapshots and closing chains, confirming cold-chain demotion and wake-up |

## Cycle procedure

```
0. python3 scripts/intel_loop.py new --repo .
      → declare the start of a tracking cycle and create its coverage file (YYYY-MM-DD-NN.json)
        repeated log calls within one cycle merge into the same file; run new again to open another
1. python3 scripts/intel_loop.py brief --repo .
      → cycle brief: chains due for coverage (with tags/actors/indicators as your search keywords)
                     + windows due for closure + cold-chain candidates + dormant-chain keywords (for wake-up matching)
2. You verify chain by chain with your own sources (the runner takes no part)
3. Dispose according to your reading:
      - New snapshot / probability change → follow the prediction-ledger procedure (new snapshot, prior version marked superseded)
      - Closure → fill outcome on latest and set verified/invalidated
4. python3 scripts/intel_loop.py log --repo . --chain P-… --outcome A|B|C|D [--note "…"]
      → record in this cycle's coverage file (one entry per chain; a chain with no hits may not be
        carried forward silently — A must be recorded too)
5. python3 scripts/prediction_lint.py --repo . --index   # ledger validation + INDEX regeneration
```

## The four dispositions (Discipline 19d; exactly one per chain, mandatory)

| Code | Meaning | Ledger action |
|------|---------|---------------|
| **A** | Genuinely no signal | No snapshot; log A (the explicit basis for "coverage self-check of prior chains this cycle") |
| **B** | Missed signal (your verification found something) | Create a snapshot, version_note "added by directed verification"; log B |
| **C** | Indirect signal | Create a snapshot noting the indirect source; log C |
| **D** | Window expired into a vacuum | No snapshot; apply Discipline 20 (continuity estimate, stated explicitly in SKILL-11); log D |

Verification comes back contrary (disconfirmed) → treat as disconfirmation (no positive snapshot;
invalidated where appropriate), log B and note the contrary result.

## Cold-chain rules (the mechanisation of Discipline 21)

- **Counting**: the runner reads the last 3 coverage files (= the last 3 **tracking cycles**); a chain recorded A in three consecutive cycles becomes a **cold-chain candidate**.
- **Demotion is your decision**: once confirmed, set `tracking_status` on that chain's latest to `dormant` (in-place update, see below).
- **Wake-up**: the brief lists dormant chains' keywords; when this cycle's material matches, wake-up means re-running SKILL-04→09 in that cycle and creating a snapshot with `version_note` "cold-chain wake-up: signal = …".

## In-place update vs new snapshot (an important distinction)

- **Any change of content or probability → always a new snapshot** (the prediction-ledger iron rule).
- **Operational status fields** — `tracking_status` (active/observing/dormant transitions) and, on closure, `outcome` / `version_status` (latest→verified/invalidated) — are **updated in place on latest** (consistent with the original Notion mechanism: verification is written on the newest row). Historical snapshots (superseded) are never touched.

## Coverage file format (`docs/intel/coverage/YYYY-MM-DD-NN.json`)

One file per cycle, append-only (repeated log calls in the same cycle merge; for a given chain the
last entry wins). `NN` is the cycle number within that date, starting at `01`:

```json
{
  "date": "2026-07-07",
  "cycle": 1,
  "entries": [
    {"chain": "P-2026-0520-03", "outcome": "A", "note": ""},
    {"chain": "P-2026-0601-01", "outcome": "B", "note": "added by directed verification: synthesis signal"}
  ]
}
```

**Backward compatibility**: legacy `YYYY-MM-DD.json` files (no cycle number) are read as cycle 01
of that date; no migration is required. If both `YYYY-MM-DD.json` and `YYYY-MM-DD-01.json` exist
for the same date, that is a cycle-number collision and the runner fails loud (exit code 2).

## Exit codes

`0` normal | `1` error (ledger or arguments) | `2` invalid coverage file format or cycle-number
collision. There is no "legitimate stopping point" semantics here (all judgment sits on the user's side).
