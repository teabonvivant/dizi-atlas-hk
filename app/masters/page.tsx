import type {Metadata} from "next"
import {Suspense} from "react"
import MastersQuery,{MastersContent} from "./query"
export const metadata = {"title":"名家索引","description":"認識五十位竹笛演奏家及教育工作者，循作品、教學與地域風格閱讀人物資料。","alternates":{"canonical":"https://teabonvivant.github.io/dizi-atlas-hk/masters"}}
export default function Page(){return <Suspense fallback={<MastersContent parameters={{}}/>}><MastersQuery/></Suspense>;}
