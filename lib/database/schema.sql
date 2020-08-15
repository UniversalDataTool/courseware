CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS course (
  course_id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  course_num serial NOT NULL UNIQUE,
  edit_key text NOT NULL DEFAULT md5(random()::text),
  dataset jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS course_completion (
  course_completion_id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL references course,
  email text NOT NULL,
  contact_info jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT current_timestamp,
  UNIQUE(course_id, email)
);
