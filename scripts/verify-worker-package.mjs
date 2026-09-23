import fs from "node:fs"
import path from "node:path"

const roots = [fs.existsSync("dist") ? "dist" : ".next"].filter((directory) => fs.existsSync(directory))
if (roots.length === 0) throw new Error("Build output is missing; run npm run build first")
const forbidden = [
  "../chinese-dizi-site",
  "flute_knowledge_base.sqlite",
  "flute_masters_100.json",
  "authority_records.csv",
  "person_topic_map.csv",
  "Theobald Boehm",
  "Error 1101",
  "Worker threw exception"
]
function files(directory) { return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => { const target = path.join(directory, entry.name); return entry.isDirectory() ? files(target) : [target] }) }
const candidates = roots.flatMap(files).filter((file) => /\.(?:js|mjs|cjs|json|html|txt)$/.test(file) && fs.statSync(file).size < 20_000_000)
const violations = candidates.flatMap((file) => { const source = fs.readFileSync(file, "utf8"); return forbidden.filter((token) => source.includes(token)).map((token) => `${file}: ${token}`) })
if (violations.length > 0) throw new Error(`Worker package contains forbidden runtime references:\n${violations.join("\n")}`)
console.log(`Worker package passed (${candidates.length} text artifacts scanned).`)
