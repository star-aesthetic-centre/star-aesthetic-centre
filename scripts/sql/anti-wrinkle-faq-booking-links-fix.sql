-- Star Aesthetic Centre — Anti-Wrinkle FAQ: booking links + phone/WhatsApp bullets
-- Run in Supabase if live FAQs are stored in the treatments table (DB overrides JSON).

UPDATE treatments
SET faqs = (
  SELECT COALESCE(jsonb_agg(
    CASE
      WHEN elem->>'question' = 'How do I find a qualified practitioner for Anti-Wrinkle Treatment in Durban?'
      THEN jsonb_set(
        elem,
        '{answer}',
        to_jsonb(
          '<p>Always seek Anti-Wrinkle Treatment from a <strong>qualified, registered medical practitioner</strong> — not a beauty salon or untrained injector. <strong>Dr. Rajeev Bangalee</strong> is a qualified medical doctor registered with the <strong>HPCSA</strong> (Health Professions Council of South Africa) with specific aesthetic medicine training.</p><p>Book at Star Aesthetic Centre:</p><ul><li><span><a href="/book" class="font-semibold text-[#1B3D6E] underline underline-offset-2 hover:text-[#939EBA]">Book Online</a></span></li><li><span><a href="tel:+27315731325" class="font-semibold text-[#1B3D6E] underline underline-offset-2 hover:text-[#939EBA]">+27 (0)31 573 1325</a></span></li><li><span><a href="https://wa.me/27601230000" class="font-semibold text-[#1B3D6E] underline underline-offset-2 hover:text-[#939EBA]" target="_blank" rel="noopener noreferrer">060 123 0000 (WhatsApp)</a></span></li></ul>'::text
        )
      )
      ELSE elem
    END
  ), '[]'::jsonb)
  FROM jsonb_array_elements(COALESCE(faqs, '[]'::jsonb)) AS elem
)
WHERE slug = 'anti-wrinkle-treatment'
  AND faqs IS NOT NULL;
