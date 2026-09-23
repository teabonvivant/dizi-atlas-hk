const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:8069"

const routes = [
  "/",
  "/start",
  "/repertoire",
  "/masters",
  "/masters/PER-0001",
  "/techniques",
  "/pedagogy",
  "/research",
  "/research/reports/R01",
  "/database",
  "/expert-team"
]

for (const route of routes) {
  const response = await fetch(`${baseUrl}${route}`)
  if (!response.ok) {
    throw new Error(`${route} returned ${response.status}`)
  }
  const html = await response.text()
  if (!html.includes("Dizi Atlas") && route !== "/masters/PER-0001") {
    throw new Error(`${route} does not look like the redesigned site`)
  }
}

console.log(`clickthrough verified: ${routes.length} routes responded`)
