-- Migration: add stats column to projects + populate Paratus metrics
-- Run against your Turso DB via: turso db shell <db-name> < add-project-stats.sql

-- Step 1: Add stats column (JSON-encoded array of { value, label })
ALTER TABLE projects ADD COLUMN stats TEXT;

-- Step 2: Populate Paratus stats (Retell analytics, May 11 - Jun 7 2026 + platform)
UPDATE projects
SET stats = '[{"value":"14.5K","label":"AI calls / mo"},{"value":"1.7s","label":"median latency"},{"value":"4","label":"EHR integrations"},{"value":"10+","label":"clinics live"}]'
WHERE title = 'Paratus Service Platform';
