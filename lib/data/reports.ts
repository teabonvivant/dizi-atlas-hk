import legacyBundle from "@/data/generated/legacy_pages.json"
import reportBundle from "@/data/generated/research_reports.json"
import { recordFrom, stringField } from "@/lib/data/parse"
import type { ResearchReport } from "@/lib/data/types"

type ReportWithHtml = ResearchReport & Readonly<{ html: string }>

function parseReport(value: unknown): ReportWithHtml {
  const row = recordFrom(value, "research report")
  return { id: stringField(row, "id"), title: stringField(row, "title"), question: stringField(row, "question"), route: stringField(row, "route"), textPreview: stringField(row, "textPreview"), html: stringField(row, "html") }
}

const reports = reportBundle.map(parseReport)
const legacyPages = recordFrom(legacyBundle, "legacy pages")

function polishReportCopy(value: string): string {
  return value
    .replaceAll("教授導讀", "編輯導讀")
    .replaceAll("我常對學生說：", "課堂上可以這樣理解：")
    .replaceAll(
      "馮子存是20世紀中國竹笛從戲曲、民間伴奏走向專業獨奏舞台的關鍵人物，尤其以《喜相逢》奠定北派梆笛獨奏的里程碑地位。",
      "馮子存是二十世紀竹笛獨奏發展的重要人物之一。《喜相逢》是其代表作，也是北派梆笛的重要曲目。"
    )
}

export function getReports(): ResearchReport[] {
  return reports.map(({ id, title, question, route, textPreview }) => ({ id, title, question, route, textPreview: polishReportCopy(textPreview) }))
}
export function getReport(id: string): ResearchReport | undefined { return getReports().find((report) => report.id === id) }
export function getReportHtml(id: string): string { return polishReportCopy(reports.find((report) => report.id === id)?.html ?? "") }
export function getLegacyPageHtml(slug: string): string {
  const value = legacyPages[slug === "home" ? "home" : slug]
  return typeof value === "string" ? value : ""
}
