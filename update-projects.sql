-- Migration: add type/company_name to projects, swap LiveKit Voice Agent → DLIR UI
-- Run against your Turso DB via: turso db shell <db-name> < update-projects.sql

-- Step 1: Add new columns
ALTER TABLE projects ADD COLUMN type TEXT DEFAULT 'personal';
ALTER TABLE projects ADD COLUMN company_name TEXT;

-- Step 2: Set type + company_name for existing rows
UPDATE projects SET type = 'company', company_name = 'Spartan'        WHERE title = 'Paratus Service Platform';
UPDATE projects SET type = 'company', company_name = 'Spartan'        WHERE title = 'RPA Automation Service';
UPDATE projects SET type = 'company', company_name = 'Datahouse Asia' WHERE title = 'VizERP';
UPDATE projects SET type = 'personal'                                  WHERE title = 'Fatefolio';
UPDATE projects SET type = 'personal'                                  WHERE title = 'Odia';
UPDATE projects SET type = 'personal'                                  WHERE title = 'Chips Tracker';

-- Step 3: Remove LiveKit Voice Agent
DELETE FROM projects WHERE title = 'LiveKit Voice Agent';

-- Step 4: Fix sort_orders for rows that shifted up
UPDATE projects SET sort_order = 5 WHERE title = 'Fatefolio';
UPDATE projects SET sort_order = 6 WHERE title = 'Odia';
UPDATE projects SET sort_order = 7 WHERE title = 'Chips Tracker';

-- Step 5: Insert DLIR UI
INSERT INTO projects (title, description, tech_stack, github_url, live_url, featured, color, sort_order, year, type, company_name)
VALUES (
  'DLIR UI',
  'Government unemployment claims system for the Department of Labor and Industrial Relations. Complex multi-step form workflows, SOAP-based payment integrations, and a full AngularJS-to-Angular migration.',
  '["Angular","TypeScript","NestJS","PostgreSQL","TypeORM","RxJS","Docker"]',
  NULL,
  NULL,
  0,
  '#7C3AED',
  4,
  2023,
  'company',
  'Datahouse Asia'
);
