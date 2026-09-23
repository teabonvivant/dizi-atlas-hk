import {withBasePath} from "@/lib/paths"
import type {Metadata} from "next"
import Link from "next/link"
import {Breadcrumbs,PageHero,SectionHeader} from "@/components/site/page-shell"
import {resources} from "@/lib/resources"
export const metadata:Metadata={title:"關於知識庫與資料來源",description:"中國竹笛知識庫的閱讀路線、內容範圍與主要資料來源。",alternates:{canonical:"/about"}}
export default function AboutPage(){return <>
 <Breadcrumbs items={[{label:"首頁",href:"/"},{label:"關於知識庫"}]}/>
 <PageHero label="關於知識庫" title="在文字與聲音之間，認識中國竹笛" description="Dizi Atlas 為香港讀者整理竹笛的學習、曲目、人物與文化。從第一口氣到一段合奏，從手上的樂器到它走過的舞台，讓閱讀有路可循，聆聽也有可以繼續的問題。" image="culture"/>
 <section className="section-band bg-card/50"><div className="content-wrap max-w-4xl"><SectionHeader title="按自己的步伐使用這張地圖"/><div className="space-y-6 font-sans text-lg leading-9"><p>初次接觸竹笛，可以從<Link className="text-link" href="/start">新手入門</Link>認識構造與發聲，再配合<Link className="text-link" href="/glossary">竹笛辭典</Link>閱讀常見術語。正在學習的人，可以把<Link className="text-link" href="/techniques">技法</Link>與<Link className="text-link" href="/pedagogy">學習路線</Link>連起來，每次選一個聽得見的目標。</p><p>喜歡閱讀與聆聽，可以由<Link className="text-link" href="/journal">一百篇竹笛札記</Link>開始，或循着<Link className="text-link" href="/repertoire">曲目</Link>尋找不同版本。備課與研究則可使用<Link className="text-link" href="/research">專題研究</Link>和<Link className="text-link" href="/database">資料庫</Link>，把人物、作品與來源並排閱讀。</p><p>作品資料區分作曲、整理、改編與編曲；聆聽文章著重可以在錄音與譜面中辨認的細節。歷史與人物內容附來源連結，讓有興趣的讀者回到樂團、院校、博物館、出版及研究資料繼續查閱。</p></div></div></section>
 <section id="sources" className="section-band"><div className="content-wrap"><SectionHeader title="主要資料來源"/><div className="grid gap-x-14 md:grid-cols-2">{resources.map(r=><article key={r.url} className="border-t py-6"><h3 className="font-serif text-xl font-bold text-primary"><a className="text-link" href={withBasePath(r.url)} target="_blank" rel="noreferrer">{r.title}</a></h3><p className="mt-3 font-sans leading-8 text-muted-foreground">{r.description}</p></article>)}</div></div></section>
 </>}

