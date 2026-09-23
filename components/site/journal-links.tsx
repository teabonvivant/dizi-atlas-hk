import Link from "next/link"
import { journalArticles, findCategory } from "@/lib/journal"
export function JournalLinks({ category, title = "繼續讀竹笛札記" }: { readonly category: string; readonly title?: string }) {
  const articles = journalArticles.filter(a => a.category === category).slice(0, 4)
  return <section className="section-band border-t"><div className="content-wrap">
    <div className="flex flex-wrap items-end justify-between gap-4"><h2 className="font-serif text-3xl font-bold text-primary">{title}</h2><Link className="text-link" href={"/journal?category="+category}>閱讀全部{findCategory(category)?.title}文章</Link></div>
    <div className="mt-7 grid gap-x-12 md:grid-cols-2">{articles.map(a => <article key={a.slug} className="border-t py-6"><h3 className="font-serif text-xl font-bold leading-relaxed text-primary"><Link href={"/journal/"+a.slug} className="hover:underline underline-offset-4">{a.title}</Link></h3><p className="mt-3 font-sans leading-7 text-muted-foreground">{a.intro}</p></article>)}</div>
  </div></section>
}

