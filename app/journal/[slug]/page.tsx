import {withBasePath} from "@/lib/paths"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/site/page-shell"
import { findArticle, findCategory, journalArticles, relatedArticles, siteUrl } from "@/lib/journal"
type Props = { readonly params: Promise<{slug:string}> }
export function generateStaticParams(){ return journalArticles.map(a=>({slug:a.slug})) }
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const a=findArticle((await params).slug)
  if(!a)return {title:"找不到這篇文章"}
  return {title:a.title,description:a.intro,alternates:{canonical:"/journal/"+a.slug},openGraph:{title:a.title,description:a.intro,type:"article",url:siteUrl+"/journal/"+a.slug,images:[a.image]}}
}
export default async function ArticlePage({params}:Props){
  const article=findArticle((await params).slug)
  if(!article)notFound()
  const a=article!
  const c=findCategory(a.category)!
  const previous=journalArticles[a.number-2]
  const next=journalArticles[a.number]
  const schema={"@context":"https://schema.org","@type":"BlogPosting",headline:a.title,description:a.intro,inLanguage:"zh-Hant-HK",mainEntityOfPage:siteUrl+"/journal/"+a.slug,image:[siteUrl+a.image,siteUrl+a.diagramImage],publisher:{"@type":"Organization",name:"中國竹笛知識庫",url:siteUrl},articleSection:c.title}
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/>
    <Breadcrumbs items={[{label:"首頁",href:"/"},{label:"竹笛札記",href:"/journal"},{label:c.title,href:"/journal?category="+c.slug},{label:a.title}]}/>
    <article className="pb-16" data-journal-article={a.slug}>
      <header className="content-wrap article-header">
        <h1>{a.title.split(/(?<=[，：])/u).map((phrase,i)=><span className="article-title-phrase" key={i}>{phrase}</span>)}</h1>
        <div className="article-deck"><div className="article-header-meta">{c.title} · 約 {a.minutes} 分鐘閱讀</div>
        <p>{a.intro}</p></div>
      </header>
      <figure className="content-wrap article-cover"><img src={withBasePath(a.image)} alt={a.imageAlt} width={1200} height={800} fetchPriority="high" className="w-full object-cover"/><figcaption className="mt-3 font-sans text-sm leading-6 text-muted-foreground">{a.imageAlt}</figcaption></figure>
      <div className="content-wrap article-layout">
        <nav aria-label="文章目錄" className="article-toc"><p className="font-bold text-primary">本文內容</p><ol className="">{a.sections.map((s,i)=><li key={s.heading}><a href={withBasePath("#section-"+i)} className="">{s.heading}</a></li>)}</ol></nav><div className="article-copy">
        {a.sections.map((s,i)=><section key={s.heading} id={"section-"+i} className="article-section">
          <h2 >{s.heading}</h2>
          {s.paragraphs.map((p,j)=><p  key={j}>{p}</p>)}
          {i===1?<figure className="article-diagram"><img src={withBasePath(a.diagramImage)} alt={a.diagram.title+"；"+a.diagram.items.map(item=>item.label+"："+item.detail).join("；")} width={640} height={660} loading="lazy" className="mx-auto w-full max-w-[560px]"/><figcaption className="mt-4 font-sans text-sm leading-7 text-muted-foreground">{a.diagram.title}。{a.diagram.items.map(item=>item.label+"："+item.detail).join("；")}。</figcaption></figure>:null}
        </section>)}
        <aside className="article-references"><h2 className="font-serif text-xl font-bold text-primary">資料與延伸閱讀</h2><ul className="mt-4 space-y-3">{a.references.map(r=><li key={r.url}><a className="text-link text-sm" href={withBasePath(r.url)} target="_blank" rel="noreferrer">{r.title}</a></li>)}</ul></aside></div>
      </div>
    </article>
    <section className="section-band border-t bg-card/50"><div className="content-wrap max-w-5xl"><h2 className="font-serif text-3xl font-bold text-primary">沿着這個題目，繼續讀</h2><div className="mt-7 grid gap-7 md:grid-cols-3">{relatedArticles(a).map(r=><article key={r.slug}><h3 className="font-serif text-xl font-bold leading-relaxed text-primary"><Link className="hover:underline underline-offset-4" href={"/journal/"+r.slug}>{r.title}</Link></h3><p className="mt-3 font-sans text-sm leading-7 text-muted-foreground">{r.intro}</p></article>)}</div>
    <nav className="mt-10 grid gap-4 border-t pt-6 font-sans md:grid-cols-2" aria-label="上一篇與下一篇">{previous?<Link className="text-link" href={"/journal/"+previous.slug}>上一篇：{previous.title}</Link>:<Link className="text-link" href="/journal">返回全部文章</Link>}{next?<Link className="text-link md:text-right" href={"/journal/"+next.slug}>下一篇：{next.title}</Link>:<Link className="text-link md:text-right" href="/journal">返回全部文章</Link>}</nav>
    </div></section>
  </>
}

