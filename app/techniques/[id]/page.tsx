import {withBasePath} from "@/lib/paths"
import type {Metadata} from "next"
import Link from "next/link"
import {notFound} from "next/navigation"
import {Breadcrumbs,PageHero} from "@/components/site/page-shell"
import {getTechniques} from "@/lib/data"
import {findTechniqueProfessorGuide,getProfessorSources} from "@/lib/professor-guides"
import {JournalLinks} from "@/components/site/journal-links"
type Props={readonly params:Promise<{id:string}>}
export function generateStaticParams(){return getTechniques().map(t=>({id:t.id}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {id}=await params;const t=getTechniques().find(x=>x.id===id);return {title:t?t.name+"｜竹笛技法":"找不到技法",description:t?.description,alternates:{canonical:t?"/techniques/"+t.id:"/techniques"}}}
export default async function TechniquePage({params}:Props){
 const {id}=await params;const technique=getTechniques().find(t=>t.id===id);if(!technique)notFound();const t=technique!;const g=findTechniqueProfessorGuide(t.id);const sources=g?getProfessorSources(g.sourceIds):[]
 return <><Breadcrumbs items={[{label:"首頁",href:"/"},{label:"技法聲音",href:"/techniques"},{label:t.name}]}/><PageHero label={t.category} title={t.name} description={g?.purpose||t.description} image={t.category.includes("氣")?"breath":"fingers"}/>
 <section className="section-band bg-card/50"><div className="content-wrap max-w-4xl">{g?<div className="space-y-10">{[["動作與聲音",g.action],["短時間練習",g.drill],["聽見問題，怎樣調整",g.diagnosis],["放回樂句理解",g.boundary]].map(([heading,body])=><section key={heading}><h2 className="font-serif text-2xl font-bold text-primary">{heading}</h2><p className="mt-4 font-sans text-lg leading-9 text-muted-foreground">{body}</p></section>)}</div>:<p className="font-sans text-lg leading-9">{t.description}</p>}
 {t.works?<p className="mt-10 border-t pt-6 font-sans leading-8"><strong>曲目連結：</strong>{t.works}</p>:null}
 <h2 className="mt-10 font-serif text-2xl font-bold text-primary">資料與延伸閱讀</h2><ul className="mt-5 space-y-3 font-sans">{sources.map(s=><li key={s.id}><a className="text-link" href={withBasePath(s.url)} target="_blank" rel="noreferrer">{s.label}</a></li>)}</ul><Link className="text-link mt-8 inline-block" href="/techniques">返回技法索引</Link></div></section>
 <JournalLinks category={t.category.includes("氣")?"breath":"fingers"}/></>
}

