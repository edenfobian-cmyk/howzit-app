-- Howzit Waitlist Table
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS public.waitlist (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  timestamptz DEFAULT now() NOT NULL,
  email       text UNIQUE NOT NULL,
  first_name  text NOT NULL,
  city        text NOT NULL,
  age_group   text CHECK (age_group IN ('18-21', '22-25', '26-29', '30-35')) NOT NULL,
  interests   text[] NOT NULL DEFAULT '{}',
  status      text DEFAULT 'pending' NOT NULL,
  source      text
);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the waitlist form)
CREATE POLICY "Allow anon insert"
  ON public.waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Service role has full access (for admin dashboard)
CREATE POLICY "Service role full access"
  ON public.waitlist
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Case-insensitive unique index to prevent duplicate emails
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_lower_idx
  ON public.waitlist (lower(email));

-- Index for city-based queries
CREATE INDEX IF NOT EXISTS waitlist_city_idx ON public.waitlist (city);

-- Index for status filtering
CREATE INDEX IF NOT EXISTS waitlist_status_idx ON public.waitlist (status);
