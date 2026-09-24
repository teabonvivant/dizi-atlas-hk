import {withBasePath} from "@/lib/paths"
import Link from "next/link"
import type { DataRow } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { truncate } from "@/lib/utils"

type DataTableProps = {
  readonly rows: readonly DataRow[]
  readonly columns: readonly string[]
  readonly linkColumn?: string
  readonly linkBase?: string
  readonly caption?: string
}

const preferredTitleColumns = ["name", "title", "topic", "name_zh", "name_en"] as const

const columnLabels: Readonly<Record<string, string>> = {
  id: "編號",
  number: "編號",
  name: "名稱",
  name_zh: "中文名",
  name_en: "英文名",
  title: "曲目／題名",
  creator: "創作者",
  category: "分類",
  description: "說明",
  summary: "摘要",
  people: "相關人物",
  works: "相關曲目",
  research: "研究方向",
  topic: "研究題目",
  section: "主題分類",
  type: "類型",
  style: "風格／流派",
  status: "資料狀態",
  birth_death: "生卒年",
  region: "地域",
  roles: "身份",
  institution: "機構",
  priority: "優先級",
  source: "來源",
  url: "來源連結",
  purpose: "改良方向",
  detail: "資料說明",
  features: "聲音特徵",
  year: "年份",
  event: "事件",
  author: "作者",
  performer: "演奏者",
  work: "作品"
}

export function DataTable({
  rows,
  columns,
  linkColumn,
  linkBase,
  caption = "資料表"
}: DataTableProps) {
  if (rows.length === 0) {
    return <p className="rounded-md border border-dashed bg-card p-5 font-sans text-sm text-muted-foreground" role="status">{caption}目前沒有相符資料，可返回上方查看其他內容。</p>
  }

  return (
    <>
      <div className="grid min-w-0 gap-3 lg:hidden" role="list" aria-label={`${caption}，共 ${rows.length} 筆`}>
        {rows.map((row, rowIndex) => {
          const rowKey = getRowKey(row, columns, rowIndex)
          const titleColumn = getTitleColumn(row, columns)
          const title = truncate(row[titleColumn] || `第 ${rowIndex + 1} 筆資料`, 80)
          return (
            <div key={rowKey} className="min-w-0" role="listitem">
              <details className="group min-w-0 overflow-hidden rounded-md border bg-card shadow-line">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 font-sans marker:content-none">
                  <span className="min-w-0">
                    <span className="block text-xs font-bold tracking-wide text-muted-foreground">{row["id"] || caption}</span>
                    <span className="mt-1 block break-words font-serif text-lg font-semibold leading-6 text-primary">{title}</span>
                  </span>
                  <span className="shrink-0 text-xs font-bold text-accent group-open:hidden">查看</span>
                  <span className="hidden shrink-0 text-xs font-bold text-accent group-open:inline">收起</span>
                </summary>
                <dl className="grid min-w-0 gap-0 border-t bg-muted/20 font-sans">
                  {columns.filter(column => !["status","priority"].includes(column)).map((column) => (
                    <div key={column} className="grid min-w-0 gap-1 border-b px-4 py-3 last:border-b-0 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-3">
                      <dt className="text-xs font-bold text-primary">{labelFor(column)}</dt>
                      <dd className="min-w-0 break-words text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
                        {renderValue(row, column, linkColumn, linkBase)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </details>
            </div>
          )
        })}
      </div>

      <div className="hidden min-w-0 max-w-full overflow-hidden lg:block">
        <Table aria-label={`${caption}，共 ${rows.length} 筆`}>
          <caption className="sr-only">{caption}，共 {rows.length} 筆。表格可左右捲動。</caption>
          <TableHeader>
            <TableRow>
              {columns.filter(column => !["status","priority"].includes(column)).map((column) => (
                <TableHead key={column} scope="col">{labelFor(column)}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={getRowKey(row, columns, rowIndex)}>
                {columns.filter(column => !["status","priority"].includes(column)).map((column) => (
                  <TableCell key={column}>{renderValue(row, column, linkColumn, linkBase)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

function getRowKey(row: DataRow, columns: readonly string[], rowIndex: number): string {
  return row["id"] || `${rowIndex}-${columns.map((column) => row[column] ?? "").join("-")}`
}

function labelFor(column: string): string {
  return columnLabels[column] ?? column.replaceAll("_", " ")
}

function getTitleColumn(row: DataRow, columns: readonly string[]): string {
  return preferredTitleColumns.find((column) => columns.includes(column) && row[column])
    ?? columns.find((column) => row[column] && column !== "id")
    ?? columns[0]
    ?? "id"
}

function renderValue(row: DataRow, column: string, linkColumn?: string, linkBase?: string) {
  const value = row[column] ?? ""
  const content = value || "—"
  const rowId = row["id"]
  const autoBase = rowId?.startsWith("REP-") && column === "title" ? "/repertoire" : rowId?.startsWith("TEC-") && column === "name" ? "/techniques" : undefined
  const targetBase = autoBase || (linkColumn === column ? linkBase : undefined)
  if ((column === "source" || column === "url") && /^https:\/\//.test(value)) return <a href={withBasePath(value)} target="_blank" rel="noreferrer" className="text-link">閱讀來源</a>
  const shouldLink = targetBase && rowId && value
  return shouldLink ? (
    <Link href={targetBase+"/"+rowId} className="font-bold text-accent underline decoration-accent/30 underline-offset-4">
      {content}
    </Link>
  ) : content
}
