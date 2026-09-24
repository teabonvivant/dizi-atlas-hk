import type { Metadata } from "next"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Breadcrumbs, PageHero, SectionHeader } from "@/components/site/page-shell"
import { getInstrumentReforms, getMasters } from "@/lib/data"
import { splitValues } from "@/lib/utils"
import { withBasePath } from "@/lib/paths"

export const metadata: Metadata = {
  title: "竹笛形制與樂器改良",
  description: "從調音插口、增孔、十孔笛到低音笛，循可追溯資料認識竹笛形制的改良與演奏需要。",
  alternates: { canonical: "/instruments" }
}

export default function InstrumentsPage() {
  const reforms = getInstrumentReforms()
  const masters = getMasters()

  return <>
    <Breadcrumbs items={[{ label: "首頁", href: "/" }, { label: "研究與資料", href: "/database" }, { label: "樂器形制與改良" }]} />
    <PageHero
      label="樂器形制"
      title="一支笛的長短、孔數與材料，都在回應聲音"
      description="竹笛改良沿着多條路徑發展：有人調整管身與音孔，有人把音域向高處或低處延伸，也有人以不同材料試驗穩定性。以下由公開文獻與專業資料整理各種形制、演奏者、材料與用途。"
      image="instrument"
    />

    <section className="section-band bg-card/45">
      <div className="content-wrap">
        <SectionHeader label="改良記錄" title={`${reforms.length} 項形制與聲音探索`}>
          <p>條目所列的演奏者、作品和作用，按各自附上的來源整理。不同製作者對同一名稱可能有不同方案；孔數或材料本身也不代表某一種形制已成通行標準。</p>
        </SectionHeader>
        <div className="grid gap-5 md:grid-cols-2">
          {reforms.map((item) => {
            const people = splitValues(item.people).map((name) => ({ name, master: masters.find((person) => person.name === name) }))
            return <article key={item.id} className="rounded-md border bg-card p-5 shadow-line">
              <p className="font-sans text-xs font-bold tracking-[0.14em] text-muted-foreground">{item.id}</p>
              <h2 className="mt-2 font-serif text-2xl font-bold text-primary">{item.instrument}</h2>
              <p className="mt-3 font-sans font-semibold leading-7 text-foreground">{item.purpose}</p>
              <p className="mt-3 font-sans leading-8 text-muted-foreground">{item.detail}</p>
              {item.works ? <p className="mt-4 border-t pt-3 font-sans text-sm leading-7 text-muted-foreground"><strong className="text-primary">相關作品或教材：</strong>{item.works}</p> : null}
              <p className="mt-3 font-sans text-sm leading-7 text-muted-foreground"><strong className="text-primary">相關人物：</strong>{people.map(({ name, master }, index) => <span key={name}>{index ? "、" : ""}{master ? <Link className="text-link" href={`/masters/${master.id}`}>{name}</Link> : name}</span>)}</p>
              {item.sources.length ? <div className="mt-4 border-t pt-3"><h3 className="font-sans text-sm font-bold text-primary">資料來源</h3><ul className="mt-2 space-y-2 font-sans text-sm leading-6">{item.sources.map((source) => <li key={source.url}><a className="text-link inline-flex items-start gap-1" href={withBasePath(source.url)} target="_blank" rel="noreferrer"><span>{source.title}</span><ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" /></a></li>)}</ul></div> : null}
            </article>
          })}
        </div>
      </div>
    </section>
    <section className="section-band">
      <div className="content-wrap max-w-4xl">
        <SectionHeader label="閱讀方法" title="先問它為甚麼改，再問它帶來甚麼聲音" />
        <p className="font-sans text-lg leading-9 text-muted-foreground">比較不同形制時，可以先聽同一段旋律：音準與轉調是否更方便，音域有沒有改變，音色和持奏如何配合演奏者。把演奏錄音與樂器實物、製作圖或專利記錄放在一起閱讀，便能看見名稱背後的構造和聲音選擇。</p>
        <p className="mt-5"><Link className="text-link" href="/database">在資料庫交叉搜尋人物、曲目與來源</Link></p>
      </div>
    </section>
  </>
}
