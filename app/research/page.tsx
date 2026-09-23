import type {Metadata} from "next"
import {Suspense} from "react"
import ResearchQuery,{ResearchContent} from "./query"
export const metadata:Metadata={title:"專題研究與200個選題",description:"十個竹笛專題，連接曲目、技法、歷史、教學、錄音、樂器與文化。",alternates:{canonical:"/research"}}
export default function Page(){return <Suspense fallback={<ResearchContent parameters={{}}/>}><ResearchQuery/></Suspense>;}
