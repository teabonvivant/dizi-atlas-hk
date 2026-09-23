import fs from "node:fs"

const required = [
  "data/generated/research_reports.json",
  "data/generated/legacy_pages.json"
]

const forbiddenFluteSources = [
  "authority_records.csv",
  "award_links.csv",
  "bibliography_seeds.csv",
  "flute_knowledge_base.sqlite",
  "flute_masters_100.json",
  "institution_links.csv",
  "lineage_links.csv",
  "person_bibliography_map.csv",
  "person_sources.csv",
  "person_timeline.csv",
  "person_topic_map.csv",
  "recording_catalog_seed.csv",
  "recording_search_links.csv",
  "scholarly_search_links.csv"
]

const mixedSources = forbiddenFluteSources.filter((file) => fs.existsSync(`data/${file}`))
if (mixedSources.length > 0) throw new Error(`Flute source data must not exist in the Dizi project: ${mixedSources.join(", ")}`)

for (const file of required) {
  if (!fs.existsSync(file)) {
    console.error(`Missing generated artifact: ${file}`)
    process.exit(1)
  }
}

const reports = JSON.parse(fs.readFileSync(required[0], "utf8"))
const legacyPages = JSON.parse(fs.readFileSync(required[1], "utf8"))
const serialized = JSON.stringify({ reports, legacyPages })

if (/\.sqlite/i.test(serialized)) throw new Error("sqlite is forbidden in generated artifacts")
if (!Array.isArray(reports) || reports.length !== 10) throw new Error("Expected exactly 10 research reports")
const expectedIds = Array.from({ length: 10 }, (_, index) => `R${String(index + 1).padStart(2, "0")}`)
if (reports.some((report, index) => report.id !== expectedIds[index] || !report.html || !report.textPreview)) {
  throw new Error("Research reports must contain R01-R10 with html and text previews")
}
if (typeof legacyPages !== "object" || legacyPages === null || Array.isArray(legacyPages)) throw new Error("Legacy pages artifact must be a map")

console.log(`Static artifacts passed (${reports.length} reports, ${Object.keys(legacyPages).length} legacy pages; Dizi/Flute boundary clean).`)
