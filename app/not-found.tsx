import Link from "next/link"
import { CjkText } from "@/components/site/page-shell"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return <section className="section-band"><div className="content-wrap max-w-3xl"><p className="font-sans text-sm font-bold text-accent">404</p><h1 className="mt-3 font-serif text-4xl font-bold text-primary">找不到這個頁面</h1><p className="mt-4 font-sans leading-8 text-muted-foreground"><CjkText text="網址可能已更改，或這筆人物、報告尚未收錄。你可以返回首頁、人物索引，或用全站搜尋找相近內容。" /></p><div className="mt-6 flex flex-wrap gap-3"><Button asChild><Link href="/">返回首頁</Link></Button><Button asChild variant="outline"><Link href="/masters">人物索引</Link></Button><Button asChild variant="outline"><Link href="/search">搜尋全站</Link></Button></div></div></section>
}
