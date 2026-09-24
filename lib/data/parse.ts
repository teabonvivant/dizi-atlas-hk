import type {
  DiziMaster,
  InstrumentReform,
  LiteratureItem,
  MediaItem,
  Relationship,
  RepertoireItem,
  ResearchTopic,
  StyleRegion,
  Technique,
  TimelineItem
} from "@/lib/data/types"

export function recordFrom(value: unknown, context: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) throw new Error(`${context} row must be an object`)
  return Object.fromEntries(Object.entries(value))
}

export function stringField(record: Record<string, unknown>, key: string): string {
  const value = record[key]
  return typeof value === "string" ? value : ""
}

function stringArrayField(record: Record<string, unknown>, key: string): string[] {
  const value = record[key]
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []
}

function sourceArrayField(record: Record<string, unknown>, key: string): { title: string; url: string }[] {
  const value = record[key]
  if (!Array.isArray(value)) return []
  return value.flatMap((item) => {
    if (typeof item !== "object" || item === null || Array.isArray(item)) return []
    const row = recordFrom(item, key)
    const title = stringField(row, "title")
    const url = stringField(row, "url")
    return title && /^https:\/\//.test(url) ? [{ title, url }] : []
  })
}

export function parseMaster(value: unknown): DiziMaster {
  const row = recordFrom(value, "dizi_masters_50")
  return { id: stringField(row, "id"), name: stringField(row, "name"), birth_death: stringField(row, "birth_death"), region: stringField(row, "region"), roles: stringField(row, "roles"), institution: stringField(row, "institution"), style: stringField(row, "style"), priority: stringField(row, "priority"), summary: stringField(row, "summary"), works: stringArrayField(row, "works"), sources: stringArrayField(row, "sources"), source_path: stringField(row, "source_path") }
}

export function parseRepertoire(value: unknown): RepertoireItem {
  const row = recordFrom(value, "repertoire_100")
  return { id: stringField(row, "id"), title: stringField(row, "title"), creator: stringField(row, "creator"), people: stringField(row, "people"), type: stringField(row, "type"), style: stringField(row, "style"), status: stringField(row, "status") }
}

export function parseTechnique(value: unknown): Technique {
  const row = recordFrom(value, "techniques_seed")
  return { id: stringField(row, "id"), name: stringField(row, "name"), description: stringField(row, "description"), people: stringField(row, "people"), works: stringField(row, "works"), research: stringField(row, "research"), category: stringField(row, "category") }
}

export function parseStyleRegion(value: unknown): StyleRegion {
  const row = recordFrom(value, "style_regions")
  return { name: stringField(row, "name"), features: stringField(row, "features"), people: stringField(row, "people"), works: stringField(row, "works"), research: stringField(row, "research"), sources: sourceArrayField(row, "sources") }
}

export function parseLiterature(value: unknown): LiteratureItem {
  const row = recordFrom(value, "literature_seed")
  return { id: stringField(row, "id"), title: stringField(row, "title"), author: stringField(row, "author"), type: stringField(row, "type"), topic: stringField(row, "topic"), people: stringField(row, "people"), importance: stringField(row, "importance"), status: stringField(row, "status"), source: stringField(row, "source") }
}

export function parseMedia(value: unknown): MediaItem {
  const row = recordFrom(value, "media_seed")
  return { id: stringField(row, "id"), title: stringField(row, "title"), performer: stringField(row, "performer"), type: stringField(row, "type"), work: stringField(row, "work"), people: stringField(row, "people"), source: stringField(row, "source"), status: stringField(row, "status") }
}

export function parseTimeline(value: unknown): TimelineItem {
  const row = recordFrom(value, "timeline")
  return { year: stringField(row, "year"), event: stringField(row, "event"), people: stringField(row, "people"), topic: stringField(row, "topic"), sources: sourceArrayField(row, "sources") }
}

export function parseResearchTopic(value: unknown): ResearchTopic {
  const row = recordFrom(value, "research_topics_200")
  return { number: stringField(row, "number"), topic: stringField(row, "topic"), section: stringField(row, "section") }
}

export function parseRelationship(value: unknown): Relationship {
  const row = recordFrom(value, "relationships_seed")
  return { id: stringField(row, "id"), source: stringField(row, "source"), target: stringField(row, "target"), type: stringField(row, "type"), trust: stringField(row, "trust"), notes: stringField(row, "notes") }
}

export function parseInstrumentReform(value: unknown): InstrumentReform {
  const row = recordFrom(value, "instrument_reforms")
  return { id: stringField(row, "id"), instrument: stringField(row, "instrument"), people: stringField(row, "people"), purpose: stringField(row, "purpose"), detail: stringField(row, "detail"), works: stringField(row, "works"), sources: sourceArrayField(row, "sources") }
}
