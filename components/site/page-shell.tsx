import {withBasePath} from "@/lib/paths"
import Image from "next/image"
import Link from "next/link"
import { type ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { journalCategories } from "@/lib/journal"
const imageMap:Record<string,string>={home:"beginning",learn:"beginning",instrument:"beginning",listen:"listening",practice:"fingers",research:"study",culture:"culture",performance:"stage"}
export function PageHero({title,description,image="home",actions,imageAlt=""}:{readonly label:string;readonly title:ReactNode;readonly description:string;readonly image?:string;readonly imageAlt?:string;readonly actions?:ReactNode}){
 const key=imageMap[image]||image
 const entry=journalCategories.find(c=>c.slug===key)||journalCategories[0]!
 return <section className="page-hero"><div className="content-wrap page-hero-grid"><div className="page-hero-copy"><h1>{title}</h1><p>{description}</p>{actions?<div className="hero-actions">{actions}</div>:null}</div><figure className="page-hero-image"><Image src={withBasePath(entry.image)} alt={imageAlt||entry.caption} width={1200} height={800} priority unoptimized className="w-full object-cover"/></figure></div></section>
}
export function PhraseTitle({parts}:{readonly parts:readonly string[]}){return <>{parts.join("")}</>}
export function CjkText({text}:{readonly text:string;readonly phrases?:readonly string[];readonly maxChars?:number}){return <>{text}</>}
export function Breadcrumbs({items}:{readonly items:readonly Readonly<{label:string;href?:string}>[]}){return <nav className="content-wrap breadcrumbs" aria-label="頁面位置"><ol>{items.map((item,index)=><li key={item.label}>{index>0?<span aria-hidden="true" className="breadcrumb-slash">/</span>:null}{item.href?<Link href={item.href}>{item.label}</Link>:<span aria-current="page">{item.label}</span>}</li>)}</ol></nav>}
export function SectionHeader({title,children,className}:{readonly label?:string;readonly title:string;readonly children?:ReactNode;readonly className?:string}){return <div className={cn("section-heading",className)}><h2>{title}</h2>{children?<div className="section-description">{children}</div>:null}</div>}
export function KnowledgeCard({title,description,href,linkLabel,className}:{readonly title:string;readonly description:string;readonly href?:string;readonly linkLabel?:string;readonly meta?:string;readonly className?:string}){return <article className={cn("knowledge-item",className)}><h3>{title}</h3><p>{description}</p>{href&&linkLabel?<Link href={href} className="text-link">{linkLabel}<ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true"/></Link>:null}</article>}
export function ProseBlock({children,className}:{readonly children:ReactNode;readonly className?:string}){return <div className={cn("reader-measure font-sans text-base leading-8 text-muted-foreground",className)}>{children}</div>}

