import {withBasePath} from "@/lib/paths"
export const metadata = {"title":"曲目導聽","description":"從喜相逢、鷓鴣飛到當代協奏曲，結合作品索引、聆聽次序與練習方法認識竹笛曲目。","alternates":{"canonical":"https://teabonvivant.github.io/dizi-atlas-hk/repertoire"}}
import { JournalLinks } from "@/components/site/journal-links"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { PageHero, SectionHeader } from "@/components/site/page-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/site/data-table"
import { getRepertoire, getStyleRegions } from "@/lib/data"
import { repertoireListeningLine, styleDigest } from "@/lib/content"
import { findRepertoireProfessorGuide, professorSources } from "@/lib/professor-guides"
import { publicStatus } from "@/lib/utils"

function pickCoreTitles() {
  return ["喜相逢", "蔭中鳥", "鷓鴣飛", "行街", "早晨", "牧民新歌", "秦川情", "秦川抒懷", "花泣", "愁空山"]
}

export default function RepertoirePage() {
  const repertoire = getRepertoire()
  const styles = getStyleRegions()
  const coreTitles = pickCoreTitles()
  const coreWorks = coreTitles.flatMap((title) => {
    const item = repertoire.find((candidate) => candidate.title === title)
    return item ? [item] : []
  })

  return (
    <>
      <PageHero
        label="曲目導聽"
        title="十首曲，十個走進竹笛世界的入口"
        description="一張曲目表很容易看完便忘。這裏每首曲都列出一個可直接聆聽和比較的問題：地域語氣落在哪裏，技巧怎樣推動樂句，版本之間又有甚麼取捨。"
        image="listen"
        actions={
          <Button asChild variant="outline">
            <Link href="/research/reports/R07">看同曲版本如何比較</Link>
          </Button>
        }
      />

      <section className="section-band bg-card/45">
        <div className="content-wrap">
          <SectionHeader label="十首入門曲" title="每首聽兩遍，會比一次聽十首走得更遠" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {coreWorks.map((item) => {
              const guide = findRepertoireProfessorGuide(item.title)
              return (
              <article key={item.id} className="rounded-md border bg-card p-5 shadow-line">
                <div className="flex flex-wrap gap-2">
                  <Badge>{item.style || item.type}</Badge>
                  
                </div>
                <h3 className="mt-4 font-serif text-2xl font-bold text-primary"><Link href={"/repertoire/"+item.id} className="hover:underline underline-offset-4">{item.title}</Link></h3>
                <p className="mt-2 font-sans text-sm text-muted-foreground">{item.creator || item.people}</p>
                <p className="mt-4 font-sans text-sm leading-7 text-muted-foreground">{repertoireListeningLine(item)}</p>
                {guide ? (
                  <dl className="mt-4 grid gap-3 border-t pt-4 font-sans text-sm leading-7 text-muted-foreground">
                    <div><dt className="font-bold text-foreground">換個角度再聽</dt><dd>{guide.secondListen}</dd></div>
                    <div><dt className="font-bold text-foreground">練習焦點</dt><dd>{guide.technicalFocus}</dd></div>
                    <div><dt className="font-bold text-foreground">別急着下結論</dt><dd>{guide.styleBoundary}</dd></div>
                    <div className="rounded-md bg-muted/55 p-3"><dt className="font-bold text-primary">今次功課</dt><dd>{guide.assignment}</dd></div>
                  </dl>
                ) : null}
              </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="content-wrap">
          <SectionHeader label="風格入口" title="除了好不好聽，也問一句：這種語氣從哪裏來" />
          <div className="grid gap-4 md:grid-cols-2">
            {styles.slice(0, 8).map((style) => (
              <article key={style.name} className="rounded-md border bg-card p-5">
                <h3 className="font-serif text-xl font-bold text-primary">{style.name}</h3>
                <p className="mt-3 font-sans text-sm leading-7 text-muted-foreground">{styleDigest(style)}</p>
                <p className="mt-3 font-sans text-sm leading-7 text-muted-foreground">{style.research}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="content-wrap">
          <SectionHeader label="版本與史料" title="耳朵有判斷，資料也要找得到">
            <p>以下來源用來核對作品、錄音和中樂團笛種。卡片提供的是聆聽方法，不是標準答案；不同版本有理有據，便值得並排細聽。</p>
          </SectionHeader>
          <div className="grid gap-3 md:grid-cols-2">
            {professorSources.filter((source) => ["cuhk-recordings", "hkco-excerpts"].includes(source.id)).map((source) => (
              <a key={source.id} href={withBasePath(source.url)} target="_blank" rel="noreferrer" className="rounded-md border bg-card p-4 font-sans text-sm leading-6 text-muted-foreground hover:border-primary">
                <strong className="flex items-center gap-2 text-primary">{source.label}<ExternalLink className="h-4 w-4" aria-hidden="true" /></strong>
                <span className="mt-2 block">{source.scope}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band bg-muted/45">
        <div className="content-wrap">
          <SectionHeader label="曲目索引" title="曲目與演出索引，供選曲與備課使用" />
          <DataTable
            rows={repertoire.map((item) => ({
              id: item.id,
              title: item.title,
              creator: item.creator,
              people: item.people,
              type: item.type,
              style: item.style,
              status: publicStatus(item.status)
            }))}
            columns={["id", "title", "creator", "people", "type", "style", "status"]}
          />
        </div>
      </section>
      <JournalLinks category="repertoire" />
    </>
  )
}
