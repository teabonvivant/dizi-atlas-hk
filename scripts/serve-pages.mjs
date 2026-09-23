import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('out'),base='/dizi-atlas-hk',port=Number(process.env.PORT||8079);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.woff2':'font/woff2'};
http.createServer((req,res)=>{
 const url=new URL(req.url,'http://localhost');
 if(url.pathname===base){res.writeHead(301,{location:base+'/'+url.search});res.end();return;}
 if(!url.pathname.startsWith(base+'/')){res.writeHead(404);res.end('Not found');return;}
 let file;
 try{file=path.resolve(root,'.'+decodeURIComponent(url.pathname.slice(base.length)));}catch{res.writeHead(400);res.end();return;}
 if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory()){
  if(!url.pathname.endsWith('/')){res.writeHead(301,{location:url.pathname+'/'+url.search});res.end();return;}
  file=path.join(file,'index.html');
 }
 if(!fs.existsSync(file)){res.writeHead(404,{'content-type':'text/html; charset=utf-8'});res.end(fs.readFileSync(path.join(root,'404.html')));return;}
 res.writeHead(200,{'content-type':types[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res);
}).listen(port,'127.0.0.1',()=>console.log('GitHub Pages preview: http://localhost:'+port+base+'/'));
