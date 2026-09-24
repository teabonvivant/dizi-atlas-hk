import type {Metadata} from "next"
import Link from "next/link"
import {DataExplorer} from "@/components/site/data-explorer"
import {PageHero} from "@/components/site/page-shell"
import {Button} from "@/components/ui/button"
import {getDatabaseSets} from "@/lib/data"
export const metadata:Metadata={title:"竹笛資料庫",description:"搜尋人物、曲目、技法、文獻、影音、流派、樂器改良與年表，並閱讀原始來源。",alternates:{canonical:"/database"}}
export default function DatabasePage(){return <><PageHero label="資料庫" title="把人物、作品與資料連在一起" description="從一個名字或曲名開始，在九組資料中交叉閱讀。人物、曲目和技法可以直達詳情，樂器改良、文獻與影音均附來源線索。" image="study" actions={<Button asChild variant="outline"><Link href="/about#sources">認識主要資料來源</Link></Button>}/><DataExplorer sets={getDatabaseSets()}/></>}

