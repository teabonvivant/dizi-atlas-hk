import { splitValues } from "@/lib/utils"
import { getLiterature, getMedia, getRepertoire, getStyleRegions, getTechniques, getTimeline } from "@/lib/data/source"
import type { DiziMaster, LiteratureItem, MediaItem, RepertoireItem, StyleRegion, Technique, TimelineItem } from "@/lib/data/types"

export function getRelatedRepertoire(personName: string): RepertoireItem[] { return getRepertoire().filter((item) => item.people.includes(personName) || item.creator.includes(personName)) }
export function getRelatedTechniques(personName: string): Technique[] { return getTechniques().filter((item) => item.people.includes(personName)) }
export function getRelatedLiterature(personName: string): LiteratureItem[] { return getLiterature().filter((item) => item.people.includes(personName)) }
export function getRelatedMedia(personName: string): MediaItem[] { return getMedia().filter((item) => item.performer.includes(personName) || item.people.includes(personName)) }
export function getRelatedTimeline(personName: string): TimelineItem[] { return getTimeline().filter((item) => item.people.includes(personName)) }
export function getTechniqueGroups(): readonly [string, Technique[]][] {
  const groups = new Map<string, Technique[]>()
  getTechniques().forEach((technique) => groups.set(technique.category, [...(groups.get(technique.category) ?? []), technique]))
  return Array.from(groups.entries())
}
export function getStyleForPerson(person: DiziMaster): StyleRegion[] {
  const tokens = splitValues(`${person.style}、${person.region}`)
  return getStyleRegions().filter((style) => tokens.some((token) => style.name.includes(token) || style.people.includes(person.name)))
}
