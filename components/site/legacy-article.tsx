import {withBasePath} from "@/lib/paths"
export function LegacyArticle({html}:{readonly html:string}){
 const portable=html.replace(/((?:href|src)=["'])([/](?![/])[^"']*)/g,(_match,before,value)=>before+withBasePath(value));
 return <article className="legacy-report" dangerouslySetInnerHTML={{__html:portable}}/>;
}
