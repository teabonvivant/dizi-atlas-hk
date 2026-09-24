import fs from "node:fs"
import path from "node:path"

const root = process.cwd()

const requiredFiles = [
  "app/page.tsx",
  "app/start/page.tsx",
  "app/repertoire/page.tsx",
  "app/masters/page.tsx",
  "app/masters/[id]/page.tsx",
  "app/techniques/page.tsx",
  "app/pedagogy/page.tsx",
  "app/research/page.tsx",
  "app/research/reports/[id]/page.tsx",
  "app/database/page.tsx",
  "app/styles/page.tsx",
  "app/instruments/page.tsx",
  "app/expert-team/page.tsx"
  ,"app/search/page.tsx"
  ,"app/error.tsx"
  ,"app/not-found.tsx"
  ,"app/journal/page.tsx"
  ,"app/journal/[slug]/page.tsx"
  ,"app/repertoire/[id]/page.tsx"
  ,"app/techniques/[id]/page.tsx"
  ,"app/care/page.tsx"
  ,"app/glossary/page.tsx"
  ,"app/about/page.tsx"
  ,"app/sitemap.xml/route.ts"
  ,"app/robots.txt/route.ts"
]

const forbiddenFiles = [
  "app/learn/page.tsx",
  "app/listen/page.tsx",
  "app/practice/page.tsx",
  "app/topics/page.tsx",
  "app/culture/page.tsx",
  "app/instrument/page.tsx",
  "app/research/[slug]/page.tsx"
]

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    throw new Error(`missing required route file: ${file}`)
  }
}

for (const file of forbiddenFiles) {
  if (fs.existsSync(path.join(root, file))) {
    throw new Error(`leftover flute route file: ${file}`)
  }
}

console.log(`routes verified: ${requiredFiles.length} required route files present`)
