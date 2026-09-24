import mastersBundle from "@/data/dizi_masters_50.json"
import { cleanField, publicMaster, publicRepertoire, addedRepertoire } from "@/lib/public-catalogue"
import reformsBundle from "@/data/instrument_reforms.json"
import literatureBundle from "@/data/literature_seed.json"
import mediaBundle from "@/data/media_seed.json"
import relationshipsBundle from "@/data/relationships_seed.json"
import repertoireBundle from "@/data/repertoire_100.json"
import topicsBundle from "@/data/research_topics_200.json"
import stylesBundle from "@/data/style_regions.json"
import techniquesBundle from "@/data/techniques_seed.json"
import timelineBundle from "@/data/timeline.json"
import { parseInstrumentReform, parseLiterature, parseMaster, parseMedia, parseRelationship, parseRepertoire, parseResearchTopic, parseStyleRegion, parseTechnique, parseTimeline } from "@/lib/data/parse"
import type { DiziMaster, InstrumentReform, LiteratureItem, MediaItem, Relationship, RepertoireItem, ResearchTopic, StyleRegion, Technique, TimelineItem } from "@/lib/data/types"

const masters = mastersBundle.map(parseMaster).map(publicMaster)
const repertoire = [...repertoireBundle.map(parseRepertoire).map(publicRepertoire), ...addedRepertoire]
const techniques = techniquesBundle.map(parseTechnique)
const styles = stylesBundle.map(parseStyleRegion).map(s => ({...s, people:cleanField(s.people), works:cleanField(s.works)}))
const literature = literatureBundle.map(parseLiterature).filter(s => /^https:\/\//.test(s.source) && cleanField(s.author) && cleanField(s.title)).map(s => ({...s,status:"",source:cleanField(s.source)}))
const media = mediaBundle.map(parseMedia).filter(s => /^https:\/\//.test(s.source) && cleanField(s.title) && cleanField(s.performer)).map(s => ({...s,status:""}))
const timeline = timelineBundle.map(parseTimeline).filter(s => s.event.trim() && s.year.trim())
const topics = topicsBundle.map(parseResearchTopic)
const relationships = relationshipsBundle.map(parseRelationship)
const reforms = reformsBundle.map(parseInstrumentReform)

export function getMasters(): DiziMaster[] { return [...masters] }
export function getMaster(id: string): DiziMaster | undefined { return masters.find((person) => person.id === id) }
export function getRepertoire(): RepertoireItem[] { return [...repertoire] }
export function getTechniques(): Technique[] { return [...techniques] }
export function getStyleRegions(): StyleRegion[] { return [...styles] }
export function getLiterature(): LiteratureItem[] { return [...literature] }
export function getMedia(): MediaItem[] { return [...media] }
export function getTimeline(): TimelineItem[] { return [...timeline] }
export function getResearchTopics(): ResearchTopic[] { return [...topics] }
export function getRelationships(): Relationship[] { return [...relationships] }
export function getInstrumentReforms(): InstrumentReform[] { return [...reforms] }
