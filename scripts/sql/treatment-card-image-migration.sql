-- Treatment grid card image (homepage + /treatments)
-- Run in Supabase SQL Editor

ALTER TABLE public.treatments
  ADD COLUMN IF NOT EXISTS card_image     text,
  ADD COLUMN IF NOT EXISTS card_image_alt text;
