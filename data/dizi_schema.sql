PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS sources (
  source_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  source_type TEXT,
  source_level TEXT NOT NULL,
  author_or_org TEXT,
  year INTEGER,
  url TEXT,
  citation TEXT,
  accessed_date TEXT,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS persons (
  person_id TEXT PRIMARY KEY,
  name_zh TEXT NOT NULL,
  name_alt TEXT,
  birth_year INTEGER,
  death_year INTEGER,
  region TEXT,
  roles TEXT,
  style_tags TEXT,
  summary TEXT,
  verification_status TEXT NOT NULL DEFAULT '需查證',
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS institutions (
  institution_id TEXT PRIMARY KEY,
  name_zh TEXT NOT NULL,
  name_alt TEXT,
  institution_type TEXT,
  region TEXT,
  url TEXT,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS works (
  work_id TEXT PRIMARY KEY,
  title_zh TEXT NOT NULL,
  title_alt TEXT,
  genre TEXT,
  difficulty TEXT,
  style_tags TEXT,
  summary TEXT,
  technique_focus TEXT,
  verification_status TEXT NOT NULL DEFAULT '需查證',
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS techniques (
  technique_id TEXT PRIMARY KEY,
  name_zh TEXT NOT NULL,
  category TEXT,
  definition TEXT,
  practice_method TEXT,
  common_errors TEXT,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS literature (
  literature_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  authors TEXT,
  year INTEGER,
  literature_type TEXT,
  keywords TEXT,
  abstract TEXT,
  research_value TEXT,
  access_status TEXT DEFAULT '待取得',
  verification_status TEXT NOT NULL DEFAULT '需查證',
  notes TEXT
);

CREATE TABLE IF NOT EXISTS media (
  media_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  media_type TEXT,
  platform TEXT,
  performer_person_id TEXT,
  related_work_id TEXT,
  year INTEGER,
  url TEXT,
  verification_status TEXT NOT NULL DEFAULT '需查證',
  notes TEXT,
  FOREIGN KEY (performer_person_id) REFERENCES persons(person_id),
  FOREIGN KEY (related_work_id) REFERENCES works(work_id)
);

CREATE TABLE IF NOT EXISTS relationships (
  relationship_id TEXT PRIMARY KEY,
  from_person_id TEXT NOT NULL,
  to_person_id TEXT NOT NULL,
  relation_type TEXT NOT NULL,
  evidence_summary TEXT,
  source_id TEXT,
  verification_status TEXT NOT NULL DEFAULT '需查證',
  notes TEXT,
  FOREIGN KEY (from_person_id) REFERENCES persons(person_id),
  FOREIGN KEY (to_person_id) REFERENCES persons(person_id),
  FOREIGN KEY (source_id) REFERENCES sources(source_id)
);

CREATE TABLE IF NOT EXISTS events (
  event_id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  title TEXT NOT NULL,
  event_date TEXT,
  person_id TEXT,
  work_id TEXT,
  institution_id TEXT,
  source_id TEXT,
  notes TEXT,
  FOREIGN KEY (person_id) REFERENCES persons(person_id),
  FOREIGN KEY (work_id) REFERENCES works(work_id),
  FOREIGN KEY (institution_id) REFERENCES institutions(institution_id),
  FOREIGN KEY (source_id) REFERENCES sources(source_id)
);

CREATE TABLE IF NOT EXISTS person_institution (
  person_id TEXT NOT NULL,
  institution_id TEXT NOT NULL,
  role TEXT,
  start_year INTEGER,
  end_year INTEGER,
  source_id TEXT,
  notes TEXT,
  PRIMARY KEY (person_id, institution_id, role),
  FOREIGN KEY (person_id) REFERENCES persons(person_id),
  FOREIGN KEY (institution_id) REFERENCES institutions(institution_id),
  FOREIGN KEY (source_id) REFERENCES sources(source_id)
);

CREATE TABLE IF NOT EXISTS person_work (
  person_id TEXT NOT NULL,
  work_id TEXT NOT NULL,
  role TEXT NOT NULL,
  source_id TEXT,
  notes TEXT,
  PRIMARY KEY (person_id, work_id, role),
  FOREIGN KEY (person_id) REFERENCES persons(person_id),
  FOREIGN KEY (work_id) REFERENCES works(work_id),
  FOREIGN KEY (source_id) REFERENCES sources(source_id)
);

CREATE TABLE IF NOT EXISTS work_technique (
  work_id TEXT NOT NULL,
  technique_id TEXT NOT NULL,
  importance TEXT,
  notes TEXT,
  PRIMARY KEY (work_id, technique_id),
  FOREIGN KEY (work_id) REFERENCES works(work_id),
  FOREIGN KEY (technique_id) REFERENCES techniques(technique_id)
);

CREATE TABLE IF NOT EXISTS literature_person (
  literature_id TEXT NOT NULL,
  person_id TEXT NOT NULL,
  notes TEXT,
  PRIMARY KEY (literature_id, person_id),
  FOREIGN KEY (literature_id) REFERENCES literature(literature_id),
  FOREIGN KEY (person_id) REFERENCES persons(person_id)
);

CREATE TABLE IF NOT EXISTS literature_work (
  literature_id TEXT NOT NULL,
  work_id TEXT NOT NULL,
  notes TEXT,
  PRIMARY KEY (literature_id, work_id),
  FOREIGN KEY (literature_id) REFERENCES literature(literature_id),
  FOREIGN KEY (work_id) REFERENCES works(work_id)
);

CREATE TABLE IF NOT EXISTS source_claims (
  claim_id TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  field_name TEXT NOT NULL,
  claim_text TEXT NOT NULL,
  source_id TEXT NOT NULL,
  verification_status TEXT NOT NULL DEFAULT '需查證',
  notes TEXT,
  FOREIGN KEY (source_id) REFERENCES sources(source_id)
);

CREATE INDEX IF NOT EXISTS idx_persons_name ON persons(name_zh);
CREATE INDEX IF NOT EXISTS idx_works_title ON works(title_zh);
CREATE INDEX IF NOT EXISTS idx_literature_title ON literature(title);
CREATE INDEX IF NOT EXISTS idx_sources_level ON sources(source_level);
CREATE INDEX IF NOT EXISTS idx_relationships_from ON relationships(from_person_id);
CREATE INDEX IF NOT EXISTS idx_relationships_to ON relationships(to_person_id);
