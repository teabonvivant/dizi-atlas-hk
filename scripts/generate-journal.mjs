import fs from "node:fs";
import path from "node:path";
const root=process.cwd();
const categories=[
 ["beginning","初識竹笛","認識樂器、選笛與第一堂課","晨光下的一支竹笛與練習筆記。"],
 ["breath","氣息與音色","從起音到句尾，讓聲音安定","橫持竹笛的練習者，專注於一口平穩的氣。"],
 ["fingers","手指與吐音","把動作放回清楚的樂句","手指輕放在竹笛上，準備下一個音。"],
 ["rhythm","讀譜與節奏","讀懂符號，也聽清楚時間","竹笛與節拍器，陪伴每日讀譜練習。"],
 ["listening","聆聽筆記","由一個細節走進整首作品","竹笛、耳筒與筆記，留住聆聽的發現。"],
 ["repertoire","曲中風景","十首作品的細讀與導聽","江南水岸的遠景，為旋律留一片想像。"],
 ["culture","竹笛文化","流派、合奏與樂器的來路","靜候演奏的竹笛與傳統室內空間。"],
 ["care","養笛日常","笛膜、清潔、收納與外出","竹笛、軟布與笛膜，放在乾淨的桌面。"],
 ["study","練習手記","讓有限時間有清楚的方向","夜燈下的竹笛和筆記本，記下今天的一小步。"],
 ["stage","走上舞台","從第一次排練到演出回顧","演出前的空舞台，竹笛安放在座椅上。"],
].map(([slug,title,description,caption])=>({slug,title,description,caption,image:"/images/editorial/"+slug+".webp"}));
const references={
 library:{title:"兩廳院表演藝術圖書館｜竹笛錄音館藏",url:"https://webpac.npac-ntch.org/detail/257460/?seq=1"},
 met:{title:"大都會藝術博物館｜Dizi 藏品與構造",url:"https://www.metmuseum.org/art/collection/search/500635"},
 hkco:{title:"香港中樂團｜中國吹管樂器",url:"https://www.hkco.org/tc/Instrument-Rd/Chinese-Instruments/Wind-Instruments.html"},
 course:{title:"香港中樂團｜音樂課程與學習內容",url:"https://www.hkco.org/tc/Education/Music-Courses.html"},
 syllabus:{title:"音樂事務處｜笛子必修教材（2025年9月修訂）",url:"https://www.lcsd.gov.hk/en/mo/common/doc/faq/faq_01_syb_0301.pdf"},
 care:{title:"音樂事務處｜樂器選購及保養",url:"https://www.lcsd.gov.hk/tc/mo/faq/instrumentbuyingandmaintenance.html"},
 kunqu:{title:"UNESCO｜崑曲",url:"https://ich.unesco.org/en/RL/kun-qu-opera-00004"},
 winds:{title:"香港中樂團｜都市雀鳴——笛簫音樂會",url:"https://www.hkco.org/tc/Concerts/Chinese-Winds-Concert---Warbling-City-Birds.html"},
 tradition:{title:"香港中樂團｜The Allure of Tradition 節目",url:"https://ww2.hkco.org/en/Concerts/The-Allure-Of-Tradition.html"},
 ranges:{title:"香港中樂團｜吹管樂器音域與記譜資料",url:"https://4.hkco.org/uploads/docs/682542db204771.pdf"},
 excerpts:{title:"香港中樂團｜笛子專業級樂隊片段",url:"https://www.hkco.org/tc/Others/Dizi---Chinese-Orchestral-Music-Excerpt--Professional-Level.html"}
};
const specific={
 "dizi-and-xiao":["hkco"],"bamboo-map":["met"],"membrane-colour":["met"],"xi-xiang-feng":["winds"],"partridges":["tradition"],"gusu-walk":["library"],"horse-cart":["library"],"spring-xiangjiang":["library"],"herdsmen-song":["library"],"qinchuan":["winds"],"kunqu-flute":["kunqu","met"],"xindi":["hkco","ranges"],"small-flute":["hkco"],"after-playing":["care"],"orchestra-seat":["excerpts"]
};
const categoryRefs={beginning:["met","course"],breath:["course"],fingers:["syllabus"],rhythm:["course"],listening:["excerpts"],repertoire:["syllabus","winds"],culture:["hkco"],care:["care"],study:["course"],stage:["excerpts"]};
const articles=[];
for(const [index,file] of fs.readdirSync(path.join(root,"content/journal")).filter(x=>x.endsWith(".txt")).sort().entries()){
 const category=categories[index];
 const parts=fs.readFileSync(path.join(root,"content/journal",file),"utf8").split(/^@@ /m).filter(x=>x.trim());
 for(const part of parts){
  const lines=part.trim().split(/\r?\n/); const [slug,title]=lines.shift().split(" | ");
  let intro=[],sections=[],diagram; let current;
  for(const line of lines){
   if(line.startsWith("## ")){current={heading:line.slice(3),paragraphs:[]};sections.push(current)}
   else if(line.startsWith(">> ")){const [type,title,...items]=line.slice(3).split(" | ");diagram={type,title,items:items.map(x=>{const at=x.indexOf("：");return {label:x.slice(0,at),detail:x.slice(at+1)}})}}
   else if(line.trim()){(current?current.paragraphs:intro).push(line.trim())}
  }
  const body=[...intro,...sections.flatMap(s=>[s.heading,...s.paragraphs])].join("\n");
  const characters=[...body].filter(c=>/\p{Script=Han}/u.test(c)).length;
  if(!slug||!title||sections.length<3||!diagram||diagram.items.length!==4||characters<300) throw new Error("Incomplete article "+slug+" chars:"+characters);
  articles.push({number:articles.length+1,slug,title,category:category.slug,intro:intro.join("\n"),sections,diagram,characters,minutes:Math.max(3,Math.ceil(characters/240)),image:category.image,imageAlt:category.caption,diagramImage:"/images/journal/"+slug+".svg",references:(specific[slug]||categoryRefs[category.slug]).map(k=>references[k])});
 }
}
if(articles.length!==100||new Set(articles.map(a=>a.slug)).size!==100||new Set(articles.map(a=>a.title)).size!==100)throw new Error("Expected 100 unique articles");
const xml=s=>s.replace(/[<>&"]/g,x=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[x]));
function diagramSvg(a){
 const d=a.diagram;
 // These are editorial learning maps, not acoustic measurements or fingering schematics.
 const comparison=d.type==="comparison"; const rhythm=d.type==="rhythm";
 const cell=(item,i)=>{const y=122+i*120;return '<g><rect x="32" y="'+y+'" width="576" height="104" rx="8" fill="'+(i%2?"#f2eee4":"#fffdf6")+'" stroke="#b7bfae"/><text x="54" y="'+(y+39)+'" font-size="26" font-weight="700">'+xml(item.label)+'</text><text x="54" y="'+(y+77)+'" font-size="24" fill="#495642">'+xml(item.detail)+'</text>'+(comparison?'':('<path d="M320 '+(y+105)+' v12" stroke="#9d5548" stroke-width="2"/>'))+(rhythm?'<g fill="#9d5548">'+Array.from({length:4},(_,j)=>'<circle cx="'+(504+j*24)+'" cy="'+(y+32)+'" r="3"/>').join("")+'</g>':"")+'</g>'};
 const shapes=d.items.map(cell).join("");
 return '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="660" viewBox="0 0 640 660" role="img" aria-labelledby="title desc"><title id="title">'+xml(d.title)+'</title><desc id="desc">'+xml(d.items.map(i=>i.label+"："+i.detail).join("；"))+'</desc><rect width="640" height="660" fill="#e9eee3"/><g font-family="Microsoft JhengHei,PingFang TC,Noto Sans TC,sans-serif" fill="#274b36"><text x="32" y="62" font-size="30" font-weight="700">'+xml(d.title)+'</text><path d="M32 88 H608" stroke="#9ca88f"/>'+shapes+'<text x="32" y="637" font-size="18" fill="#53624b">中國竹笛知識庫 · '+xml(categories.find(c=>c.slug===a.category).title)+'</text></g></svg>';
}
fs.mkdirSync("public/images/journal",{recursive:true});fs.mkdirSync("data/generated",{recursive:true});
for(const a of articles)fs.writeFileSync("public"+a.diagramImage,diagramSvg(a));
fs.writeFileSync("data/generated/journal.json",JSON.stringify({categories,articles},null,2)+"\n");
console.log(JSON.stringify({articles:articles.length,categories:categories.length,uniqueDiagrams:articles.length,minCharacters:Math.min(...articles.map(a=>a.characters)),maxCharacters:Math.max(...articles.map(a=>a.characters)),totalCharacters:articles.reduce((sum,a)=>sum+a.characters,0)}));

