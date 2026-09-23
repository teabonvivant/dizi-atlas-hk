import {withBasePath,formPath} from "@/lib/paths"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowDown, ArrowRight, ArrowUpRight, Search } from "lucide-react"
import { journalArticles, journalCategories } from "@/lib/journal"
import "./home-classical.css"

export const metadata: Metadata = {
  title: "中國竹笛知識庫｜由聲音走進文化",
  description: "一百篇竹笛札記、曲目導聽、五十位人物、演奏技法與研究資料。從一口氣、一個音開始，慢慢聽懂中國竹笛。",
  alternates: { canonical: "/" },
}
const routes = [
  { title: "第一次拿起竹笛", description: "認識笛身、笛膜與發聲，再用簡單練習建立第一個清楚的音。", href: "/start", label: "看入門路線" },
  { title: "練習遇到一個問題", description: "由氣息、指法與吐音找出小接點，把技法放回真正的樂句。", href: "/techniques", label: "閱讀技法與練法" },
  { title: "想聽懂一首作品", description: "先聽旋律方向，再留意氣口、裝飾與伴奏，逐步比較不同版本。", href: "/repertoire", label: "走進曲目導聽" },
  { title: "循着名字認識時代", description: "五十位人物，連到作品、演奏風格、教學與資料來源。", href: "/masters", label: "瀏覽名家索引" },
  { title: "照顧手上的樂器", description: "把清潔、貼膜、收納和外出準備，變成安定而簡單的習慣。", href: "/care", label: "閱讀養笛指南" },
  { title: "為備課與研究找材料", description: "十個專題、二百個研究題目，以及可以交叉搜尋的資料庫。", href: "/research", label: "進入專題研究" },
]
export default function HomePage() {
  const featured = ["gusu-walk", "first-bamboo", "silk-bamboo", "after-playing"].map(slug => journalArticles.find(a => a.slug === slug)!)
  const lead = featured[0]!
  const stories = featured.slice(1)
  return <div className="classical-home">
    <section className="chamber-hero" aria-labelledby="chamber-title">
      <picture className="chamber-scene">
        <source media="(max-width: 680px)" srcSet={withBasePath("/images/editorial/classical-hero-960.webp")} />
        <img src={withBasePath("/images/editorial/classical-hero.webp")} width={1672} height={941} alt="竹窗前的木案上，放着竹笛、線裝書與素色絲布。" fetchPriority="high" />
      </picture>
      <div className="chamber-shade" aria-hidden="true" />
      <div className="chamber-hero-inner">
        <h1 id="chamber-title">一管清音，<br />半窗竹影。</h1>
        <p className="chamber-deck">竹笛的聲音，連着手上的練習，<br />也連着曲目、人物與地方文化。</p>
        <div className="chamber-actions">
          <Link className="chamber-primary" href="/start">從新手入門<ArrowUpRight size={18} strokeWidth={1.3} aria-hidden="true" /></Link>
          <Link className="chamber-secondary" href="/journal">讀竹笛札記<ArrowRight size={18} strokeWidth={1.3} aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="chamber-hero-foot"><Link href="#home-reading">循着笛聲，往下讀<ArrowDown size={16} strokeWidth={1.3} aria-hidden="true" /></Link><span>文字、圖解與聆聽之間的一張竹笛地圖。</span></div>
    </section>

    <section id="home-reading" className="chamber-intro chamber-wrap">
      <div className="chamber-intro-copy">
        <h2>由一口氣、一個音，<br />慢慢聽懂中國竹笛。</h2>
        <div><p>竹笛的聲音，連着手上的練習，也連着曲目、人物與地方文化。</p><p>這裏有清楚的入門路線，也有值得細讀的文章，陪你循着自己的問題走下去。</p></div>
      </div>
      <form action={formPath("/search")} role="search" className="chamber-search">
        <label htmlFor="chamber-search">帶着一個問題來？</label>
        <div><input id="chamber-search" name="q" type="search" placeholder="搜尋曲名、人物、技法或文章" /><button type="submit"><Search size={18} strokeWidth={1.5} aria-hidden="true" /><span>搜尋全站</span></button></div>
      </form>
    </section>

    <section className="chamber-journal chamber-wrap" aria-labelledby="chamber-journal-title">
      <div className="chamber-section-heading">
        <div><h2 id="chamber-journal-title">竹笛札記</h2><p>讀一篇，也試一點。把練習的細節、聆聽的發現與樂器的故事，寫成可以慢慢讀的日常。</p></div>
        <Link className="chamber-text-link" href="/journal">閱讀全部文章<ArrowUpRight size={18} strokeWidth={1.3} aria-hidden="true" /></Link>
      </div>
      <div className="chamber-stories">
        <article className="chamber-lead">
          <Link className="chamber-story-image" href={"/journal/" + lead.slug} tabIndex={-1} aria-hidden="true"><img src={withBasePath(lead.image)} width={600} height={400} alt="" loading="lazy" /></Link>
          <div className="chamber-lead-copy"><h3><Link href={"/journal/" + lead.slug}>{lead.title}</Link></h3><p>{lead.intro}</p><Link className="chamber-text-link" href={"/journal/" + lead.slug}>細讀這篇札記<ArrowUpRight size={17} strokeWidth={1.3} aria-hidden="true" /></Link></div>
        </article>
        <div className="chamber-story-list">{stories.map(a => <article key={a.slug}>
          <Link className="chamber-story-image" href={"/journal/" + a.slug} tabIndex={-1} aria-hidden="true"><img src={withBasePath(a.image)} width={300} height={200} alt="" loading="lazy" /></Link>
          <div><h3><Link href={"/journal/" + a.slug}>{a.title}<ArrowUpRight size={17} strokeWidth={1.3} aria-hidden="true" /></Link></h3><p>{a.intro}</p></div>
        </article>)}</div>
      </div>
      <div className="chamber-themes"><p>一百篇博客，十個主題。</p><nav aria-label="探索札記主題">{journalCategories.map(c => <Link key={c.slug} href={"/journal?category=" + c.slug}>{c.title}</Link>)}</nav></div>
    </section>

    <section className="chamber-paths" aria-labelledby="chamber-paths-title">
      <div className="chamber-wrap chamber-paths-grid">
        <div className="chamber-paths-opening"><h2 id="chamber-paths-title">今天，<br />想由哪裏開始？</h2><figure><img src={withBasePath("/images/editorial/culture.webp")} width={600} height={400} alt="傳統樂器與木桌相伴的幽靜樂室。" loading="lazy" /></figure></div>
        <div className="chamber-path-list">{routes.map(route => <article key={route.href}><h3><Link href={route.href}>{route.title}</Link></h3><p>{route.description}</p><Link className="chamber-text-link" href={route.href}>{route.label}<ArrowUpRight size={17} strokeWidth={1.3} aria-hidden="true" /></Link></article>)}</div>
      </div>
    </section>

    <section className="chamber-sources chamber-wrap">
      <h2>讀得明白，<br />也找得到來路。</h2>
      <div><p>從博物館的樂器藏品、樂團的演出節目，到院校教材與研究，資料讓聆聽多一份根據。遇到陌生術語，可以先查辭典；對作品產生興趣，便沿着來源繼續讀。</p><div className="chamber-source-links"><Link className="chamber-text-link" href="/glossary">竹笛辭典<ArrowUpRight size={17} strokeWidth={1.3} aria-hidden="true" /></Link><Link className="chamber-text-link" href="/about#sources">主要資料來源<ArrowUpRight size={17} strokeWidth={1.3} aria-hidden="true" /></Link></div></div>
    </section>
  </div>
}

