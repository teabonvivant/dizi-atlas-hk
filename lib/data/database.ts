import { getLiterature,getMasters,getMedia,getRepertoire,getTechniques,getStyleRegions,getTimeline } from "@/lib/data/source"
import {resources} from "@/lib/resources"
import type {DatabaseSet} from "@/lib/data/types"
export function getDatabaseSets():readonly DatabaseSet[]{return [
 {slug:"masters",title:"人物",description:"由人物連到作品、演奏風格與來源。",columns:["id","name","birth_death","style","summary"],rows:getMasters().map(({id,name,birth_death,style,summary})=>({id,name,birth_death,style,summary}))},
 {slug:"repertoire",title:"曲目",description:"按作品及演出名稱尋找導聽、人物和版本資料。",columns:["id","title","creator","type","style"],rows:getRepertoire().map(({id,title,creator,type,style})=>({id,title,creator,type,style}))},
 {slug:"techniques",title:"技法",description:"由技法名稱閱讀動作、練法與聆聽目標。",columns:["id","name","category","description","works"],rows:getTechniques().map(({id,name,category,description,works})=>({id,name,category,description,works}))},
 {slug:"literature",title:"文獻",description:"文章、出版與研究資源，附來源連結。",columns:["title","author","type","topic","source"],rows:getLiterature().map(({title,author,type,topic,source})=>({title,author,type,topic,source}))},
 {slug:"media",title:"影音",description:"按演奏者及作品，尋找錄音與演出資料。",columns:["title","performer","work","type","source"],rows:getMedia().map(({title,performer,work,type,source})=>({title,performer,work,type,source}))},
 {slug:"styles",title:"流派與地域",description:"從聲音特徵認識地方音樂、樂器和舞台表達。",columns:["name","features","works","research"],rows:getStyleRegions().map(({name,features,works,research})=>({name,features,works,research}))},
 {slug:"timeline",title:"年表",description:"按年份閱讀人物與事件。",columns:["year","event","people","topic"],rows:getTimeline().map(({year,event,people,topic})=>({year,event,people,topic}))},
 {slug:"resources",title:"公共資源",description:"博物館、樂團、課程與聲學資料。",columns:["title","description","source"],rows:resources.map(r=>({title:r.title,description:r.description,source:r.url}))}
]}

