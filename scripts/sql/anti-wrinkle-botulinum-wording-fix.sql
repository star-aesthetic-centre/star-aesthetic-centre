-- Star Aesthetic Centre — Anti-Wrinkle intro & What Is wording
-- Botulinum Toxin first; brand names (Botox® / Xeomin®) in parentheses.
-- Run in Supabase SQL editor if live page still shows old copy from DB overrides.

UPDATE treatments
SET hero_text = REPLACE(
  hero_text,
  '<strong>Botox®</strong> (Botulinum Toxin)',
  '<strong>Botulinum Toxin</strong> (Botox® / Xeomin®)'
)
WHERE slug = 'anti-wrinkle-treatment'
  AND hero_text LIKE '%<strong>Botox®</strong> (Botulinum Toxin)%';

UPDATE treatments
SET what_is = REPLACE(
  what_is,
  'Anti-wrinkle treatments such as Botox® and Xeomin® (Botulinum Toxin Type A) are purified neurotoxin proteins',
  'Our <strong>Anti-Wrinkle Treatment</strong> is performed using <strong>Botulinum Toxin</strong> (Botox® / Xeomin®) — purified neurotoxin proteins'
)
WHERE slug = 'anti-wrinkle-treatment'
  AND what_is LIKE '%Anti-wrinkle treatments such as Botox®%';

UPDATE treatments
SET what_is = REPLACE(what_is, 'Anti-wrinkle treatments do not fill lines', '<strong>Anti-Wrinkle Treatment</strong> does not fill lines')
WHERE slug = 'anti-wrinkle-treatment'
  AND what_is LIKE '%Anti-wrinkle treatments do not fill lines%';

UPDATE treatments
SET what_is = REPLACE(what_is, 'every anti-wrinkle treatment is administered', 'every Anti-Wrinkle Treatment is administered')
WHERE slug = 'anti-wrinkle-treatment'
  AND what_is LIKE '%every anti-wrinkle treatment is administered%';
