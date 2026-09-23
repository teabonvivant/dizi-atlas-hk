import fs from "node:fs"
import path from "node:path"

const projectRoot = process.cwd()
const dataDir = path.join(projectRoot, "data")
const outputDir = path.join(dataDir, "generated")
const legacyRoot = path.resolve(projectRoot, "..", "chinese-dizi-site", "dist")
const reportTitles = [
  "竹笛獨奏舞台化",
  "北派竹笛",
  "南派與江南絲竹",
  "趙派與新笛改革",
  "協奏曲與舞台傳播",
  "教學法與教材史",
  "錄音版本與詮釋",
  "樂器改革與笛族化",
  "地域音樂與作品生成",
  "跨界創作與國際傳播"
]
const reportQuestions = [
  "竹笛如何從民間合奏樂器走上現代獨奏舞台？",
  "北派竹笛的技法、人物與舞台語氣如何形成？",
  "南派竹笛與江南絲竹怎樣塑造細膩的曲笛語言？",
  "趙松庭一系與新笛改革如何改變音域、作品與教學？",
  "協奏曲如何推動竹笛的舞台表達與傳播？",
  "教材、院校與教學法如何形成現代竹笛訓練？",
  "不同錄音版本怎樣展現演奏與詮釋差異？",
  "樂器改革如何擴展笛族音域與創作空間？",
  "地域音樂語彙如何轉化為現代竹笛作品？",
  "跨界創作與國際傳播帶來哪些機會與判讀問題？"
]

function absolutizeLegacyLinks(html) {
  return html
    .replace(/href="(?:\.\.\/)+masters\/(PER-\d+)\/index\.html"/g, 'href="/masters/$1"')
    .replace(/href="(?:\.\.\/)+research\/reports\/(R\d+)\/index\.html"/g, 'href="/research/reports/$1"')
    .replace(/href="(?:\.\.\/)+([^"]+)\/index\.html"/g, 'href="/$1"')
    .replace(/href="(?:\.\.\/)+index\.html"/g, 'href="/"')
    .replace(/href="reports\/(R\d+)\/index\.html"/g, 'href="/research/reports/$1"')
    .replace(/href="([^"]+)\/index\.html"/g, 'href="/$1"')
    .replace(/\.html"/g, '"')
}

function extractMainHtml(html) {
  const match = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)
  const main = match?.[1] ?? html
  return absolutizeLegacyLinks(main.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, ""))
}

function stripTags(html) {
  return html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
}

function collectIndexPages(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name)
    if (entry.isDirectory()) return collectIndexPages(target)
    return entry.name === "index.html" ? [target] : []
  })
}

const legacyPages = Object.fromEntries(collectIndexPages(legacyRoot).map((file) => {
  const directory = path.relative(legacyRoot, path.dirname(file)).split(path.sep).join("/")
  return [directory || "home", extractMainHtml(fs.readFileSync(file, "utf8"))]
}))
const reports = reportTitles.map((title, index) => {
  const id = `R${String(index + 1).padStart(2, "0")}`
  const html = legacyPages[`research/reports/${id}`]
  if (!html) throw new Error(`Missing legacy report ${id}`)
  const plainText = stripTags(html)
  return { id, title, question: reportQuestions[index] ?? title, route: `/research/reports/${id}`, textPreview: plainText.length > 180 ? `${plainText.slice(0, 179)}…` : plainText, html }
})

fs.mkdirSync(outputDir, { recursive: true })
fs.writeFileSync(path.join(outputDir, "legacy_pages.json"), JSON.stringify(legacyPages))
fs.writeFileSync(path.join(outputDir, "research_reports.json"), JSON.stringify(reports))
console.log(`Generated ${Object.keys(legacyPages).length} legacy pages and ${reports.length} reports.`)
