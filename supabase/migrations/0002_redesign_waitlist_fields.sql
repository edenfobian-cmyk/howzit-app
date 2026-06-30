-- Howzit Waitlist Redesign — new field set (surname, age, single looking_for)
-- Run this in your Supabase SQL editor after 0001_create_waitlist.sql

ALTER TABLE public.waitlist
  ADD COLUMN IF NOT EXISTS surname     text,
  ADD COLUMN IF NOT EXISTS age         int,
  ADD COLUMN IF NOT EXISTS looking_for text;

ALTER TABLE public.waitlist DROP CONSTRAINT IF EXISTS waitlist_age_group_check;
ALTER TABLE public.waitlist DROP COLUMN IF EXISTS age_group;
ALTER TABLE public.waitlist DROP COLUMN IF EXISTS interests;
ALTER TABLE public.waitlist DROP COLUMN IF EXISTS city;

ALTER TABLE public.waitlist
  ADD CONSTRAINT waitlist_age_check CHECK (age IS NULL OR (age >= 13 AND age <= 100));

ALTER TABLE public.waitlist
  ADD CONSTRAINT waitlist_looking_for_check CHECK (
    looking_for IS NULL OR looking_for IN (
      'jobs', 'friends', 'mentors', 'co-founder',
      'networking', 'internships', 'business-opportunities', 'other'
    )
  );

DROP INDEX IF EXISTS waitlist_city_idx;
