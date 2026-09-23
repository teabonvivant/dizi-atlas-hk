export const metadata = {"title":"學習路線","description":"從初學、進階到演出，安排每日練習、記錄聲音，逐步培養讀譜、技巧與聆聽能力。","alternates":{"canonical":"https://teabonvivant.github.io/dizi-atlas-hk/pedagogy"}}
import { JournalLinks } from "@/components/site/journal-links"
import Link from "next/link"
import { PageHero, PhraseTitle, SectionHeader } from "@/components/site/page-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { learningStages } from "@/lib/content"
import { diziAssessment, professorMethod } from "@/lib/professor-guides"

const routes = [
  {
    title: "初學者路線",
    level: "Beginner",
    aim: "把耳朵、音色和基本發音安頓好，技巧不用趕着一次學齊。",
    steps: ["認識梆笛與曲笛", "長音與笛膜控制", "單吐與慢速換指", "聽三首代表曲"]
  },
  {
    title: "進階學生路線",
    level: "Intermediate",
    aim: "把技巧放入曲目，開始比較流派和版本。",
    steps: ["雙吐與歷音", "顫音、疊打贈音分寸", "同曲兩版本聽辨", "寫短篇曲目分析"]
  },
  {
    title: "院校級路線",
    level: "Academy",
    aim: "把作品、文獻、演奏版本、地域音樂和教學法連成研究問題。",
    steps: ["建立曲目版本表", "查證人物與來源", "做技法段落分析", "完成研究報告提綱"]
  }
] as const

export default function PedagogyPage() {
  return (
    <>
      <PageHero
        label="學習路線"
        title={<PhraseTitle parts={["程度不同，", "自然有不同的學法"]} />}
        description="初學者需要少一點術語，多一點聽覺方向；進階學生要把技巧放回曲目；到了院校程度，還要能查資料、比版本，並提出值得研究的問題。"
        image="learn"
        actions={
          <Button asChild>
            <Link href="/techniques">配合技法頁練習</Link>
          </Button>
        }
      />

      <section className="section-band bg-card/45">
        <div className="content-wrap">
          <SectionHeader label="三條路線" title="找到自己站的位置，才知道下一步走去哪裏" />
          <div className="grid gap-4 lg:grid-cols-3">
            {routes.map((route) => (
              <article key={route.title} className="rounded-md border bg-card p-5 shadow-line">
                <Badge variant="accent">{route.level}</Badge>
                <h3 className="mt-4 font-serif text-2xl font-bold text-primary">{route.title}</h3>
                <p className="mt-3 font-sans text-sm leading-7 text-muted-foreground">{route.aim}</p>
                <ol className="mt-5 grid gap-3 font-sans text-sm leading-7 text-muted-foreground">
                  {route.steps.map((step, index) => (
                    <li key={step} className="flex gap-3">
                      <span className="font-bold text-accent">{index + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="content-wrap">
          <SectionHeader label="十六週課程" title="老師可以拿來備課，學生也看得懂的入門框架" />
          <div className="grid gap-4 md:grid-cols-2">
            {learningStages.map((stage) => (
              <article key={stage.title} className="rounded-md border bg-card p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{stage.time}</Badge>
                  <Badge variant="secondary">課程單元</Badge>
                </div>
                <h3 className="mt-4 font-serif text-2xl font-bold text-primary">{stage.title}</h3>
                <p className="mt-3 font-sans text-sm leading-7 text-muted-foreground">{stage.goal}</p>
                <p className="mt-3 rounded-md border bg-muted/45 p-3 font-sans text-sm leading-7 text-muted-foreground"><strong className="text-primary">聲音目標：</strong>{stage.soundTarget}</p>
                <div className="mt-5 grid gap-4 font-sans text-sm md:grid-cols-2">
                  <div>
                    <strong className="text-primary">聆聽材料</strong>
                    <p className="mt-2 leading-7 text-muted-foreground">{stage.listen.join("、")}</p>
                  </div>
                  <div>
                    <strong className="text-primary">練習重點</strong>
                    <p className="mt-2 leading-7 text-muted-foreground">{stage.practice.join("、")}</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-3 border-t pt-4 font-sans text-sm leading-7 text-muted-foreground">
                  <p><strong className="text-primary">學習證據：</strong>{stage.evidence}</p>
                  <p><strong className="text-primary">教師檢查：</strong>{stage.teacherCheck}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band bg-muted/45">
        <div className="content-wrap">
          <SectionHeader label="怎樣看見進步" title="吹完一首曲不等於學會；聽得出、改得到、說得明才算">
            <p>{professorMethod.summary}</p>
          </SectionHeader>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {diziAssessment.map((item) => (
              <article key={item.dimension} className="rounded-md border bg-card p-5">
                <Badge variant="accent">{item.dimension}</Badge>
                <h3 className="mt-4 font-serif text-xl font-bold text-primary">{item.question}</h3>
                <p className="mt-3 font-sans text-sm leading-7 text-muted-foreground"><strong className="text-foreground">怎樣驗證：</strong>{item.evidence}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <JournalLinks category="study" />
    </>
  )
}
