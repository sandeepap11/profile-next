---
title: "How I Created an FPL Bot with Ollama"
date: "2026-08-22"
thumbnail: serverUrlPlaceHolder/images/blog/fpl-bot.jpeg
tags:
  - agentic
  - ai
  - llm
  - football
related:
  - local-agent
  - pr-review
---

# I Let an ILP Solver and a Local LLM Draft My Fantasy Premier League Team

Every August, I do the same thing: stare at 700+ Premier League players, a £100m budget, and try to convince myself I'm not just guessing. This year I decided to make the guessing someone — well, something — else's problem.

The result is **Andre Ollama**: a hybrid system where Python does the arithmetic and a local LLM makes the judgment calls. No cloud API, no monthly bill, runs entirely on my Mac.

## Why hybrid, not "just ask the LLM"

Raw LLMs are bad at exactly the things FPL squad selection needs: strict arithmetic (budget constraints, position limits, max-3-per-club rules) and staying grounded in numbers instead of confidently making them up. Ask an LLM to "pick an optimal 15-man squad under £100m" and you'll get something plausible-sounding that's quietly over budget or missing a position.

So I split the problem in two:

- **Python + an ILP solver** picks the mathematically optimal squad — budget, positions, team limits, all enforced as hard constraints. This part is deterministic and provably correct, or it isn't, no in-between.
- **A local LLM** (Qwen3:8b via Ollama) reasons over the _output_ of that math — captaincy, chip timing, whether a "flagged" player is actually worth the risk. Things that don't reduce to arithmetic.

The LLM never touches numbers directly. It gets handed pre-computed, already-valid candidate plans in JSON and picks between them. Keeps the one unreliable component as far from the actual data as possible.

## Architecture

```
FPL API ──▶ xP Engine ──▶ ILP Solver ──▶ Starting XI/Captain shortlist
              (form ×      (PuLP/CBC:                    │
              fixture ×     budget, positions,            ▼
              minutes)      team limits)          Local LLM (Qwen3:8b)
                                                    - picks between plans
                                                    - sets captain/VC
                                                    - advises on chips
                                                            │
                                                            ▼
                                                   SQLite snapshot
                                                   (confirmed by me)
```

State lives in two SQLite tables: `teams` and `snapshots` (one row per confirmed gameweek — squad, bank, free transfers, chip played). Never edited in place, only inserted or deleted. That one design choice gives undo almost for free: rollback is just `DELETE WHERE gw > X`.

## The part I'm actually proud of: linearizing the hit-cost

FPL charges -4 points per transfer beyond your free ones. Baking that into an ILP objective sounds like it needs a `max(0, ...)`, which isn't linear. The trick: let the solver pick the penalty itself.

```python
hits = pulp.LpVariable("hits", lowBound=0, cat="Integer")

prob += (
    pulp.lpSum(include[p] * xp[p] for p in players)
    - hit_cost_per_transfer * hits
)

# transfers_made = 15 - (players kept from your existing squad)
prob += hits >= (15 - kept_from_old) - free_transfers
```

Since more `hits` only ever _hurts_ the objective, the solver naturally settles on the minimum value that satisfies the constraint — which is exactly the real FPL rule. No manual `if` statement anywhere.

## Where the pre-season data thinness showed up

A few honest surprises testing this before a ball's been kicked:

- **It benched two strikers.** Turns out this is a real FPL strategy — cheap "enabler" forwards you never start, freeing budget for stronger defenders/midfielders. The squad-picker doesn't know about formations at all; that's a separate pass afterward that just asks "given these 15, which formation scores highest." Correct behavior, just not what I expected to see.
- **It shortlisted a goalkeeper for captain.** Mathematically defensible on flat pre-season data, completely wrong in practice — nobody captains a keeper, the ceiling's too low. Fixed by excluding GK from the captain shortlist outright rather than trusting the model to know better.
- **It picked Rashford**, who I'm not convinced starts every week. No bug here — there's genuinely no minutes-history signal to lean on yet. Should improve once real form data exists from GW2.

None of these are wrong math. They're the model being exactly as good as the season-opening data it's fed, which is to say: not very.

## What's next

Right now it's a solid GW1 squad picker with real memory (SQLite snapshots, multi-team support, undo). The open piece is a proper transfer-aware optimizer that starts from _my actual current squad_ instead of drafting fresh each week — which is really a different ILP formulation, not a tweak. That's the GW2 problem.

For now: `qwen3:8b`, `PuLP`, one SQLite file, and a healthy amount of "let's see how wrong this is by October."
