export type DiziMaster = Readonly<{
  id: string
  name: string
  birth_death: string
  region: string
  roles: string
  institution: string
  style: string
  priority: string
  summary: string
  works: readonly string[]
  sources: readonly string[]
  source_path: string
}>

export type RepertoireItem = Readonly<{
  id: string
  title: string
  creator: string
  people: string
  type: string
  style: string
  status: string
}>

export type Technique = Readonly<{
  id: string
  name: string
  description: string
  people: string
  works: string
  research: string
  category: string
}>

export type StyleRegion = Readonly<{
  name: string
  features: string
  people: string
  works: string
  research: string
}>

export type LiteratureItem = Readonly<{
  id: string
  title: string
  author: string
  type: string
  topic: string
  people: string
  importance: string
  status: string
  source: string
}>

export type MediaItem = Readonly<{
  id: string
  title: string
  performer: string
  type: string
  work: string
  people: string
  source: string
  status: string
}>

export type TimelineItem = Readonly<{ year: string; event: string; people: string; topic: string }>
export type ResearchTopic = Readonly<{ number: string; topic: string; section: string }>
export type Relationship = Readonly<{ id: string; source: string; target: string; type: string; trust: string; notes: string }>
export type InstrumentReform = Readonly<{ id: string; instrument: string; people: string; purpose: string; works: string; pending: string }>
export type DataRow = Readonly<Record<string, string>>
export type ResearchReport = Readonly<{ id: string; title: string; question: string; route: string; textPreview: string }>
export type DatabaseSet = Readonly<{ slug: string; title: string; description: string; columns: readonly string[]; rows: readonly DataRow[] }>
