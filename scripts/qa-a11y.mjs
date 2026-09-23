const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:8069"
const routes = ["/", "/start", "/repertoire", "/masters", "/masters/PER-0001", "/techniques", "/pedagogy", "/research", "/research/reports/R01", "/database", "/expert-team"]

for (const route of routes) {
  const response = await fetch(`${baseUrl}${route}`)
  if (!response.ok) {
    throw new Error(`${route} returned ${response.status}`)
  }

  const html = await response.text()
  const h1Count = [...html.matchAll(/<h1[\s>]/g)].length
  const buttonWithoutLabel = /<button(?![^>]*(aria-label=|>[^<]+<))[^>]*>\s*(?:<svg[\s\S]*?<\/svg>)?\s*<\/button>/i.test(html)
  const imageWithoutAlt = /<img(?![^>]*alt=)[^>]*>/i.test(html)
  const skipLink = html.includes("跳至主要內容")

  if (h1Count !== 1 || buttonWithoutLabel || imageWithoutAlt || !skipLink) {
    throw new Error(`${route} a11y smoke failed: ${JSON.stringify({ h1Count, buttonWithoutLabel, imageWithoutAlt, skipLink })}`)
  }
}

console.log(`a11y smoke verified: ${routes.length} routes`)
