# Star Aesthetic content update audit — 2026-07-17

Purpose: track Nakita WhatsApp change requests → Supabase `treatments` table.
Source of truth for live site: **Supabase production** (`kprfezokgsmbizisvcrb`), not git.

## Applied this session (confirmed written to Supabase)

### Acne (`slug = acne`)

| # | Field | Change | Status |
|---|---|---|---|
| 1 | `faqs[0]` | How is acne treated at Star Aesthetic Centre in Durban? (replaced old “best treatment”) | DONE |
| 2 | `faqs[1]` | Can adults get acne treatment, or is acne only a teenage condition? | DONE |
| 3 | `faqs[2]` | How many acne treatments will I need? | DONE |
| 4 | `expected_results` | Weeks 1–2 / 3–4 / 6–8 / 10–12 timeline | DONE |
| 5 | `downtime_detail` | Peels 24–48h + home-care wording | DONE |
| 6 | `how_works` | 7 steps (incl. Visible Improvement) | DONE |
| 7 | `what_is` | 4-paragraph medical “What is Acne Treatment?” | DONE |
| 8 | `price_from` | Removed “(package pricing available)” → `R 850 – R 2,500 per session` | DONE |
| 9 | `tagline` | Medical Acne Treatment in Durban | DONE |
| 10 | `hero_text` | 2-paragraph medical hero | DONE |

### Pigmentation (`slug = pigmentation-treatment`)

| # | Field | Change | Status |
|---|---|---|---|
| 1 | `faqs[0]` | What is the best treatment for melasma? | DONE |
| 2 | `how_works` | 6-step How It Works | DONE |

---

## Likely still pending (from chat previews / screenshots / early session notes)

These appeared in WhatsApp or screenshot context but were **not** updated in this session (verify against full chat):

### Acne — still on older copy unless Nakita only rewrote the items above

- [ ] FAQ: Will my acne come back after treatment?
- [ ] FAQ: Is acne treatment painful? *(DB has this Q; confirm new A)*
- [ ] FAQ: What causes adult hormonal acne? *(chat list preview shows this message — likely still needed)*
- [ ] FAQ: Difference between acne and rosacea?
- [ ] FAQ: Can you treat acne scarring as well?
- [ ] FAQ: What skincare products should I use…?
- [ ] FAQ: Dark marks / PIH after spots?
- [ ] FAQ: What should I avoid eating…?
- [ ] `suitable_for` / Who is this for? (esp. “stop cycling through products…” bullet — highlighted but no replacement text given yet)
- [ ] Short At a Glance `duration` / `downtime` lines (only package pricing was removed)
- [ ] Pricing breakdown section (screenshot showed laptop on Pricing area)

### Pigmentation — only 2 items done of who-knows-how-many Wa folders

- [ ] Remaining pigmentation FAQs (DB had 11 FAQs total; only FAQ #1 rewritten)
- [ ] Hero / tagline / what_is / expected_results / downtime / pricing if rewritten
- [ ] Who is this for? bullets

### Other treatments with 0 FAQs in Supabase (still JSON fallback)

When Nakita rewrites these, DB rows need inventifying first or Admin save:

- body-contouring
- dermapen-microneedling
- excessive-sweating
- medi-lean
- skin-peel
- varicose-veins
- vitamin-drips

Treatments already with FAQ content in DB (partial only):

- anti-wrinkle-treatment (11 FAQs)
- jaw-amp-chin-contouring (10)
- lip-filler (10)

---

## How to audit without Hermes reading WhatsApp

Hermes **cannot** see your logged-in Chrome WhatsApp (isolated browser + computer-use blocked by Windows Application Control). Use one of these:

### Option A — Fastest: export a text backlog (recommended)

1. In WhatsApp Web → Nakita Dr Bangalee chat.
2. Scroll to the **oldest** change request in this content thread.
3. For each request, copy **heading + body** into this markdown under **## Incoming queue** (template below), **or** paste batches of 3–5 into Hermes chat.
4. Hermes marks each DONE in Supabase and ticks this list.

### Option B — Screenshot-only after text fails

- One clear screenshot **per distinct section** (FAQ Q+A, How it works, Hero, At a Glance, etc.)
- Pair with treatment name if not obvious

### Option C — WhatsApp search by keyword

In the Nakita chat search:

- `How It Works`
- `What is`
- `Will my`
- `How many`
- `Remove` / `replace`
- `FAQ` / `pricing` / `Who is`

### Option D — Star / number as you go

- Star each message Nakita sent as a content change
- Optionally reply to yourself with `DONE — acne hero` after apply so the chat is the log

---

## Incoming queue (paste missed items here)

```
### [treatment slug] — [section]
Q or heading:
Answer / body:
Status: TODO | DONE
```

_(empty — fill as you discover misses)_

---

## Apply rule (repeatable)

- Content only → **Supabase `treatments`** via service role or Admin Save.
- No GitHub push required for copy.
- After each batch: hard-refresh public URL + Admin edit page.

Public examples:

- https://staraesthetic.co.za/treatments/skin/acne
- https://staraesthetic.co.za/treatments/skin/pigmentation-treatment  (confirm real path via admin category)

Admin examples:

- /admin/treatments/acne/edit
- /admin/treatments/pigmentation-treatment/edit
