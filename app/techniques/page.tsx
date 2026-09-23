import {withBasePath} from "@/lib/paths"
export const metadata = {"title":"技法與聲音","description":"二十五項竹笛技法的動作、練習與聆聽重點，從氣息、吐音到裝飾音建立音樂表達。","alternates":{"canonical":"https://teabonvivant.github.io/dizi-atlas-hk/techniques"}}
import { JournalLinks } from "@/components/site/journal-links"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { PageHero, SectionHeader } from "@/components/site/page-shell"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/site/data-table"
import { getTechniqueGroups, getTechniques } from "@/lib/data"
import { techniqueTeachingLine } from "@/lib/content"
import { findTechniqueProfessorGuide, getProfessorSources, professorMethod, professorSources } from "@/lib/professor-guides"

const familyNotes: Readonly<Record<string, string>> = {
  舌法: "舌頭畫出節奏的邊線。北派作品常要爽利，音頭卻不應粗硬；氣流仍須貫穿樂句。",
  指法與裝飾: "手指除了要準和快，還要顧及目的音、潤腔和句尾。骨幹旋律站得穩，裝飾才有落腳之處。",
  氣息與音色: "氣息支撐音芯、音準和長線條。改變氣流速度、角度或比例時，每次只動一項。",
  樂器改革: "新增音孔、低音與大型笛種各有獨立指法和人體工學，不能把六孔笛動作直接照搬。",
  地域與擬聲: "聲腔和擬聲都有自己的語言、輪廓與段落。氣、舌、指如何配合，比堆上多少技巧重要。",
  其他: "動作名稱未必處處相同，宜對照譜例、流派和可靠示範；聲音目的與身體負擔亦要一併考慮。"
}

function familyNote(category: string): string {
  return familyNotes[category] ?? "這一類技法需要和曲目、音色與教學階段一起理解。"
}

export default function TechniquesPage() {
  const techniques = getTechniques()
  const groups = getTechniqueGroups()

  return (
    <>
      <PageHero
        label="技法聲音"
        title="技法要聽得見，也要說得出為何這樣用"
        description="吐音、顫音、疊音、打音、滑音、花舌和循環換氣，各有動作，在樂句裏也各有作用。只顧數技巧，往往吹得熱鬧，曲子的語氣卻不見了。"
        image="practice"
        actions={
          <Button asChild variant="outline">
            <Link href="/repertoire">回到曲目聽法</Link>
          </Button>
        }
      />

      <section className="section-band bg-card/45">
        <div className="content-wrap">
          <SectionHeader label="技法分類" title="同一種技法，在不同曲種中作用不同" />
          <Accordion type="multiple" className="rounded-md border bg-card px-5">
            {groups.map(([category, items]) => (
              <AccordionItem key={category} value={category}>
                <AccordionTrigger>
                  {category}
                  <Badge className="ml-auto mr-3" variant="secondary">{items.length}項</Badge>
                </AccordionTrigger>
                <AccordionContent>
                  <p>{familyNote(category)}</p>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {items.map((technique) => {
                      const guide = findTechniqueProfessorGuide(technique.id)
                      const sources = guide ? getProfessorSources(guide.sourceIds) : []
                      return (
                        <article key={technique.id} className="rounded-md border bg-card p-5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3 className="font-serif text-xl font-bold text-primary"><Link href={"/techniques/"+technique.id} className="hover:underline underline-offset-4">{technique.name}</Link></h3>
                            <Badge variant="outline">{technique.works}</Badge>
                          </div>
                          <p className="mt-3 font-sans text-sm leading-7 text-muted-foreground">{techniqueTeachingLine(technique)}</p>
                          {guide ? (
                            <dl className="mt-4 grid gap-3 border-t pt-4 font-sans text-sm leading-7 text-muted-foreground">
                              <div><dt className="font-bold text-foreground">怎樣做</dt><dd>{guide.action}</dd></div>
                              <div><dt className="font-bold text-foreground">五分鐘練法</dt><dd>{guide.drill}</dd></div>
                              <div><dt className="font-bold text-foreground">聽見問題時</dt><dd>{guide.diagnosis}</dd></div>
                              <div><dt className="font-bold text-foreground">音樂界線</dt><dd>{guide.boundary}</dd></div>
                              <div><dt className="font-bold text-foreground">資料依據</dt><dd>{sources.map((source) => source.label).join("、")}</dd></div>
                            </dl>
                          ) : null}
                        </article>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="section-band bg-muted/45">
        <div className="content-wrap">
          <SectionHeader label="方法與來源" title={professorMethod.title}>
            <p>{professorMethod.summary}</p>
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

      <section className="section-band">
        <div className="content-wrap">
          <SectionHeader label="技法索引" title="二十五項技法，連回人物、曲目與研究線索" />
          <DataTable
            rows={techniques.map((item) => ({
              id: item.id,
              name: item.name,
              category: item.category,
              description: item.description,
              people: item.people,
              works: item.works,
              research: item.research
            }))}
            columns={["id", "name", "category", "description", "people", "works", "research"]}
          />
        </div>
      </section>
      <JournalLinks category="fingers" />
    </>
  )
}
