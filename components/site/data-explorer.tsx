"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { DataTable } from "@/components/site/data-table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { DataRow } from "@/lib/data"
import { includesSearch } from "@/lib/utils"

type DataSet = Readonly<{ slug: string; title: string; description: string; columns: readonly string[]; rows: readonly DataRow[] }>

export function DataExplorer({ sets }: { readonly sets: readonly DataSet[] }) {
  const [query, setQuery] = useState("")
  const defaultSet = sets[0]?.slug ?? ""
  const filteredSets = useMemo(() => sets.map((set) => ({ ...set, rows: set.rows.filter((row) => includesSearch(Object.values(row).join(" "), query)) })), [query, sets])
  const total = filteredSets.reduce((sum, set) => sum + set.rows.length, 0)
  return (
    <section id="search" className="section-band"><div className="content-wrap">
      <div className="mb-6 max-w-3xl"><h2 className="mt-4 font-serif text-3xl font-bold text-primary">搜尋資料與來源</h2><p className="mt-3 font-sans leading-7 text-muted-foreground">輸入關鍵字後，各個分類會顯示相符筆數。選擇分類即可閱讀內容，或開啟詳情與來源。</p></div>
      <label className="mb-3 grid max-w-xl gap-2 font-sans text-sm font-bold text-primary" htmlFor="site-data-search">搜尋資料庫<span className="relative block"><Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" aria-hidden="true" /><Input id="site-data-search" name="site-data-search" type="search" autoComplete="off" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="例如：馮子存、喜相逢、循環換氣" className="pl-9" /></span></label>
      <p className="mb-6 font-sans text-sm text-muted-foreground" role="status" aria-live="polite">目前共有 {total} 筆相符資料。</p>
      <Tabs defaultValue={defaultSet}><TabsList aria-label="資料表分類">{filteredSets.map((set) => <TabsTrigger key={set.slug} value={set.slug}>{set.title} · {set.rows.length}</TabsTrigger>)}</TabsList>
        {filteredSets.map((set) => <TabsContent key={set.slug} value={set.slug}><div className="mb-4 flex flex-wrap items-center gap-3 font-sans"><Badge variant="secondary">{set.rows.length} 筆資料</Badge><p className="text-sm leading-6 text-muted-foreground">{set.description}</p></div>{set.rows.length > 0 ? set.slug === "masters" ? <DataTable rows={set.rows} columns={set.columns} linkColumn="name" linkBase="/masters" caption={set.title} /> : <DataTable rows={set.rows} columns={set.columns} caption={set.title} /> : <div className="rounded-md border border-dashed bg-card p-6 font-sans text-muted-foreground">這一類暫時沒有相符資料。可縮短關鍵字，或切換其他分類。</div>}</TabsContent>)}
      </Tabs>
    </div></section>
  )
}
