import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const dataDir = path.join(root, "data")
const appDir = path.join(root, "app")
const componentDir = path.join(root, "components")
const libDir = path.join(root, "lib")
const professorGuideFile = path.join(dataDir, "professor_guides.json")

const expected = [
  ["dizi_masters_50.json", 50],
  ["repertoire_100.json", 100],
  ["techniques_seed.json", 25],
  ["research_topics_200.json", 200],
  ["literature_seed.json", 35],
  ["media_seed.json", 30],
  ["relationships_seed.json", 50],
  ["instrument_reforms.json", 15],
  ["style_regions.json", 14],
  ["timeline.json", 48]
]

const forbidden = ["嚗", "銝", "蝡", "雿", "摨", "撣", "蝺", "鈭", "憭", "隤", "�"]

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8"))
}

function walk(dir) {
  if (!fs.existsSync(dir)) {
    return []
  }

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(full) : [full]
  })
}

for (const [file, count] of expected) {
  const rows = readJson(file)
  if (!Array.isArray(rows) || rows.length !== count) {
    throw new Error(`${file} expected ${count} records, got ${Array.isArray(rows) ? rows.length : "not-array"}`)
  }
}

const professorGuides = readJson("professor_guides.json")
if (!Array.isArray(professorGuides.techniques) || professorGuides.techniques.length !== 25) {
  throw new Error("professor_guides.json must cover all 25 techniques")
}
if (!Array.isArray(professorGuides.repertoire) || professorGuides.repertoire.length !== 10) {
  throw new Error("professor_guides.json must cover the 10 core repertoire works")
}
if (!Array.isArray(professorGuides.soundChecks) || professorGuides.soundChecks.length < 6) {
  throw new Error("professor_guides.json must include at least 6 sound checks")
}
if (!Array.isArray(professorGuides.assessment) || professorGuides.assessment.length < 6) {
  throw new Error("professor_guides.json must include at least 6 assessment dimensions")
}

const sources = professorGuides.sources ?? []
const sourceIds = new Set(sources.map((source) => source.id))
if (sources.length < 5) throw new Error("professor_guides.json must include at least 5 authoritative sources")
if (sourceIds.size !== sources.length) throw new Error("professor source IDs must be unique")
for (const source of sources) {
  for (const field of ["id", "label", "scope", "url"]) {
    if (typeof source[field] !== "string" || source[field].trim() === "") {
      throw new Error(`professor source ${source.id ?? "unknown"}.${field} must be non-empty`)
    }
  }
  if (new URL(source.url).protocol !== "https:") throw new Error(`professor source ${source.id} must use HTTPS`)
}

const techniqueIds = new Set(readJson("techniques_seed.json").map((item) => item.id))
const professorTechniqueIds = new Set(professorGuides.techniques.map((guide) => guide.id))
if (professorTechniqueIds.size !== professorGuides.techniques.length || professorTechniqueIds.size !== techniqueIds.size) {
  throw new Error("professor technique guides must cover each technique ID exactly once")
}
for (const id of techniqueIds) {
  if (!professorTechniqueIds.has(id)) throw new Error(`missing professor technique guide: ${id}`)
}
for (const guide of professorGuides.techniques) {
  if (!techniqueIds.has(guide.id)) throw new Error(`unknown professor technique guide: ${guide.id}`)
  for (const field of ["purpose", "action", "drill", "diagnosis", "boundary"]) {
    if (typeof guide[field] !== "string" || guide[field].length < 18) {
      throw new Error(`${guide.id}.${field} is too shallow`)
    }
  }
  if (!Array.isArray(guide.sourceIds) || guide.sourceIds.length === 0 || guide.sourceIds.some((id) => !sourceIds.has(id))) {
    throw new Error(`${guide.id} has an invalid source reference`)
  }
}

const repertoireTitles = new Set(readJson("repertoire_100.json").map((item) => item.title))
const expectedCoreTitles = new Set(["喜相逢", "蔭中鳥", "鷓鴣飛", "行街", "早晨", "牧民新歌", "秦川情", "秦川抒懷", "花泣", "愁空山"])
const professorRepertoireTitles = new Set(professorGuides.repertoire.map((guide) => guide.title))
if (professorRepertoireTitles.size !== professorGuides.repertoire.length || professorRepertoireTitles.size !== expectedCoreTitles.size) {
  throw new Error("professor repertoire guides must cover each core title exactly once")
}
for (const title of expectedCoreTitles) {
  if (!professorRepertoireTitles.has(title)) throw new Error(`missing professor repertoire guide: ${title}`)
}
for (const guide of professorGuides.repertoire) {
  if (!repertoireTitles.has(guide.title)) throw new Error(`unknown professor repertoire guide: ${guide.title}`)
  for (const field of ["firstListen", "secondListen", "technicalFocus", "styleBoundary", "assignment"]) {
    if (typeof guide[field] !== "string" || guide[field].length < 18) {
      throw new Error(`${guide.title}.${field} is too shallow`)
    }
  }
}

const reportIds = Array.from({ length: 10 }, (_, index) => `R${String(index + 1).padStart(2, "0")}`)
const reports = readJson("generated/research_reports.json")
for (const id of reportIds) {
  const report = reports.find((report) => report.id === id)
  if (!report || report.html.length < 1500 || !report.title || !report.textPreview) {
    throw new Error(`missing or incomplete committed report ${id}`)
  }
}

for (const file of [...walk(appDir), ...walk(componentDir), ...walk(libDir), professorGuideFile]) {
  if (!/\.(tsx|ts|css|json)$/.test(file)) {
    continue
  }

  const text = fs.readFileSync(file, "utf8")
  const hit = forbidden.find((token) => text.includes(token))
  if (hit) {
    throw new Error(`forbidden mojibake token ${hit} in ${path.relative(root, file)}`)
  }
}

console.log("data verified: 50 masters, 100 repertoire, 25 techniques, 200 topics, 10 reports")
