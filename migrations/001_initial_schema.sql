-- Vegavath Website — Initial Schema
-- Migration 001 — Run once against Neon production database
-- All tables, constraints, and indexes defined here

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─────────────────────────────────────────
-- EVENTS
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             TEXT UNIQUE NOT NULL,
  title            TEXT NOT NULL,
  category         TEXT NOT NULL CHECK (category IN ('workshops', 'competitions', 'talks', 'other')),
  status           TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'past', 'archived')),
  description      TEXT,
  event_date       DATE NOT NULL,
  logo_url         TEXT,
  cover_image_url  TEXT,
  registration_open BOOLEAN NOT NULL DEFAULT false,
  registration_form_url TEXT,
  sponsors         JSONB DEFAULT '[]',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_events_status    ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_date      ON events(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_events_slug      ON events(slug);

-- ─────────────────────────────────────────
-- TEAM MEMBERS
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS team_members (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT NOT NULL,
  role           TEXT NOT NULL,
  tier           TEXT NOT NULL CHECK (tier IN ('core', 'crew', 'legacy')),
  domain         TEXT CHECK (domain IN ('Automotive', 'Robotics', 'Design', 'Media', 'Marketing', 'Programming', 'Operations')),
  quote          TEXT,
  photo_url      TEXT,
  display_order  INTEGER NOT NULL DEFAULT 0,
  is_active      BOOLEAN NOT NULL DEFAULT true,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_members_tier     ON team_members(tier, display_order);
CREATE INDEX IF NOT EXISTS idx_members_active   ON team_members(is_active);

-- ─────────────────────────────────────────
-- GALLERY ITEMS
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery_items (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id       UUID REFERENCES events(id) ON DELETE SET NULL,
  event_label    TEXT NOT NULL,
  type           TEXT NOT NULL CHECK (type IN ('image', 'video')),
  url            TEXT NOT NULL,
  thumbnail_url  TEXT,
  caption        TEXT,
  taken_at       DATE,
  display_order  INTEGER NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_gallery_event    ON gallery_items(event_id);
CREATE INDEX IF NOT EXISTS idx_gallery_order    ON gallery_items(display_order);

-- ─────────────────────────────────────────
-- SPONSORS
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sponsors (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT NOT NULL,
  logo_url       TEXT NOT NULL,
  website_url    TEXT,
  description    TEXT,
  tier           TEXT NOT NULL DEFAULT 'community' CHECK (tier IN ('title', 'gold', 'silver', 'community')),
  is_active      BOOLEAN NOT NULL DEFAULT true,
  display_order  INTEGER NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sponsors_active  ON sponsors(is_active, display_order);

-- ─────────────────────────────────────────
-- APPLICATIONS (Join Us)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS applications (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT NOT NULL,
  email            TEXT NOT NULL,
  domain_interest  TEXT NOT NULL CHECK (domain_interest IN ('Automotive', 'Robotics', 'Design', 'Media', 'Marketing')),
  portfolio_url    TEXT,
  status           TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  submitted_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_applications_date ON applications(submitted_at DESC);

-- ─────────────────────────────────────────
-- SITE SETTINGS
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Default settings
INSERT INTO site_settings (key, value) VALUES
  ('recruitment_open',    'false'),
  ('maintenance_mode',    'false'),
  ('maintenance_message', 'We are updating the site. Check back soon.'),
  ('contact_email',       ''),
  ('contact_phone',       ''),
  ('contact_address',     'PES University, Electronic City Campus, Bangalore'),
  ('instagram_url',       ''),
  ('linkedin_url',        ''),
  ('github_url',          '')
ON CONFLICT (key) DO NOTHING;

-- ─────────────────────────────────────────
-- UPDATED_AT TRIGGER (for events table)
-- ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();