import fs from 'node:fs';
fs.writeFileSync('out/.nojekyll','');
if(!fs.existsSync('out/index.html'))throw new Error('Missing exported homepage');
console.log('GitHub Pages export ready in out/.');
