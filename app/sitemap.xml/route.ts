export const dynamic = "force-static"
import { getMasters, getRepertoire, getTechniques, getReports } from "@/lib/data"
import { journalArticles, siteUrl } from "@/lib/journal"

export function GET() {
  const routes = ["", "/start", "/repertoire", "/masters", "/techniques", "/pedagogy", "/care", "/glossary", "/journal", "/research", "/database", "/about",
    ...journalArticles.map(a => "/journal/" + a.slug),
    ...getMasters().map(p => "/masters/" + p.id),
    ...getRepertoire().map(p => "/repertoire/" + p.id),
    ...getTechniques().map(p => "/techniques/" + p.id),
    ...getReports().map(p => "/research/reports/" + p.id)]
  const xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + routes.map(route => "<url><loc>" + siteUrl + route + "</loc></url>").join("") + "</urlset>"
  return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" } })
}
