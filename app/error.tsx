"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ErrorPage({ reset }: { readonly reset: () => void }) {
  return <section className="section-band"><div className="content-wrap max-w-3xl"><p className="font-sans text-sm font-bold text-accent">頁面暫時未能載入</p><h1 className="mt-3 font-serif text-4xl font-bold text-primary">資料沒有消失，可以再試一次</h1><p className="mt-4 font-sans leading-8 text-muted-foreground">這可能是短暫連線問題。重新載入不會改動任何資料；亦可先返回首頁或全站搜尋。</p><div className="mt-6 flex flex-wrap gap-3"><Button type="button" onClick={reset}>再試一次</Button><Button asChild variant="outline"><Link href="/">返回首頁</Link></Button><Button asChild variant="outline"><Link href="/search">搜尋全站</Link></Button></div></div></section>
}
