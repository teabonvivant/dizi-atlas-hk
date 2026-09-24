import {withBasePath} from "@/lib/paths"
import type {Metadata} from "next"
import Link from "next/link"
import {notFound} from "next/navigation"
import {Breadcrumbs,PageHero} from "@/components/site/page-shell"
import {getRepertoire,getMasters,getMedia} from "@/lib/data"
import {getRepertoireGuide} from "@/lib/repertoire-guide"
import {repertoireListeningLine} from "@/lib/content"
import {journalArticles} from "@/lib/journal"
import {catalogueSources} from "@/lib/public-catalogue"
type Props={readonly params:Promise<{id:string}>}
export function generateStaticParams(){return getRepertoire().map(w=>({id:w.id}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {id}=await params;const w=getRepertoire().find(x=>x.id===id);return {title:w?w.title+"｜曲目導聽":"找不到曲目",description:w?repertoireListeningLine(w):undefined,alternates:{canonical:w?"/repertoire/"+w.id:"/repertoire"}}}
export default async function WorkPage({params}:Props){
 const {id}=await params;const work=getRepertoire().find(x=>x.id===id);if(!work)notFound();const w=work!
 const guide=getRepertoireGuide(w)
 const articles=journalArticles.filter(a=>a.title.includes("《"+w.title+"》"))
 const people=getMasters().filter(p=>w.people.includes(p.name)||w.creator.includes(p.name))
 const personSources=people.flatMap(person=>person.sources.map(url=>({person:person.name,url})))
 const media=getMedia().filter(m=>m.work===w.title)
 const refs=catalogueSources[id]||[]
 return <><Breadcrumbs items={[{label:"首頁",href:"/"},{label:"曲目導聽",href:"/repertoire"},{label:w.title}]}/><PageHero label="曲目" title={"《"+w.title+"》"} description={repertoireListeningLine(w)} image="repertoire"/>
 <section className="section-band bg-card/50"><div className="content-wrap max-w-4xl"><dl className="grid gap-5 border-y py-6 font-sans sm:grid-cols-3">{[["創作與版本",w.creator],["形式",w.type],["風格與題材",w.style]].filter(([,v])=>v).map(([k,v])=><div key={k}><dt className="font-bold text-primary">{k}</dt><dd className="mt-2 leading-7 text-muted-foreground">{v}</dd></div>)}</dl>
 <div className="mt-10 space-y-9">{[["第一遍，跟着旋律走",guide.firstListen],["第二遍，留意處理",guide.secondListen],["把聆聽帶回練習",guide.technicalFocus],["風格與版本",guide.styleBoundary],["一次具體練習",guide.assignment]].map(([title,body])=><section key={title}><h2 className="font-serif text-2xl font-bold text-primary">{title}</h2><p className="mt-4 font-sans text-lg leading-9 text-muted-foreground">{body}</p></section>)}</div>
 {articles.length?<section className="mt-10 border-t pt-7"><h2 className="font-serif text-2xl font-bold text-primary">這首曲的札記</h2>{articles.map(a=><p key={a.slug} className="mt-4"><Link className="text-link" href={"/journal/"+a.slug}>{a.title}</Link></p>)}</section>:null}
 {people.length?<section className="mt-10 border-t pt-7"><h2 className="font-serif text-2xl font-bold text-primary">相關人物</h2><div className="mt-5 flex flex-wrap gap-3">{people.map(p=><Link key={p.id} className="filter-link" href={"/masters/"+p.id}>{p.name}</Link>)}</div></section>:null}
 {personSources.length?<section className="mt-10 border-t pt-7"><h2 className="font-serif text-2xl font-bold text-primary">相關人物資料</h2><p className="mt-3 font-sans leading-7 text-muted-foreground">以下來源支援人物資料，可與曲目頁列出的作品及版本欄位分開核對。</p><ul className="mt-4 space-y-3 font-sans">{personSources.map((source,index)=><li key={source.url+index}><a className="text-link" href={source.url} target="_blank" rel="noreferrer">{source.person} · 人物資料</a></li>)}</ul></section>:null}
 {(refs.length||media.length)?<section className="mt-10 border-t pt-7"><h2 className="font-serif text-2xl font-bold text-primary">資料與錄音</h2><ul className="mt-5 space-y-4 font-sans">{refs.map(r=><li key={r.url}><a className="text-link" href={withBasePath(r.url)} target="_blank" rel="noreferrer">{r.title}</a></li>)}{media.map(m=><li key={m.id}><a className="text-link" href={withBasePath(m.source)} target="_blank" rel="noreferrer">{m.title} · {m.performer}</a></li>)}</ul></section>:null}
 <p className="mt-10"><Link className="text-link" href="/repertoire">返回完整曲目索引</Link></p></div></section></>
}

