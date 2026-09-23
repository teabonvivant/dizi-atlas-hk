import bundle from "@/data/generated/journal.json"
export const journalCategories = bundle.categories
export const journalArticles = bundle.articles
export type JournalArticle = typeof journalArticles[number]
export const findArticle = (slug: string) => journalArticles.find(a => a.slug === slug)
export const findCategory = (slug: string) => journalCategories.find(c => c.slug === slug)
export const articleText = (a: JournalArticle) => [a.title, a.intro, ...a.sections.flatMap(s => [s.heading, ...s.paragraphs])].join(" ")
export function relatedArticles(article: JournalArticle) {
  const same = journalArticles.filter(a => a.category === article.category && a.slug !== article.slug)
  const at = same.findIndex(a => a.number > article.number)
  return [...same.slice(at < 0 ? 0 : at), ...same.slice(0, at < 0 ? 0 : at)].slice(0, 3)
}
export const siteUrl = "https://teabonvivant.github.io/dizi-atlas-hk"

