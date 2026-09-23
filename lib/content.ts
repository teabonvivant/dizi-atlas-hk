import type { DiziMaster, RepertoireItem, StyleRegion, Technique } from "@/lib/data"
import { findRepertoireProfessorGuide, findTechniqueProfessorGuide } from "@/lib/professor-guides"
import { splitValues, truncate } from "@/lib/utils"

export type LearningStage = Readonly<{
  title: string
  time: string
  goal: string
  soundTarget: string
  listen: string[]
  practice: string[]
  evidence: string
  teacherCheck: string
}>

export const learningStages: readonly LearningStage[] = [
  {
    title: "第一階段：聽見竹笛的性格",
    time: "第1至2週",
    goal: "分清梆笛、曲笛、笛膜聲、北派與南派的基本差異。",
    soundTarget: "能用自己的話分辨膜聲、音芯、音區和句法，不把明亮或圓潤當成唯一標準。",
    listen: ["喜相逢", "鷓鴣飛", "蔭中鳥"],
    practice: ["認識笛膜鬆緊", "用短句聽音色明暗", "不要急着練快"],
    evidence: "交一張三首曲的聽辨表，每首各寫音色、氣口和一項技法，不寫『好聽』作結論。",
    teacherCheck: "學生能否把可聽見的差異與地域標籤分開，並承認錄音條件造成的限制。"
  },
  {
    title: "第二階段：把氣、舌、指分開練",
    time: "第3至6週",
    goal: "建立穩定發音、單吐與基本指法，不用技巧掩蓋音準問題。",
    soundTarget: "舒適中音可連續三次輕鬆起音，慢速換指沒有漏孔，單吐後音芯仍然完整。",
    listen: ["五梆子", "歡樂歌", "早晨"],
    practice: ["長音保持音芯", "單吐不破壞音色", "慢速換指不抬高手指"],
    evidence: "錄下低、中、高音各三個長音，以及一段連奏與單吐對照，標出最不穩的一次。",
    teacherCheck: "先判斷問題來自氣流、吹孔、笛膜、指孔還是舌頭，每次只改一個變項。"
  },
  {
    title: "第三階段：技法進入曲目",
    time: "第7至12週",
    goal: "理解吐音、顫音、疊打贈音、滑音在不同風格中的不同作用。",
    soundTarget: "每項裝飾都能說明是起音、連接、強調或收束，刪掉後也能吹清楚骨幹旋律。",
    listen: ["秦川情", "牧民新歌", "行街"],
    practice: ["唱出語氣才拿起笛", "錄音檢查氣口", "一段只修一種技法"],
    evidence: "同一段交無裝飾和完整裝飾兩版，再寫出每項技法的聲音目的及取捨。",
    teacherCheck: "技巧加入後，拍子、音準、目的音和句尾是否仍然清楚，風格有沒有變成統一模板。"
  },
  {
    title: "第四階段：開始做版本比較",
    time: "第13至16週",
    goal: "同曲聽不同演奏者，寫出速度、氣口、音色與裝飾音分寸。",
    soundTarget: "能提出有證據的版本選擇，分清史料、聆聽描述與個人偏好。",
    listen: ["鷓鴣飛", "蔭中鳥", "秦川抒懷"],
    practice: ["做聽辨筆記", "標出句尾收法", "比較顫音速度"],
    evidence: "完成一份同曲兩版本比較，至少引用一項可追溯錄音或館藏資料，並錄自己的取捨版本。",
    teacherCheck: "學生是否只模仿名家表面聲音，還是能由結構、曲種、樂器和資料說明選擇。"
  }
]

export const expertRoles = [
  ["竹笛演奏", "核對指法、聲音目的、流派用語和曲目例子，避免把手勢寫成空泛口訣。"],
  ["民族音樂", "把北派、南派、江南絲竹和地域樂種放回歷史與音樂現場。"],
  ["教學方法", "按初學、進階和院校程度，安排真正做得到的學習次序。"],
  ["曲目導聽", "為核心作品揀出值得細聽的段落，也交代版本之間為何不同。"],
  ["文獻查證", "分清原始資料、研究與待查線索，正式引用前不偷步下定論。"],
  ["人物歷史", "把生平、師承、作品和教學放回年代，不讓人物只剩一串名銜。"],
  ["錄音比較", "同曲多版本要控制音量與錄音條件，風格差異才聽得公平。"],
  ["中文編輯", "用香港讀者熟悉的流暢書面語，把專業內容寫得準確而不生硬。"],
  ["資料整理", "統一欄位、狀態、資料關係和下載說明，讓每一列都有用途。"],
  ["閱讀體驗", "由讀者的問題安排頁面，搜尋、返回和下一步都不必猜。"]
] as const

export function masterTeachingLine(person: DiziMaster): string {
  const works = person.works.slice(0, 3).join("、")
  return `想認識${person.style || "竹笛演奏"}，可以由${person.name}聽起。揀${works || "一首代表曲目"}細聽，留意樂句、氣口和裝飾的分寸；再看其教學與流派位置，名字便會和聲音連起來。`
}

export function repertoireListeningLine(item: RepertoireItem): string {
  const guide = findRepertoireProfessorGuide(item.title)
  if (guide) return guide.firstListen
  const style = item.style ? `它連到${item.style}` : "它適合做基礎聽辨"
  const people = item.people ? `，可和${item.people}的演奏或教學資料一起看` : ""
  return `${style}${people}。第一遍跟着旋律走；第二遍才記吐音、氣口、裝飾和段落如何推進。`
}

export function techniqueTeachingLine(technique: Technique): string {
  const guide = findTechniqueProfessorGuide(technique.id)
  if (guide) return guide.purpose
  return `練${technique.name}，要知道耳朵想聽到甚麼。放進${technique.works || "實際曲目"}時，它負責${technique.research || technique.description}；聲音目的未清楚，速度和密度都只會令問題更快出現。`
}

export function styleDigest(style: StyleRegion): string {
  const people = splitValues(style.people).slice(0, 3).join("、")
  const works = splitValues(style.works).slice(0, 3).join("、")
  return `${style.name}可從${people}與${works}進入。${truncate(style.features, 80)}`
}
