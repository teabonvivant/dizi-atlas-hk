import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('out'),base='/dizi-atlas-hk',origin='https://teabonvivant.github.io';
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const all=files(root),html=all.filter(p=>p.endsWith('.html')),errors=[];let checked=0;
function check(value,from){
 value=value.replaceAll('&amp;','&');
 if(!value||/^(?:#|https?:|data:|mailto:|tel:|\/\/)/.test(value))return;
 const current=origin+base+'/'+path.relative(root,from).replaceAll('\\','/');
 const url=new URL(value,current),pathname=decodeURIComponent(url.pathname);
 if(!pathname.startsWith(base+'/')){errors.push({from:path.relative(root,from),value,error:'outside project base path'});return;}
 const relative=pathname.slice(base.length+1),target=path.join(root,relative);
 checked++;
 if(!fs.existsSync(target)&&!fs.existsSync(path.join(target,'index.html')))errors.push({from:path.relative(root,from),value,error:'missing target'});
}
for(const file of html){
 const text=fs.readFileSync(file,'utf8');
 for(const tag of text.matchAll(/<(?:a|img|script|link|source|form)\b[^>]*>/g))for(const a of tag[0].matchAll(/\b(?:href|src|action)="([^"]+)"/g))check(a[1],file);
 for(const canonical of text.matchAll(/<link rel="canonical" href="([^"]+)"/g)){
  const url=new URL(canonical[1]);
  if(url.origin!==origin)errors.push({from:path.relative(root,file),error:'unexpected canonical origin'});
  else check(url.pathname,file);
 }
}
for(const file of all.filter(p=>p.endsWith('.css')))for(const u of fs.readFileSync(file,'utf8').matchAll(/url\(["']?([^)'"\s]+)["']?\)/g))check(u[1],file);
const journal=JSON.parse(fs.readFileSync('data/generated/journal.json','utf8'));
for(const a of journal.articles){if(!fs.existsSync(path.join(root,'journal',a.slug,'index.html')))errors.push({article:a.slug,error:'missing article'});for(const image of [a.image,a.diagramImage])if(!fs.readFileSync(path.join('public',image)).equals(fs.readFileSync(path.join(root,image))))errors.push({image,error:'image changed'});}
if(!fs.existsSync(path.join(root,'.nojekyll')))errors.push({error:'missing .nojekyll'});
console.log(JSON.stringify({html_pages:html.length,articles:journal.articles.length,local_references_checked:checked,errors},null,2));
if(errors.length)process.exit(1);
