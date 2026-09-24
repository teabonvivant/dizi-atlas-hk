"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { Menu, Search, X, ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
const groups: {label:string;href?:string;links?:[string,string][]}[] = [
 {label:"入門與練習",links:[["新手入門","/start"],["技法聲音","/techniques"],["學習路線","/pedagogy"],["養笛指南","/care"],["竹笛辭典","/glossary"]]},
 {label:"曲目導聽",href:"/repertoire"},
 {label:"名家索引",href:"/masters"},
 {label:"竹笛札記",href:"/journal"},
 {label:"研究與資料",links:[["專題研究","/research"],["流派與地域","/styles"],["樂器形制改良","/instruments"],["資料庫","/database"],["關於知識庫","/about"]]}
]
const current=(path:string,href:string)=>path===href||path.startsWith(href+"/")
export function SiteHeader(){
 const pathname=usePathname()
 const [open,setOpen]=useState(false)
 const [dropdown,setDropdown]=useState<string|null>(null)
 const root=useRef<HTMLElement>(null)
 const toggle=useRef<HTMLButtonElement>(null)
 useEffect(()=>{setOpen(false);setDropdown(null)},[pathname])
 useEffect(()=>{
  const outside=(e:MouseEvent)=>{if(root.current&&!root.current.contains(e.target as Node)){setOpen(false);setDropdown(null)}}
  const escape=(e:KeyboardEvent)=>{if(e.key==="Escape"){setOpen(false);setDropdown(null);if(open)toggle.current?.focus()}}
  document.addEventListener("click",outside);document.addEventListener("keydown",escape)
  return()=>{document.removeEventListener("click",outside);document.removeEventListener("keydown",escape)}
 },[open])
 const close=()=>{setOpen(false);setDropdown(null)}
 return <header ref={root} className={"site-header"+(pathname==="/"? " site-header-home":"")+(open?" menu-is-open":"")}>
  <div className="content-wrap header-inner">
   <Link href="/" onClick={close} aria-label="中國竹笛知識庫首頁" className="site-brand">{pathname==="/"?<span className="brand-seal" aria-hidden="true">竹笛</span>:null}<strong>中國竹笛知識庫</strong><span>DIZI ATLAS</span></Link>
   <nav className="hidden items-center gap-1 xl:flex" aria-label="主選單">{groups.map(g=><div key={g.label} className="relative">{g.href?<Link onClick={close} className={"nav-link "+(current(pathname,g.href)?"active":"")} aria-current={current(pathname,g.href)?"page":undefined} href={g.href}>{g.label}</Link>:<>
    <button type="button" className={"nav-link "+(g.links?.some(([,href])=>current(pathname,href))?"active":"")} aria-expanded={dropdown===g.label} aria-controls={"nav-"+(g.label==="入門與練習"?"learn":"research")} onClick={()=>setDropdown(dropdown===g.label?null:g.label)}>{g.label}<ChevronDown size={15} aria-hidden="true"/></button>
    {dropdown===g.label?<div id={"nav-"+(g.label==="入門與練習"?"learn":"research")} className="nav-dropdown">{g.links?.map(([label,href])=><Link key={href} href={href} onClick={close} aria-current={current(pathname,href)?"page":undefined} className="">{label}</Link>)}</div>:null}
   </>}</div>)}</nav>
   <div className="header-actions"><ThemeToggle/><Link href="/search" onClick={close} className="header-icon" aria-label="搜尋全站"><Search size={18} aria-hidden="true"/></Link>
   <button ref={toggle} type="button" className="header-icon header-menu-toggle xl:hidden" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?"關閉選單":"開啟選單"} onClick={()=>setOpen(!open)}>{open?<X size={22} aria-hidden="true"/>:<Menu size={22} aria-hidden="true"/>}</button></div>
  </div>
  {open?<nav id="mobile-navigation" aria-label="手機版主選單" className="mobile-menu xl:hidden"><div className="content-wrap grid gap-4 py-5 sm:grid-cols-2">{groups.map(g=><div key={g.label} className="mobile-menu-group">{g.href?<Link className="mobile-nav-link" href={g.href} onClick={close} aria-current={current(pathname,g.href)?"page":undefined}>{g.label}</Link>:<><p className="px-3 pb-2 font-sans text-sm text-muted-foreground">{g.label}</p>{g.links?.map(([label,href])=><Link key={href} href={href} className="mobile-nav-link" aria-current={current(pathname,href)?"page":undefined} onClick={close}>{label}</Link>)}</>}</div>)}</div></nav>:null}
 </header>
}

