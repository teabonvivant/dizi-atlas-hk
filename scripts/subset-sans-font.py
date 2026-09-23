from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools import subset

root = Path.cwd()
font = TTFont(r"C:\Windows\Fonts\NotoSansHK-VF.ttf")
text = ''.join(p.read_text(encoding='utf-8-sig') for d in ['app', 'components', 'lib', 'content', 'data'] for p in (root/d).rglob('*') if p.is_file() and p.suffix in ('.tsx', '.ts', '.txt', '.json'))
text += ''.join(chr(i) for i in range(32, 127))
options = subset.Options()
options.flavor = 'woff2'
options.name_IDs = ['*']
subsetter = subset.Subsetter(options=options)
subsetter.populate(text=text)
subsetter.subset(font)
font.flavor = 'woff2'
output = root/'public/fonts/dizi-sans-hk.woff2'
font.save(output)
print('Self-hosted Noto Sans HK subset:', output.stat().st_size, 'bytes')
