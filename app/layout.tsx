import {withBasePath} from "@/lib/paths"
import type { Metadata } from "next"
import Script from "next/script"
import type { ReactNode } from "react"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import "./globals.css"

const enableDevTools = process.env.NODE_ENV === "development" && process.env["NEXT_PUBLIC_DISABLE_REACT_DEVTOOLS"] !== "1"

export const metadata: Metadata = {
  metadataBase: new URL("https://teabonvivant.github.io/dizi-atlas-hk"),
  title: { default: "中國竹笛知識庫 | Dizi Atlas", template: "%s | Dizi Atlas" },
  description: "一百篇竹笛札記、曲目導聽、五十位人物、演奏技法與研究資料，為香港讀者整理一張有聲音的竹笛地圖。",
  openGraph: { title: "Dizi Atlas | 中國竹笛學習地圖", description: "由一口氣、一個音，慢慢走進曲目、人物、技法與研究。", images: ["/images/home.png"] }
}

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return <html lang="zh-Hant-HK" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:'try{document.documentElement.classList.toggle("dark",localStorage.getItem("dizi-theme")==="dark")}catch(e){}'}}/><link rel="icon" href={withBasePath("/favicon.svg")} type="image/svg+xml" />{enableDevTools ? <Script src="https://unpkg.com/react-scan/dist/auto.global.js" crossOrigin="anonymous" strategy="lazyOnload" /> : null}{enableDevTools ? <Script src="//unpkg.com/react-grab/dist/index.global.js" crossOrigin="anonymous" strategy="beforeInteractive" /> : null}</head><body><a href={withBasePath("#main-content")} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-4 focus:py-2 focus:font-sans focus:font-bold focus:text-primary focus:shadow-soft">跳至主要內容</a><SiteHeader /><main id="main-content" tabIndex={-1}>{children}</main><SiteFooter /></body></html>
}
