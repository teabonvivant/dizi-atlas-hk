# Content Map

This map keeps the redesign honest: every route must explain what the reader sees, where the content comes from, and what the next useful link is.

| Route | Page Name | Source | Reader Job | Public Content | Related Links |
| --- | --- | --- | --- | --- | --- |
| `/` | 首頁 | `data/*.json`, `PRODUCT.md` | Understand what the site is for and where to begin | Product promise, learning path, core entry cards, database explanation | `/start`, `/repertoire`, `/masters`, `/research`, `/database` |
| `/start` | 新手入門 | existing beginner concepts, `learningStages` | Understand bamboo flute basics without database burden | Four beginner concepts and staged learning path | `/repertoire`, `/techniques` |
| `/repertoire` | 曲目導聽 | `repertoire_100.json`, `style_regions.json` | Know which works to hear first and why | Core work cards, style regions, full repertoire table | `/research/reports/R07`, `/masters`, `/database` |
| `/masters` | 名家故事 | `dizi_masters_50.json` | Enter the tradition through people and works | Featured masters, full index, clear profile links | `/masters/[id]`, `/database` |
| `/masters/[id]` | 人物檔案 | `dizi_masters_50.json`, repertoire, techniques, literature, timeline | Read one person's style, works, related records, and sources | Summary, teaching line, works, related tables, sources | `/masters`, `/database#search` |
| `/techniques` | 技法聲音 | `techniques_seed.json` | Learn what a technique does in sound and repertoire | Technique families, teaching notes, full table | `/repertoire`, `/pedagogy` |
| `/pedagogy` | 學習路線 | `learningStages`, pedagogy rules | Pick a path for beginner, intermediate, or academy level | Three routes, 16-week teaching frame | `/techniques`, `/research` |
| `/research` | 研究報告 | `research/reports/R01..R10/index.html`, `research_topics_200.json` | See actual research content before clicking | Report questions, previews, links to full reports, topic table | `/research/reports/[id]`, `/database` |
| `/research/reports/[id]` | 研究報告全文 | legacy generated report HTML | Read the full report content | Full report article in the new reading system | `/research`, `/database#search` |
| `/database` | 資料庫 | all `dist/data` JSON | Search and inspect structured records with context | Explained data sets, searchable tables, status text | `/masters/[id]`, `/expert-team` |
| `/expert-team` | 專家團隊 | requested expert-role workflow | Understand how data quality is reviewed | Ten expert roles, duties, audit principle | `/database`, `/research` |

## Public Language Rules

- No vague link text such as “深入閱讀” without naming the destination.
- JSON and table data must be introduced by its practical use.
- No placeholder, coming soon, or TODO copy on required routes.
- Professional terms are allowed only when they are tied to sound, repertoire, teaching, or source checking.

## Empty and Error Behavior

- Missing `/masters/[id]` and `/research/reports/[id]` routes use the site `not-found` page.
- Empty search results on `/database` explain how to try another term.
- Tables keep headers and scroll horizontally on small screens instead of breaking layout.
