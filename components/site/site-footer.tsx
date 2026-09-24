import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
const sections=[
 ["開始學習",[["新手入門","/start"],["技法聲音","/techniques"],["學習路線","/pedagogy"],["養笛指南","/care"]]],
 ["循着聲音閱讀",[["竹笛札記","/journal"],["曲目導聽","/repertoire"],["名家索引","/masters"],["竹笛辭典","/glossary"]]],
 ["資料與來源",[["專題研究","/research"],["流派與地域","/styles"],["樂器形制改良","/instruments"],["資料庫","/database"],["關於知識庫","/about"],["全站搜尋","/search"]]]
] as const
export function SiteFooter(){return <footer className="site-footer"><div className="content-wrap"><div className="footer-top"><div className="footer-intro"><Link href="/" className="footer-title">中國竹笛知識庫</Link><p>從一口氣、一個音開始，讀竹笛的來路，也聽它在今天的聲音。</p></div><div className="footer-navigation">{sections.map(([title,links])=><div key={title}><h2>{title}</h2><ul>{links.map(([label,href])=><li key={href}><Link href={href}>{label}<ArrowUpRight size={13} aria-hidden="true"/></Link></li>)}</ul></div>)}</div></div><Link className="footer-wordmark" href="/" aria-label="Dizi Atlas 首頁">DIZI ATLAS<span aria-hidden="true">.</span></Link><p className="footer-colophon">Dizi Atlas · 文字、圖解與聆聽之間的一張竹笛地圖。</p></div></footer>}

