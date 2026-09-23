export const dynamic = "force-static"
import { siteUrl } from "@/lib/journal"
export function GET() {
  return new Response("User-agent: *\nAllow: /\nDisallow: /dizi-atlas-hk/search\nSitemap: " + siteUrl + "/sitemap.xml\n", { headers: { "content-type": "text/plain; charset=utf-8" } })
}
