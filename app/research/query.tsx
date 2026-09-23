"use client"
import {formPath} from "@/lib/paths"

import {useSearchParams} from "next/navigation"
import Link from "next/link"
import {PageHero,SectionHeader} from "@/components/site/page-shell"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {getReports,getResearchTopics} from "@/lib/data"
import {includesSearch} from "@/lib/utils"
export function ResearchContent({parameters}:{readonly parameters:Partial<Record<"q"|"kind"|"category"|"style"|"page",string>>}){
 const p=parameters,query=(p.q||"").trim(),reports=getReports(),topics=getResearchTopics()
 const filtered=topics.filter(t=>includesSearch(t.topic+" "+t.section,query))
 const pages=Math.max(1,Math.ceil(filtered.length/20)),page=Math.min(pages,Math.max(1,parseInt(p.page||"1")||1))
 const url=(n:number)=>"/research?"+new URLSearchParams({...(query?{q:query}:{}),page:String(n)})+"#topics"
 return <><PageHero label="研究" title="由一個問題，走進竹笛的來路" description="十個專題，把作品、演奏、人物與文化放在一起閱讀。從具體聲音開始，再以譜本、錄音和正式資料建立自己的比較。" image="study" actions={<Button asChild variant="outline"><Link href="/database">搜尋相關資料</Link></Button>}/>
 <section className="section-band bg-card/50"><div className="content-wrap"><SectionHeader title="十個專題，十條閱讀路線"/><div className="grid gap-x-14 md:grid-cols-2">{reports.map(r=><article key={r.id} className="border-t py-7"><h2 className="font-serif text-2xl font-bold leading-relaxed text-primary"><Link href={r.route} className="hover:underline underline-offset-4">{r.title}</Link></h2><p className="mt-3 font-sans font-bold leading-8">{r.question}</p><p className="mt-3 font-sans leading-8 text-muted-foreground">{r.textPreview}</p><Link className="text-link mt-4 inline-block font-sans text-sm" href={r.route}>閱讀專題全文</Link></article>)}</div></div></section>
 <section id="topics" className="section-band"><div className="content-wrap max-w-5xl"><SectionHeader title="二百個研究題目"><p>按自己的興趣和可取得的材料選題，從一首作品、一種技法或一段傳播經驗開始。</p></SectionHeader><form action={formPath("/research#topics")} className="flex max-w-2xl gap-3" role="search"><label className="min-w-0 flex-1" htmlFor="topic-q"><span className="sr-only">搜尋研究題目</span><Input id="topic-q" name="q" type="search" defaultValue={query} placeholder="搜尋人物、曲目、技法或研究方向"/></label><Button type="submit">搜尋題目</Button></form><p className="mt-5 font-sans text-sm text-muted-foreground">{filtered.length} 個題目 · 第 {page} / {pages} 頁{query?<Link className="text-link ml-3" href="/research#topics">清除搜尋</Link>:null}</p>
 <ol className="mt-6 divide-y border-y">{filtered.slice((page-1)*20,page*20).map(t=><li key={t.number} className="py-5"><h3 className="font-serif text-xl font-bold leading-relaxed text-primary">{t.topic}</h3><p className="mt-2 font-sans text-sm text-muted-foreground">{t.section}</p></li>)}</ol>
 {!filtered.length?<p className="py-8 font-sans">沒有相符題目，可以縮短關鍵字再搜尋。</p>:null}
 {pages>1?<nav className="mt-8 flex flex-wrap gap-2" aria-label="研究題目分頁">{Array.from({length:pages},(_,i)=>i+1).map(n=><Link key={n} aria-label={"第 "+n+" 頁"} aria-current={n===page?"page":undefined} className={"filter-link "+(n===page?"selected":"")} href={url(n)}>{n}</Link>)}</nav>:null}
 </div></section></>
}


export default function ResearchQuery(){const query=useSearchParams();return <ResearchContent parameters={Object.fromEntries(query.entries())}/>;}
