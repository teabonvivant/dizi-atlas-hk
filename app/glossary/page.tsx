import {withBasePath} from "@/lib/paths"
import type {Metadata} from "next"
import Link from "next/link"
import {Breadcrumbs,PageHero} from "@/components/site/page-shell"
import {glossary} from "@/lib/glossary"
export const metadata:Metadata={title:"竹笛辭典",description:"從吹孔、笛膜、筒音到裝飾音、版本與合奏，讀懂常見竹笛術語。",alternates:{canonical:"/glossary"}}
export default function GlossaryPage(){const groups=[...new Set(glossary.map(x=>x.category))];return <>
 <Breadcrumbs items={[{label:"首頁",href:"/"},{label:"竹笛辭典"}]}/>
 <PageHero label="竹笛辭典" title="把術語放回聲音裏" description="讀文章或樂譜遇到陌生字眼，可以先在這裏找一段清楚解釋，再循着連結看實際練法與聆聽例子。" image="beginning"/>
 <section className="section-band bg-card/50"><div className="content-wrap"><nav aria-label="辭典分類" className="mb-10 flex flex-wrap gap-2">{groups.map(g=><a key={g} className="filter-link" href={withBasePath("#"+g)}>{g}</a>)}</nav>{groups.map(g=><section key={g} id={g} className="mb-14"><h2 className="border-b pb-4 font-serif text-3xl font-bold text-primary">{g}</h2><dl className="grid gap-x-14 md:grid-cols-2">{glossary.filter(x=>x.category===g).map(x=><div key={x.term} className="border-b py-6"><dt className="font-serif text-xl font-bold text-primary">{x.term}</dt><dd className="mt-3 font-sans leading-8 text-muted-foreground">{x.definition}<Link className="text-link mt-3 block text-sm" href={"/journal/"+x.article}>延伸閱讀</Link></dd></div>)}</dl></section>)}</div></section>
 </>}

