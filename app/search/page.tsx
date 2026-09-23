import type {Metadata} from "next"
import {Suspense} from "react"
import SearchQuery,{SearchContent} from "./query"
export const metadata:Metadata={title:"全站搜尋",description:"搜尋竹笛文章、曲目、人物、技法、術語和研究資料。",robots:{index:false,follow:true}}
export default function Page(){return <Suspense fallback={<SearchContent parameters={{}}/>}><SearchQuery/></Suspense>;}
