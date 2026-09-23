"use client"
import {formPath} from "@/lib/paths"

import {useSearchParams} from "next/navigation"

import Link from "next/link"
import { PageHero, PhraseTitle, SectionHeader } from "@/components/site/page-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getMasters } from "@/lib/data"
import { masterTeachingLine } from "@/lib/content"
function valueOf(value: string | string[] | undefined): string { return Array.isArray(value) ? value[0] ?? "" : value ?? "" }

export function MastersContent({parameters}:{readonly parameters:Partial<Record<"q"|"kind"|"category"|"style"|"page",string>>}) {
  const params = parameters
  const query = valueOf(params["q"]).trim()
  const style = valueOf(params["style"])
  const masters = getMasters()
  const styles = [...new Set(masters.flatMap((person) => person.style ? [person.style] : []))].sort((left, right) => left.localeCompare(right, "zh-Hant-HK"))
  const needle = query.toLocaleLowerCase("zh-Hant-HK")
  const filtered = masters.filter((person) => (!needle || `${person.name} ${person.roles} ${person.style} ${person.region} ${person.summary} ${person.works.join(" ")}`.toLocaleLowerCase("zh-Hant-HK").includes(needle)) && (!style || person.style === style))
  const featured = masters.slice(0, 12)

  return (
    <>
      <PageHero label="名家故事" title={<PhraseTitle parts={["五十個名字，", "串起一部", "有聲音的竹笛史"]} />} description="五十位人物連接演奏、作品與教學。由熟悉的曲名尋找演奏者，再沿着人物資料與來源，了解不同聲音的來路。" image="performance" actions={<Button asChild variant="outline"><Link href="/search">搜尋全站內容</Link></Button>} />
      {!query && !style ? <section className="section-band bg-card/45"><div className="content-wrap"><SectionHeader label="建議先讀" title="這十二位人物，最容易把曲目、流派和時代連起來" /><div className="artists-grid">{featured.map((person) => <article key={person.id} className="artist-item"><h3>{person.name}</h3><p className="artist-meta"><span>{person.style}</span><span>{person.birth_death}</span></p><p className="mt-4 font-sans text-sm leading-7 text-muted-foreground">{masterTeachingLine(person)}</p><Button asChild variant="link" className="mt-4"><Link href={`/masters/${person.id}`}>閱讀{person.name}的人物檔案</Link></Button></article>)}</div></div></section> : null}
      <section className="section-band"><div className="content-wrap">
        <SectionHeader label="人物索引" title="記得名字便搜名字；想聽某種風格，也可以由風格找人" />
        <form action={formPath("/masters")} role="search" className="grid gap-5 border-y py-6 md:grid-cols-[1fr_240px_auto]">
          <label className="grid gap-2 font-sans text-sm font-bold text-primary" htmlFor="master-query">搜尋人物<Input id="master-query" name="q" type="search" defaultValue={query} placeholder="名字、院校、作品或地域" /></label>
          <label className="grid gap-2 font-sans text-sm font-bold text-primary" htmlFor="master-style">風格<select id="master-style" name="style" defaultValue={style} className="min-h-11 rounded-md border border-input bg-card px-3 font-sans font-normal"><option value="">全部風格</option>{styles.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
          <Button type="submit" className="self-end">套用篩選</Button>
        </form>
        <p className="mt-4 font-sans text-sm font-bold text-muted-foreground" role="status" aria-live="polite">顯示 {filtered.length} / {masters.length} 位人物{query || style ? <> · <Link href="/masters" className="text-accent underline underline-offset-4">清除條件</Link></> : null}</p>
        {filtered.length > 0 ? <div className="directory-index">{filtered.map((person) => <Link key={person.id} href={`/masters/${person.id}`} className=""><strong className="block text-primary">{person.name}</strong><span className="mt-1 block text-sm leading-6 text-muted-foreground">{person.style || person.region}</span></Link>)}</div> : <div className="mt-5 rounded-md border border-dashed bg-card p-6 font-sans text-muted-foreground">沒有相符人物。可縮短關鍵字或清除風格條件。</div>}
      </div></section>
    </>
  )
}

export default function MastersQuery(){const query=useSearchParams();return <MastersContent parameters={Object.fromEntries(query.entries())}/>;}
