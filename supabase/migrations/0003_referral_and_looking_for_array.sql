-- 0003: Convert looking_for to text[], add referral system

-- Convert looking_for from text to text[]
ALTER TABLE public.waitlist
  ALTER COLUMN looking_for TYPE text[]
  USING CASE
    WHEN looking_for IS NULL THEN NULL
    ELSE ARRAY[looking_for]
  END;

-- Drop the old single-value check constraint
ALTER TABLE public.waitlist DROP CONSTRAINT IF EXISTS waitlist_looking_for_check;

-- Add referral columns
ALTER TABLE public.waitlist
  ADD COLUMN IF NOT EXISTS referral_code text UNIQUE,
  ADD COLUMN IF NOT EXISTS referred_by   text;

-- Indexes for referral queries
CREATE INDEX IF NOT EXISTS waitlist_referral_code_idx ON public.waitlist (referral_code);
CREATE INDEX IF NOT EXISTS waitlist_referred_by_idx   ON public.waitlist (referred_by);
