---
name: skill-17-supply-chain
description: >
  SKILL-17|Supply chain & technical systems (extension module, integrated with the SKILL-08
  cross-domain transmission matrix): the node-vulnerability matrix (concentration /
  substitutability / inventory buffer / recovery time / cascade reach) plus five bottleneck classes
  (geographic / resource / technological / infrastructure / human). Core question: where is the
  bottleneck, and how long is the alternative path? Vulnerability sits at the weakest node, not at
  the average.
---

# SKILL-17|Supply chain & technical systems

> 語言 / Language: [繁體中文](skill-17-supply-chain.zh-tw.md) · **English**

## Overview
Assess the vulnerability of supply chains and technical systems — identifying bottleneck nodes,
alternative routes, inventory buffers and recovery times — to give the SKILL-08 cross-domain
transmission a structural footing.

## Framework position
**Extension module**|Tightly integrated with the cross-domain transmission matrix in SKILL-08 (second-order effects)

## Core question
> Which node of the supply chain does this shock hit? How long does an alternative route take?
> How long does inventory hold?

## Governing principle
> **Supply-chain vulnerability sits not at the average but at the weakest bottleneck node.** A
> chain that looks healthy can collapse entirely on a single bottleneck — one strait, one
> supplier, one source of a technology. The analytic work is to find the bottleneck, assess the
> alternatives and compute the buffer.

## Procedure
**1. Map the affected supply chain**: from raw material to end use, identify the key nodes
**2. Identify the bottleneck nodes**: which nodes are irreplaceable or prohibitively costly to replace
**3. Assess the alternative routes**: availability, time to stand up, capacity ceiling
**4. Compute the buffer**: days of inventory, strategic reserves, surge capacity
**5. Assess the cascade**: how an interruption at this node transmits to downstream industries and markets

## The vulnerability assessment framework

### Node-vulnerability matrix

| Dimension | Question | Assessment |
|-----------|----------|------------|
| **Concentration** | What share passes through this node? | > 30% = high risk |
| **Substitutability** | Is there an alternative route, and how long to stand it up? | No alternative = extreme risk; > 6 months to stand up = high risk |
| **Inventory buffer** | How long does downstream inventory hold? | < 30 days = high risk |
| **Recovery time** | How long to restore after an interruption? | > 3 months = high risk |
| **Cascade reach** | How many downstream industries are affected? | > 3 industries = high transmission |

### Common bottleneck classes

| Class | Examples |
|-------|----------|
| **Geographic** | The Strait of Hormuz (20% of global oil), the Strait of Malacca, the Suez Canal |
| **Resource** | Rare earths (China processes 60%+), helium (mainly US and Qatar) |
| **Technological** | Advanced semiconductor fabrication (TSMC), EUV lithography (ASML) |
| **Infrastructure** | LNG regasification capacity, submarine-cable landing points, port throughput |
| **Human** | Concentration of specific technical skills, seafarer supply |

## Assessment template

```
System affected: [energy / semiconductors / shipping / food / other]
Triggering event: []

[SUPPLY-CHAIN MAP]
Key nodes: [upstream] → [midstream] → [downstream] → [end use]
Node struck: []

[BOTTLENECK ASSESSMENT]
Node: []
Concentration: [X% passes through this node]
Substitutability: [yes/no]  Alternative route: []  Time to stand up: []
Inventory buffer: [downstream inventory, N days]
Recovery time: [estimated N days / weeks / months]

[ALTERNATIVES]
Route 1: []  Capacity ceiling: []  Time to stand up: []  Cost increase: []
Route 2: []  Capacity ceiling: []  Time to stand up: []  Cost increase: []
Strategic reserve: [releasable volume]  Duration: []

[CASCADE]
Industries directly affected: []
Price transmission: [estimated magnitude]
Second-order effects: [downstream of the downstream]

[TIMELINE]
Short term (1–2 weeks): []
Medium term (1–3 months): []
Long term (3 months+): []
```

## Output format

```
System: []  Node struck: []
Bottleneck risk: [concentration / substitutability / inventory / recovery time]
Alternatives: []  Time to stand up: []  Capacity shortfall: []
Cascade: [direct industries] → [price transmission] → [second-order effects]
Timeline: [short / medium / long-term effects]
Feeds back to SKILL-08: [update the cross-domain transmission matrix]
```

## Cautions
- ⚠️ **Officially published inventory data may be stale or inaccurate** — corroborate it
- ⚠️ "Theoretical capacity" and "actually available capacity" on an alternative route often differ substantially
- ⚠️ Watch for the alternative-to-the-alternative problem — a substitute route may be blocked by another concurrent event
- ✅ Feed the assessment back to the SKILL-08 cross-domain transmission matrix (economic→military, economic→political)
- ✅ Log the key indicators (oil price, freight rates, insurance premiums) in the SKILL-10 indicators
- 💡 Market reaction to a supply-chain interruption usually comes in two phases: panic response, then rational repricing
