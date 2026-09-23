import {withBasePath} from "@/lib/paths"
import type {Metadata} from "next"
import Link from "next/link"
import {notFound} from "next/navigation"
import {Breadcrumbs,PageHero,SectionHeader} from "@/components/site/page-shell"
import {getMaster,getMasters,getRelatedRepertoire,getRelatedTechniques,getStyleForPerson} from "@/lib/data"
import {masterTeachingLine} from "@/lib/content"
type Props={readonly params:Promise<{id:string}>}
export function generateStaticParams(){return getMasters().map(p=>({id:p.id}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{const p=getMaster((await params).id);return {title:p?p.name+"｜名家索引":"找不到人物",description:p?.summary,alternates:{canonical:p?"/masters/"+p.id:"/masters"}}}
export default async function MasterPage({params}:Props){
 const person=getMaster((await params).id);if(!person)notFound();const p=person!
 const repertoire=getRelatedRepertoire(p.name),techniques=getRelatedTechniques(p.name),styles=getStyleForPerson(p)
 return <><Breadcrumbs items={[{label:"首頁",href:"/"},{label:"名家索引",href:"/masters"},{label:p.name}]}/><PageHero label="人物檔案" title={p.name} description={p.summary} image="culture"/>
 <section className="section-band bg-card/50"><div className="content-wrap grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><aside><h2 className="font-serif text-2xl font-bold text-primary">人物速覽</h2><dl className="mt-5 font-sans">{[["生卒年",p.birth_death],["地域",p.region],["身份",p.roles],["機構",p.institution],["風格",p.style]].filter(([,v])=>v).map(([label,value])=><div key={label} className="border-t py-4"><dt className="font-bold text-primary">{label}</dt><dd className="mt-2 leading-7 text-muted-foreground">{value}</dd></div>)}</dl></aside>
 <div><SectionHeader title="從作品開始認識"/><p className="font-sans text-lg leading-9 text-muted-foreground">{masterTeachingLine(p)}</p>{repertoire.length?<ul className="mt-6 divide-y border-y">{repertoire.map(w=><li key={w.id} className="py-4 font-sans"><Link className="text-link font-bold" href={"/repertoire/"+w.id}>{w.title}</Link><span className="mt-1 block text-sm leading-6 text-muted-foreground">{[w.creator,w.type,w.style].filter(Boolean).join(" · ")}</span></li>)}</ul>:p.works.length?<ul className="mt-6 flex flex-wrap gap-3 font-sans">{p.works.map(w=><li key={w}><Link className="text-link" href={"/search?q="+encodeURIComponent(w)}>{w}</Link></li>)}</ul>:null}
 <h3 className="mt-9 font-serif text-xl font-bold text-primary">留下一段自己的聆聽記錄</h3><p className="mt-3 font-sans leading-8 text-muted-foreground">選一份有演奏者與作品資料的錄音，先聽完整樂句，再選一個轉折細聽。記下速度、換氣、裝飾與伴奏的關係，並保留來源；由一個可重聽的位置，慢慢建立對演奏語氣的理解。</p><Link className="text-link mt-4 inline-block" href="/journal/versions">閱讀同曲版本的比較方法</Link>
 </div></div></section>
 {(techniques.length||styles.length)?<section className="section-band"><div className="content-wrap grid gap-12 md:grid-cols-2">{techniques.length?<div><SectionHeader title="連到演奏技法"/><ul className="space-y-4 font-sans">{techniques.map(t=><li key={t.id}><Link className="text-link font-bold" href={"/techniques/"+t.id}>{t.name}</Link><p className="mt-2 leading-7 text-muted-foreground">{t.description}</p></li>)}</ul></div>:null}{styles.length?<div><SectionHeader title="風格與文化背景"/>{styles.map(s=><p key={s.name} className="mb-5 font-sans leading-8 text-muted-foreground"><strong className="text-primary">{s.name}：</strong>{s.features}</p>)}<Link className="text-link" href="/journal/north-south">閱讀流派與地域的關係</Link></div>:null}</div></section>:null}
 {p.sources.length?<section className="section-band border-t"><div className="content-wrap"><SectionHeader title="人物資料與延伸閱讀"/><ul className="space-y-4 font-sans">{p.sources.map((url,i)=><li key={url}><a className="text-link" href={withBasePath(url)} target="_blank" rel="noreferrer">{p.name}相關資料 · {new URL(url).hostname.replace(/^www\./,"")} {p.sources.filter(s=>new URL(s).hostname===new URL(url).hostname).length>1?"（"+(i+1)+"）":""}</a></li>)}</ul></div></section>:null}</>
}

