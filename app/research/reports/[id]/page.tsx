import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { LegacyArticle } from "@/components/site/legacy-article"
import { Breadcrumbs, PageHero } from "@/components/site/page-shell"
import { Button } from "@/components/ui/button"
import { getReport, getReportHtml, getReports } from "@/lib/data"

type ReportPageProps = {
  readonly params: Promise<{
    readonly id: string
  }>
}

export function generateStaticParams() {
  return getReports().map((report) => ({ id: report.id }))
}

export async function generateMetadata({ params }: ReportPageProps): Promise<Metadata> {
  const { id } = await params
  const report = getReport(id)
  if (!report) {
    return { title: "研究報告未找到" }
  }
  return {
    title: `${report.title} | 研究報告`,
    description: report.question
  }
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params
  const report = getReport(id)
  if (!report) {
    notFound()
    return null
  }

  const html = getReportHtml(id)

  return (
    <>
      <Breadcrumbs items={[{ label: "首頁", href: "/" }, { label: "研究報告", href: "/research" }, { label: report.title }]} />
      <PageHero
        label={`${report.id} 研究報告`}
        title={report.title}
        description={report.question}
        image="research"
        actions={
          <>
            <Button asChild variant="outline">
              <Link href="/research">返回研究索引</Link>
            </Button>
            <Button asChild>
              <Link href="/database#search">查相關資料</Link>
            </Button>
          </>
        }
      />
      <section className="section-band bg-card/45">
        <div className="content-wrap max-w-4xl">
          <LegacyArticle html={html} />
        </div>
      </section>
    </>
  )
}
