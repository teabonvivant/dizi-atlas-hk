import {withBasePath} from "@/lib/paths"
export const metadata = {"title":"竹笛入門","description":"認識笛種、笛膜與基本發聲，從持笛、氣息、指孔到第一段旋律，建立清楚的學習次序。","alternates":{"canonical":"https://teabonvivant.github.io/dizi-atlas-hk/start"}}
import { JournalLinks } from "@/components/site/journal-links"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { PageHero, KnowledgeCard, PhraseTitle, SectionHeader } from "@/components/site/page-shell"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { learningStages } from "@/lib/content"
import { diziSoundChecks, professorMethod, professorSources } from "@/lib/professor-guides"

const beginnerConcepts = [
  {
    title: "竹笛是什麼",
    body: "竹笛活躍於民間合奏，也走上獨奏、協奏和當代音樂舞台。它不只負責吹旋律；不同笛種、地域和曲種，都會改變一句音樂的口吻。"
  },
  {
    title: "梆笛與曲笛",
    body: "梆笛多見於較高音區，聲音爽亮，常令人聯想到北方戲曲和民間音樂；曲笛一般較厚潤，與江南絲竹和南方曲牌關係密切。這是一個方便入門的分法，實際作品往往更豐富。"
  },
  {
    title: "笛膜與音色",
    body: "笛膜令竹笛多了一層明亮而帶顫動的音色。貼得太緊、太鬆，或氣流未對準，聲音都會變薄、變硬或多雜音。會貼膜只是開始，更重要是聽得出它是否在合適地振動。"
  },
  {
    title: "流派不是標籤",
    body: "北派、南派、趙派、江南絲竹這些名稱，背熟了也未必聽得懂。把它們連到一首曲、一位演奏者和具體的吐音、氣口與裝飾，標籤才會變成有聲音的知識。"
  }
]

export default function StartPage() {
  return (
    <>
      <PageHero
        label="新手入門"
        title={<PhraseTitle parts={["第一次認識", "中國竹笛，", "由四個", "聽得見的問題開始"]} />}
        description="人物和術語可以慢慢認。這一頁先陪你弄清楚：竹笛的聲音從哪裏來，笛膜有甚麼作用，梆笛與曲笛又為何聽起來不一樣。"
        image="learn"
        actions={
          <Button asChild>
            <Link href="/repertoire">
              接著聽代表曲
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        }
      />

      <section className="section-band bg-card/45">
        <div className="content-wrap">
          <SectionHeader label="四個基本概念" title="先知道要聽甚麼，再學技法名稱" />
          <div className="grid gap-4 md:grid-cols-2">
            {beginnerConcepts.map((concept) => (
              <KnowledgeCard key={concept.title} title={concept.title} description={concept.body} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="content-wrap grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Badge variant="accent">16週入門</Badge>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-primary">每一週都應該聽見更具體的東西</h2>
            <p className="mt-4 font-sans leading-8 text-muted-foreground">
              十六週只是一個大概。較實際的次序是：聽得出音色，吹得穩一個音，把技法放回樂句，然後才比較不同版本為何各有選擇。
            </p>
          </div>
          <Accordion type="single" collapsible className="rounded-md border bg-card px-5">
            {learningStages.map((stage, index) => (
              <AccordionItem key={stage.title} value={`stage-${index}`}>
                <AccordionTrigger>
                  {stage.title}
                  <span className="ml-auto mr-3 hidden text-sm text-muted-foreground sm:inline">{stage.time}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p>{stage.goal}</p>
                  <p className="mt-3 rounded-md border bg-muted/45 p-3 font-sans text-sm leading-7 text-muted-foreground">
                    <strong className="text-primary">本階段聲音目標：</strong>{stage.soundTarget}
                  </p>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <strong className="text-foreground">先聽</strong>
                      <ul className="mt-2 list-disc pl-5">
                        {stage.listen.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <strong className="text-foreground">要練</strong>
                      <ul className="mt-2 list-disc pl-5">
                        {stage.practice.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 border-t pt-4 font-sans text-sm leading-7 md:grid-cols-2">
                    <p><strong className="text-primary">學習證據：</strong>{stage.evidence}</p>
                    <p><strong className="text-primary">教師檢查：</strong>{stage.teacherCheck}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="section-band bg-muted/45">
        <div className="content-wrap">
          <SectionHeader label="哪裏不對勁" title="聽見問題，便用一個小測試縮窄範圍">
            <p>{professorMethod.summary}</p>
          </SectionHeader>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {diziSoundChecks.map((check) => (
              <article key={check.title} className="rounded-md border bg-card p-5 shadow-line">
                <h3 className="font-serif text-xl font-bold text-primary">{check.title}</h3>
                <dl className="mt-4 grid gap-3 font-sans text-sm leading-7 text-muted-foreground">
                  <div><dt className="font-bold text-foreground">你會聽到</dt><dd>{check.symptom}</dd></div>
                  <div><dt className="font-bold text-foreground">做個小測試</dt><dd>{check.test}</dd></div>
                  <div><dt className="font-bold text-foreground">可以這樣調整</dt><dd>{check.adjustment}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="content-wrap">
          <SectionHeader label="資料從哪裏來" title="練法要試得出效果，史實也要找得到出處">
            <p>以下資料協助核對樂器、聲學、課程和錄音。至於一句音樂應怎樣處理，仍要回到譜面、可靠版本和老師面授，不宜把網頁當成唯一答案。</p>
          </SectionHeader>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {professorSources.map((source) => (
              <a key={source.id} href={withBasePath(source.url)} target="_blank" rel="noreferrer" className="rounded-md border bg-card p-4 font-sans text-sm leading-6 text-muted-foreground hover:border-primary">
                <strong className="flex items-center gap-2 text-primary">{source.label}<ExternalLink className="h-4 w-4" aria-hidden="true" /></strong>
                <span className="mt-2 block">{source.scope}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <JournalLinks category="beginning" />
    </>
  )
}
