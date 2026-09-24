import type { RepertoireItem } from "@/lib/data/types"
import { findRepertoireProfessorGuide } from "@/lib/professor-guides"

type ListeningGuide = Readonly<{
  title: string
  firstListen: string
  secondListen: string
  technicalFocus: string
  styleBoundary: string
  assignment: string
}>

type ListeningFocus = Readonly<{
  first: string
  second: string
  practice: string
}>

const focusByTag: readonly [RegExp, ListeningFocus][] = [
  [/江南|南派|絲竹|水鄉/, {
    first: "讓一條旋律先完整走過，再留意句尾如何收住，下一句又怎樣接回來；若是合奏，先辨清主線和應答聲部。",
    second: "留意加花與節拍的關係：裝飾音有沒有托住旋律方向，合奏中的呼吸與音量又如何彼此讓位？",
    practice: "選一個短句，先吹出節拍和骨幹音，再加回裝飾；錄兩版比較句尾和拍點有沒有走樣。"
  }],
  [/北派|梆子|二人台|河北|山西/, {
    first: "沿着旋律的重音與速度轉折聽下去，記下音樂何時舒展、何時推進，不要只用音量判斷它的性格。",
    second: "留意吐音、剁音、滑音與停頓各自落在哪裏；它們是否帶出節奏口吻，還是只是增加了音符密度？",
    practice: "選四小節，先唱清重音和句尾，再以慢速吹出骨幹，最後逐項加回裝飾並錄音比較。"
  }],
  [/西北|秦川|長安|塞上|巴楚/, {
    first: "先聽旋律怎樣起句、延展和落下，留意長線條與較短節奏段之間的張力。",
    second: "選一處滑行、重音或音色轉折細聽：它從哪個音出發、落到哪裏，是否讓句子方向更清楚？",
    practice: "把一個短句唱兩遍，標出重音、滑行起點和落音，再吹奏一次簡潔版、一次加入裝飾的版本。"
  }],
  [/草原|蒙古|牧民|二人台/, {
    first: "分辨旋律較舒展的段落和節奏較活躍的段落；聽它們如何交替，而不急着把題材想像成固定音色。",
    second: "追蹤長音如何走向下一個重拍，並留意音區、吐音和滑音在句中是否各有作用。",
    practice: "各選一段歌唱性和節奏性較強的樂句，分別標出呼吸、重拍與目的音，再錄一組對照。"
  }],
  [/十孔|八孔|半音|轉調/, {
    first: "完整聽一次，記下你聽到音高方向或調性感覺改變的位置；先以耳朵辨認，再回看樂器形制資料。",
    second: "留意半音行進和音域變化在樂句中扮演甚麼角色，並分清作品寫法與演奏者處理。",
    practice: "選一小段，把最明顯的半音進行圈出來；慢奏並唱出前後音程，檢查轉折是否清晰。"
  }],
  [/協奏|樂隊|管弦|民族器樂劇/, {
    first: "先聽整段的主次關係：獨奏何時帶出旋律，何時與樂隊交談，何時退到整體音響之中？",
    second: "留意編制、力度和音區改變後，竹笛的音色核心有沒有保留；錄音的平衡也會影響聽感。",
    practice: "選一段獨奏與伴奏交接的位置，標出進入、回應和收束三個時點，再以輕聲哼唱檢查結構。"
  }],
  [/戲曲|崑曲|昆曲|曲牌/, {
    first: "先聽樂句的說唱感，記下重音、停頓和句尾落點；不要先把所有滑音都當成同一種裝飾。",
    second: "試聽旋律如何呼應聲腔或曲牌材料；如有不同版本，分辨是曲目改編、編制改變，還是演奏語氣不同。",
    practice: "選兩小節先朗讀節奏，再唱出重音和落點，最後吹奏並比較加入潤腔前後的語意。"
  }],
  [/當代|新音樂|跨界|影視|遊戲|特殊技法/, {
    first: "先把作品當成一段完整結構聽，記下音色或力度轉變的位置，以及它們對段落推進的作用。",
    second: "若錄音中有特殊音響，留意它如何進入、維持和退出；技巧名稱本身不等於音樂目的。",
    practice: "畫一條短音色時間線，標出一個轉變前後的樂句，再錄一次簡化版本，檢查結構是否仍然清楚。"
  }]
]

export function getRepertoireGuide(item: RepertoireItem): ListeningGuide {
  const existing = findRepertoireProfessorGuide(item.title)
  if (existing) return existing

  const tags = `${item.type} ${item.style}`
  const focus = focusByTag.find(([pattern]) => pattern.test(tags))?.[1] ?? {
    first: "完整聽一次《" + item.title + "》，先記下旋律最清楚的起點、轉折和收束；如果暫時聽不出段落，可從停頓或音域變化開始。",
    second: "第二遍選一個短句，留意起音、節奏重心、換氣和句尾；若有不同演奏版本，先指出可聽見的差異，再描述自己的偏好。",
    practice: "選一個短句，先唱出節奏與目的音，再用慢速吹奏；錄音後只挑一處最需要改善的位置重練。"
  }
  return {
    title: item.title,
    firstListen: `第一遍先讓《${item.title}》完整走過，${focus.first}`,
    secondListen: focus.second,
    technicalFocus: `把《${item.title}》的一個樂句拆成可聽見的目標：${focus.practice}`,
    styleBoundary: "曲目索引中的形式和地域標籤是搜尋線索，不等於唯一版本或固定演奏法。遇到創作者、改編者或曲種說法有差異時，應以可查到的樂譜、節目冊和錄音資料分別記錄。",
    assignment: `為《${item.title}》做一份短聆聽筆記：選一個樂句，記下兩個可重聽的位置，再寫一句你想在下一次演奏中保留或改變的處理。`
  }
}
