"use client"
import {formPath} from "@/lib/paths"

import {useSearchParams} from "next/navigation"
import Link from "next/link"
import {Breadcrumbs} from "@/components/site/page-shell"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {getInstrumentReforms,getMasters,getRepertoire,getStyleRegions,getTechniques,getReports,getResearchTopics} from "@/lib/data"
import {journalArticles,articleText} from "@/lib/journal"
import {glossary} from "@/lib/glossary"
import {includesSearch} from "@/lib/utils"
export function SearchContent({parameters}:{readonly parameters:Partial<Record<"q"|"kind"|"category"|"style"|"page",string>>}){
 const p=parameters,query=(p.q||"").trim().slice(0,120),kind=p.kind||""
 const items=[
 ...journalArticles.map(a=>({kind:"札記",title:a.title,detail:a.intro,href:"/journal/"+a.slug,text:articleText(a)})),
 ...getMasters().map(a=>({kind:"人物",title:a.name,detail:a.summary,href:"/masters/"+a.id,text:[a.name,a.summary,a.style,a.institution,...a.works].join(" ")})),
 ...getRepertoire().map(a=>({kind:"曲目",title:a.title,detail:[a.creator,a.type,a.style].filter(Boolean).join(" · "),href:"/repertoire/"+a.id,text:[a.title,a.creator,a.people,a.type,a.style].join(" ")})),
 ...getTechniques().map(a=>({kind:"技法",title:a.name,detail:a.description,href:"/techniques/"+a.id,text:[a.name,a.description,a.category,a.works,a.research].join(" ")})),
 ...getStyleRegions().map(a=>({kind:"風格",title:a.name,detail:[a.features,a.research].join(" · "),href:"/styles",text:[a.name,a.features,a.people,a.works,a.research].join(" ")})),
 ...getInstrumentReforms().map(a=>({kind:"樂器",title:a.instrument,detail:a.purpose,href:"/instruments",text:[a.instrument,a.people,a.purpose,a.detail,a.works].join(" ")})),
 ...getReports().map(a=>({kind:"研究",title:a.title,detail:a.textPreview,href:a.route,text:a.title+" "+a.question+" "+a.textPreview})),
 ...getResearchTopics().map(a=>({kind:"題目",title:a.topic,detail:a.section,href:"/research?q="+encodeURIComponent(a.topic)+"#topics",text:a.topic+" "+a.section})),
 ...glossary.map(a=>({kind:"辭典",title:a.term,detail:a.definition,href:"/glossary#"+encodeURIComponent(a.category),text:a.term+" "+a.definition}))
 ]
 const matches=query?items.filter(i=>includesSearch(i.text,query)):[]
 const filtered=matches.filter(i=>!kind||i.kind===kind)
 const pages=Math.max(1,Math.ceil(filtered.length/20)),page=Math.min(pages,Math.max(1,parseInt(p.page||"1")||1))
 const shown=filtered.slice((page-1)*20,page*20)
 const url=(k="",n=1)=>"/search?"+new URLSearchParams({q:query,...(k?{kind:k}:{}),...(n>1?{page:String(n)}:{})})
 return <><Breadcrumbs items={[{label:"首頁",href:"/"},{label:"全站搜尋"}]}/><section className="section-band"><div className="content-wrap max-w-5xl"><h1 className="font-serif text-4xl font-bold text-primary">循着一個問題，找到下一篇閱讀</h1><p className="mt-5 font-sans text-lg leading-8 text-muted-foreground">搜尋文章、曲目、人物、技法與研究。可以由「笛膜」「換氣」「喜相逢」開始。</p>
 <form action={formPath("/search")} role="search" className="mt-8 flex gap-3"><label className="min-w-0 flex-1" htmlFor="search-query"><span className="sr-only">全站搜尋關鍵字</span><Input id="search-query" name="q" type="search" defaultValue={query} placeholder="輸入關鍵字" maxLength={120}/></label><Button type="submit">搜尋</Button></form>
 {query?<><nav aria-label="搜尋結果分類" className="mt-6 flex flex-wrap gap-2"><Link href={url()} className={"filter-link "+(!kind?"selected":"")}>全部 {matches.length}</Link>{["札記","人物","曲目","技法","風格","樂器","研究","題目","辭典"].map(k=><Link key={k} href={url(k)} className={"filter-link "+(kind===k?"selected":"")}>{k} {matches.filter(i=>i.kind===k).length}</Link>)}</nav><p className="mt-6 font-sans text-sm text-muted-foreground">「{query}」找到 {filtered.length} 項{pages>1?" · 第 "+page+" / "+pages+" 頁":""}</p></>:<div className="mt-8 flex flex-wrap gap-3">{["笛膜","氣息","鷓鴣飛","趙松庭"].map(q=><Link key={q} className="filter-link" href={"/search?q="+encodeURIComponent(q)}>{q}</Link>)}</div>}
 <div className="mt-6">{shown.map((i,n)=><article key={i.href+"-"+n} className="border-t py-6"><p className="font-sans text-sm text-muted-foreground">{i.kind}</p><h2 className="mt-2 font-serif text-2xl font-bold text-primary"><Link className="hover:underline underline-offset-4" href={i.href}>{i.title}</Link></h2>{i.detail?<p className="mt-3 font-sans leading-8 text-muted-foreground">{i.detail}</p>:null}</article>)}</div>
 {query&&!shown.length?<div className="mt-8 border-y py-8 font-sans"><h2 className="font-serif text-2xl font-bold text-primary">沒有相符結果</h2><p className="mt-3 leading-8">可以縮短關鍵字、換一個曲名，或查看<Link className="text-link" href="/journal">全部札記</Link>和<Link className="text-link" href="/database">資料庫</Link>。</p></div>:null}
 {pages>1?<nav className="mt-8 flex flex-wrap items-center justify-between gap-3" aria-label="搜尋分頁">{page>1?<Link className="filter-link" href={url(kind,page-1)}>上一頁</Link>:<span/>}<span className="font-sans text-sm">第 {page} 頁，共 {pages} 頁</span>{page<pages?<Link className="filter-link" href={url(kind,page+1)}>下一頁</Link>:<span/>}</nav>:null}
 </div></section></>
}


export default function SearchQuery(){const query=useSearchParams();return <SearchContent parameters={Object.fromEntries(query.entries())}/>;}
