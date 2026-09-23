"use client"
import {formPath,withBasePath} from "@/lib/paths"

import {useSearchParams} from "next/navigation"
import Link from "next/link"
import { Breadcrumbs } from "@/components/site/page-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { journalArticles, journalCategories, articleText, findCategory } from "@/lib/journal"
import { includesSearch } from "@/lib/utils"
export function JournalContent({parameters}:{readonly parameters:Partial<Record<"q"|"kind"|"category"|"style"|"page",string>>}) {
  const p = parameters
  const category = findCategory(p.category || "")
  const query = (p.q || "").trim().slice(0,120)
  const filtered = journalArticles.filter(a=>(!category||a.category===category.slug)&&includesSearch(articleText(a),query))
  const pages=Math.max(1,Math.ceil(filtered.length/12))
  const page=Math.min(pages,Math.max(1,Number.parseInt(p.page||"1",10)||1))
  const shown=filtered.slice((page-1)*12,page*12)
  const url=(c?:string,n=1)=>"/journal?"+new URLSearchParams({...(c?{category:c}:{}),...(query?{q:query}:{}),...(n>1?{page:String(n)}:{})}).toString()
  return <>
    <Breadcrumbs items={[{label:"首頁",href:"/"},{label:"竹笛札記"}]} />
    <section className="section-band pb-8"><div className="content-wrap">
      <div className="journal-heading"><h1>竹笛札記</h1>
      <p>一百篇博客，寫給願意為一個聲音停留的人。從選笛、讀譜與練習，到曲中風景、養笛日常和舞台，慢慢讀，也慢慢試。</p></div>
      <form action={formPath("/journal")} role="search" className="journal-search flex max-w-xl flex-wrap gap-3">
        {category?<input type="hidden" name="category" value={category.slug}/>:null}
        <label className="min-w-0 flex-1" htmlFor="journal-query"><span className="sr-only">搜尋竹笛札記</span><Input id="journal-query" name="q" type="search" defaultValue={query} placeholder="搜尋文章、曲名或練習問題" maxLength={120}/></label><Button type="submit">搜尋文章</Button>
      </form>
      <nav aria-label="札記分類" className="category-nav">
        <Link className={"filter-link "+(!category?"selected":"")} aria-current={!category?"page":undefined} href={url()}>全部 100 篇</Link>
        {journalCategories.map(c=><Link key={c.slug} className={"filter-link "+(category?.slug===c.slug?"selected":"")} aria-current={category?.slug===c.slug?"page":undefined} href={url(c.slug)}>{c.title}<span className="ml-2 text-xs">10</span></Link>)}
      </nav>
    </div></section>
    <section className="section-band pt-6"><div className="content-wrap">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b pb-5"><h2 className="font-serif text-2xl font-bold text-primary">{category?.title||"全部文章"}</h2><p className="font-sans text-sm text-muted-foreground">{query?"「"+query+"」 · ":""}{filtered.length} 篇{pages>1?" · 第 "+page+" / "+pages+" 頁":""}</p></div>
      {shown.length ? <div className="journal-grid">{shown.map(a=><article key={a.slug} className="journal-row">
        <Link href={"/journal/"+a.slug} tabIndex={-1} aria-hidden="true"><img src={withBasePath(a.image)} alt="" width={360} height={240} loading="lazy" className="w-full aspect-[3/2] object-cover"/></Link>
        <div><h3 className="font-serif text-xl font-bold leading-relaxed text-primary"><Link className="hover:underline underline-offset-4" href={"/journal/"+a.slug}>{a.title}</Link></h3><p className="journal-meta">{findCategory(a.category)?.title} · 約 {a.minutes} 分鐘</p><p className="journal-excerpt">{a.intro}</p></div>
      </article>)}</div> : <div className="py-12 font-sans"><p>沒有找到相符文章。可以改用「氣息」「笛膜」或曲名再找。</p><Link className="text-link mt-4 inline-block" href="/journal">返回全部文章</Link></div>}
      {pages>1?<nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="文章分頁">
        {page>1?<Link className="filter-link" href={url(category?.slug,page-1)}>上一頁</Link>:null}
        {Array.from({length:pages},(_,i)=>i+1).map(n=><Link key={n} className={"filter-link "+(n===page?"selected":"")} aria-label={"第 "+n+" 頁"} aria-current={n===page?"page":undefined} href={url(category?.slug,n)}>{n}</Link>)}
        {page<pages?<Link className="filter-link" href={url(category?.slug,page+1)}>下一頁</Link>:null}
      </nav>:null}
    </div></section>
  </>
}


export default function JournalQuery(){const query=useSearchParams();return <JournalContent parameters={Object.fromEntries(query.entries())}/>;}
