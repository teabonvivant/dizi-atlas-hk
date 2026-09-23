import type {Metadata} from "next"
import {Suspense} from "react"
import JournalQuery,{JournalContent} from "./query"
export const metadata:Metadata={title:"竹笛札記｜100篇學習與聆聽文章",description:"從第一口氣到走上舞台，一百篇關於中國竹笛的文章。每篇附主題插畫與學習圖解。",alternates:{canonical:"/journal/"}}
export default function Page(){return <Suspense fallback={<JournalContent parameters={{}}/>}><JournalQuery/></Suspense>;}
