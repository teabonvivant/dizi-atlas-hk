import professorBundle from "@/data/professor_guides.json"

export type ProfessorSource = (typeof professorBundle.sources)[number]
export type DiziSoundCheck = (typeof professorBundle.soundChecks)[number]
export type DiziAssessment = (typeof professorBundle.assessment)[number]
export type TechniqueProfessorGuide = (typeof professorBundle.techniques)[number]
export type RepertoireProfessorGuide = (typeof professorBundle.repertoire)[number]

export const professorMethod = professorBundle.method
export const professorSources = professorBundle.sources
export const diziSoundChecks = professorBundle.soundChecks
export const diziAssessment = professorBundle.assessment
export const techniqueProfessorGuides = professorBundle.techniques
export const repertoireProfessorGuides = professorBundle.repertoire

const sourceMap = new Map(professorSources.map((source) => [source.id, source]))
const techniqueMap = new Map(techniqueProfessorGuides.map((guide) => [guide.id, guide]))
const repertoireMap = new Map(repertoireProfessorGuides.map((guide) => [guide.title, guide]))

export function findTechniqueProfessorGuide(id: string): TechniqueProfessorGuide | undefined {
  return techniqueMap.get(id)
}

export function findRepertoireProfessorGuide(title: string): RepertoireProfessorGuide | undefined {
  return repertoireMap.get(title)
}

export function getProfessorSources(ids: readonly string[]): ProfessorSource[] {
  return ids.flatMap((id) => {
    const source = sourceMap.get(id)
    return source ? [source] : []
  })
}
