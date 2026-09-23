import {withBasePath} from "@/lib/paths"
import type {Metadata} from "next"
import Link from "next/link"
import {Breadcrumbs,PageHero,SectionHeader} from "@/components/site/page-shell"
import {JournalLinks} from "@/components/site/journal-links"
export const metadata:Metadata={title:"養笛指南",description:"竹笛日常清潔、笛膜、收納、外出與維修的實用指南。",alternates:{canonical:"/care"}}
const routines=[
 {title:"每次吹奏之後",body:"抹淨吹孔與手指接觸位置，以適合樂器的工具處理管內水分。清潔布乾爽後另行收好，檢查笛膜，再把竹笛放回合適笛套或盒內。",slug:"after-playing"},
 {title:"笛膜聲音改變時",body:"先以熟悉短句試音，確認指孔與口風，再觀察膜是否完整、邊緣是否密合。每次只調一項，並比較不同音區，讓耳朵參與判斷。",slug:"membrane-too-tight"},
 {title:"外出與轉換環境",body:"避免日曬、擠壓與碰撞，為樂器留一個穩定位置。到場後重新檢查、試奏及調音，將準備時間一起算進上課或演出行程。",slug:"travel-with-dizi"},
 {title:"發現裂痕或異常",body:"記錄位置、照片及聲音變化，避免彎壓或自行灌膠。將原來狀態交给製作者或熟悉竹笛的維修人員判斷，再按安排恢復使用。",slug:"cracked-bamboo"}
]
export default function CarePage(){return <>
 <Breadcrumbs items={[{label:"首頁",href:"/"},{label:"養笛指南"}]}/><PageHero label="養笛指南" title="照顧一支笛，從日常的小動作開始" description="清潔、笛膜與收納不必繁複。先熟悉自己的樂器，建立每次都做得到的次序，讓下一次打開笛盒時，聲音已準備好。" image="care"/>
 <section className="section-band bg-card/50"><div className="content-wrap"><SectionHeader title="四種情況，四個處理起點"/><div className="grid gap-x-14 md:grid-cols-2">{routines.map(r=><article key={r.slug} className="border-t py-7"><h3 className="font-serif text-2xl font-bold text-primary">{r.title}</h3><p className="mt-4 font-sans leading-8 text-muted-foreground">{r.body.replace("交给","交給")}</p><Link className="text-link mt-4 inline-block" href={"/journal/"+r.slug}>閱讀詳細做法</Link></article>)}</div></div></section>
 <section className="section-band"><div className="content-wrap max-w-4xl"><SectionHeader title="笛盒裏準備甚麼"/><ul className="grid gap-5 font-sans text-lg leading-8"><li><strong>乾淨軟布：</strong>外部擦拭與其他用途分開，使用後清理並保持乾爽。</li><li><strong>合適的管內清潔工具：</strong>先確認尺寸、笛塞位置及製作者的使用方法，遇到阻力便停止。</li><li><strong>笛膜與黏貼用品：</strong>妥善包裝並定期點算，平日在沒有時間壓力時練熟更換。</li><li><strong>穩妥的笛套或笛盒：</strong>讓每支笛有自己的位置，盒蓋自然合上，不擠壓膜孔和接合處。</li></ul><p className="mt-8 font-sans"><a className="text-link" href={withBasePath("https://www.lcsd.gov.hk/tc/mo/faq/instrumentbuyingandmaintenance.html")} target="_blank" rel="noreferrer">延伸閱讀：音樂事務處的樂器選購及保養資料</a></p></div></section>
 <JournalLinks category="care" title="養笛日常，逐篇細讀"/>
 </>}

