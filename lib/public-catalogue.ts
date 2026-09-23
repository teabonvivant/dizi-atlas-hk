import type { DiziMaster, RepertoireItem } from "@/lib/data/types"
const internal = /待查|待補|待核|待用|待考|待擴|需查|需核|未詳|不詳|未註明|線索|整理中|待確認/
export function cleanField(value:string):string { return internal.test(value) ? "" : value.trim() }
export function publicMaster(person:DiziMaster):DiziMaster{
 const confirmed:Record<string,Partial<DiziMaster>>={
  "PER-0004":{summary:"趙松庭的竹笛實踐連接演奏、教學、理論與樂器探索。《早晨》《幽蘭逢春》等作品，是理解其樂句組織與風格處理的入口。",sources:["https://www.zjvaa.edu.cn/xwzx/xwzx-zyyw/202509/14154.html",...person.sources]},
  "PER-0022":{summary:"戴亞是竹笛演奏家、教育家，任教中央音樂學院。其工作包括八孔笛研製與教材，以及竹笛協奏曲的委約和首演。",institution:"中央音樂學院",sources:["https://www.ccom.edu.cn/info/16531/222341.htm"]},
  "PER-0025":{summary:"唐俊喬是竹笛演奏家、教育家，任教上海音樂學院。她的演出與教學涉及傳統曲目、當代協奏曲和竹笛樂團，並參與民族器樂劇《笛韻天籟》。",institution:"上海音樂學院",sources:["https://www.shcmusic.edu.cn/2014/0604/c1627a22826/page.htm"]},
  "PER-0047":{summary:"楊偉傑的工作結合竹笛演奏、民族音樂研究與教學，亦參與廣東音樂的創作及演出。其作品《粵竹》《詩鄉》與「聽粵」錄音，提供了認識地域聲音的入口。",institution:"香港中文大學（深圳）音樂學院",sources:["https://music.cuhk.edu.cn/faculty/ricky-yeung-wai-kit"]},
  "PER-0048":{summary:"陳子旭於2004年加入香港中樂團，2017年起擔任笛子助理首席，亦在香港演藝學院教授笛子。他的演奏經驗涵蓋樂團、獨奏、舞台與錄音工作。",institution:"香港中樂團、香港演藝學院",sources:["https://www.hkco.org/tc/Other-Members/Chan-Chi-Yuk.html"]},
  "PER-0050":{summary:"孫永志於1997年加入香港中樂團並擔任笛子首席，亦從事竹笛教學、教材編寫與研究。他的演出曲目包括《陝北四章》《巴楚風情》《蒼》等協奏曲。",institution:"香港中樂團、香港演藝學院",sources:["https://www.hkco.org/tc/Other-Members/Sun-Yongzhi.html"]}
 }
 const p={...person,...confirmed[person.id]}
 return {...p,birth_death:cleanField(p.birth_death),region:cleanField(p.region),institution:cleanField(p.institution),style:cleanField(p.style),roles:cleanField(p.roles).replace(/宗師/g,"演奏家"),priority:"",summary:p.summary.replace(/宗師/g,"演奏家").replace(/中國首位竹笛女博士、|中國首位竹笛表演藝術博士，|趙松庭關門弟子之一，|首位獲文華獎竹笛青年專業組金獎的女性演奏家之一。/g,"").replace(/標誌性人物|核心人物之一|重要建設者/g,"代表人物").replace(/嫡傳弟子/g,"學生").replace(/[，；]$/, "。"),works:p.works.filter(x=>cleanField(x)),sources:p.sources.filter(s=>/^https:\/\//.test(s)&&!s.includes("wikipedia"))}
}
export const catalogueSources:Record<string,{title:string;url:string}[]>={
 "REP-0010":[{title:"香港中樂團《The Allure of Tradition》節目",url:"https://ww2.hkco.org/en/Concerts/The-Allure-Of-Tradition.html"}],
 "REP-0029":[{title:"兩廳院表演藝術圖書館：竹笛錄音館藏",url:"https://webpac.npac-ntch.org/detail/257460/?seq=1"}],
 "REP-0101":[{title:"兩廳院表演藝術圖書館：竹笛錄音館藏",url:"https://webpac.npac-ntch.org/detail/257460/?seq=1"}],
 "REP-0102":[{title:"兩廳院表演藝術圖書館：竹笛錄音館藏",url:"https://webpac.npac-ntch.org/detail/257460/?seq=1"}],
 "REP-0103":[{title:"兩廳院表演藝術圖書館：竹笛錄音館藏",url:"https://webpac.npac-ntch.org/detail/257460/?seq=1"}]
}
export function publicRepertoire(item:RepertoireItem):RepertoireItem {
 const corrections:Record<string,Partial<RepertoireItem>>={
  "REP-0010":{creator:"古曲；陸春齡、趙松庭等不同整理與改編版本"},
  "REP-0014":{creator:"陸春齡改編版本",people:"陸春齡"},
  "REP-0029":{creator:"簡廣易、王志偉"},
  "REP-0073":{creator:"",type:"民族器樂劇"},
  "REP-0097":{creator:"",type:"協奏曲專場"},
 }
 const p={...item,...corrections[item.id]}
 const unconfirmed=item.status.includes("需查證")
 if(unconfirmed && !corrections[item.id]){p.creator="";p.people=""}
 if(/^REP-00(5[7-9]|60|61|62)$/.test(item.id)){p.people="戴亞";p.type="笛子與樂隊";if(item.id==="REP-0061"||item.id==="REP-0062")p.creator="戴亞"}
 if(/^REP-008[7-9]$|^REP-009[01]$/.test(item.id)){p.creator=item.creator;p.people="孫永志"}
 // Drop the entire unconfirmed attribution, never just its uncertainty marker.
 return {...p,creator:cleanField(p.creator),style:cleanField(p.style),people:cleanField(p.people),status:""}
}
export const addedRepertoire:RepertoireItem[]=[
 {id:"REP-0101",title:"姑蘇行",creator:"江先渭",people:"江先渭",type:"竹笛獨奏",style:"江南",status:""},
 {id:"REP-0102",title:"揚鞭催馬運糧忙",creator:"魏顯忠",people:"魏顯忠",type:"竹笛獨奏",style:"北方風格",status:""},
 {id:"REP-0103",title:"春到湘江",creator:"寧保生",people:"寧保生",type:"竹笛獨奏",style:"湖南題材",status:""}
]

