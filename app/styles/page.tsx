import type { Metadata } from "next"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Breadcrumbs, PageHero, SectionHeader } from "@/components/site/page-shell"
import { getMasters, getRepertoire, getStyleRegions } from "@/lib/data"
import { splitValues } from "@/lib/utils"
import { withBasePath } from "@/lib/paths"

export const metadata: Metadata = {
  title: "竹笛流派、地域與傳播路線",
  description: "由人物、曲目和聲音特徵閱讀中國竹笛的地域風格、教學脈絡與海外傳播。",
  alternates: { canonical: "/styles" }
}

export default function StylesPage() {
  const styles = getStyleRegions()
  const masters = getMasters()
  const repertoire = getRepertoire()

  return <>
    <Breadcrumbs items={[{ label: "首頁", href: "/" }, { label: "研究與資料", href: "/database" }, { label: "流派與地域" }]} />
    <PageHero
      label="流派與地域"
      title="讓地域名稱，回到人物、作品與聲音之中"
      description="南北風格、地方音樂、教學傳承和海外傳播並非同一種分類。本頁把它們整理成不同的閱讀入口，協助你由具體人物與曲目開始；名稱用作導讀，不是邊界固定、彼此互斥的正式樂派表。"
      image="culture"
    />
    <section className="section-band bg-card/45">
      <div className="content-wrap">
        <SectionHeader label="閱讀地圖" title={`${styles.length} 條風格與文化線索`}>
          <p>先聽聲音特徵，再沿着人物檔案與作品資料往下讀。每個標籤都從具體演奏者、曲目或地方音樂切入，呈現竹笛在不同地域與教學脈絡中的實踐。</p>
        </SectionHeader>
        <div className="grid gap-5 md:grid-cols-2">
          {styles.map((style) => {
            const people = splitValues(style.people).map((name) => ({ name, master: masters.find((person) => person.name === name) }))
            const workTitles = [...style.works.matchAll(/《([^》]+)》/g)].map((match) => match[1])
            const works = workTitles.map((title) => {
              const item = repertoire.find((candidate) => candidate.title === title)
              return { title, id: item?.id }
            })
            const worksLabel = style.name === "臺灣竹笛" ? "曲目與出版" : style.name === "海外竹笛" ? "出版與錄音" : "曲目入口"
            return <article key={style.name} className="rounded-md border bg-card p-5 shadow-line">
              <h2 className="font-serif text-2xl font-bold text-primary">{style.name}</h2>
              <p className="mt-3 font-sans leading-8 text-muted-foreground">{style.features}</p>
              <p className="mt-4 border-t pt-3 font-sans text-sm leading-7 text-muted-foreground"><strong className="text-primary">可追問的方向：</strong>{style.research}</p>
              {people.length ? <div className="mt-4 font-sans text-sm leading-7 text-muted-foreground"><strong className="text-primary">人物入口：</strong><span>{people.map(({ name, master }, index) => <span key={name}>{index ? "、" : ""}{master ? <Link className="text-link" href={`/masters/${master.id}`}>{name}</Link> : name}</span>)}</span></div> : null}
              {works.length ? <div className="mt-3 font-sans text-sm leading-7 text-muted-foreground"><strong className="text-primary">{worksLabel}：</strong><span>{works.map((work, index) => <span key={work.title}>{index ? "、" : ""}{work.id ? <Link className="text-link" href={`/repertoire/${work.id}`}>《{work.title}》</Link> : `《${work.title}》`}</span>)}</span></div> : null}
              {style.sources.length ? <div className="mt-4 border-t pt-3"><h3 className="font-sans text-sm font-bold text-primary">延伸來源</h3><ul className="mt-2 space-y-2 font-sans text-sm leading-6">{style.sources.map((source) => <li key={source.url}><a className="text-link inline-flex items-start gap-1" href={withBasePath(source.url)} target="_blank" rel="noreferrer"><span>{source.title}</span><ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" /></a></li>)}</ul></div> : null}
            </article>
          })}
        </div>
      </div>
    </section>
    <section className="section-band">
      <div className="content-wrap grid gap-5 md:grid-cols-2">
        <article className="rounded-md border bg-card p-5"><h2 className="font-serif text-xl font-bold text-primary">樂器改良</h2><p className="mt-2 font-sans leading-7 text-muted-foreground">增孔、調音插口、排笛與低音笛回應不同的演奏和音域需要。</p><Link href="/instruments" className="text-link mt-3 inline-block">閱讀竹笛形制與改良</Link></article>
        <article className="rounded-md border bg-card p-5"><h2 className="font-serif text-xl font-bold text-primary">來源與交叉查讀</h2><p className="mt-2 font-sans leading-7 text-muted-foreground">人物頁附院校、樂團或研究來源；作品頁則連到導聽、演奏者和錄音資料。</p><Link href="/database" className="text-link mt-3 inline-block">開啟竹笛資料庫</Link></article>
      </div>
    </section>
  </>
}
