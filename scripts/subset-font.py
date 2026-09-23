from pathlib import Path
import json
from fontTools.ttLib import TTFont
from fontTools import subset
from fontTools.varLib.instancer import instantiateVariableFont
root=Path.cwd()
font=TTFont(r"C:\Windows\Fonts\NotoSerifHK-VF.ttf")
for n in font["name"].names:
 if n.platformID==3 and n.nameID in (0,1,13,14):print(str(n.nameID)+": "+n.toUnicode())
text="".join(p.read_text(encoding="utf-8-sig") for d in ["app","components","lib","content","data"] for p in (root/d).rglob("*") if p.is_file() and p.suffix in (".tsx",".ts",".txt",".json"))
font=instantiateVariableFont(font,{"wght":600},inplace=True)
options=subset.Options()
options.flavor="woff2"
options.name_IDs=["*"]
sub=subset.Subsetter(options=options)
sub.populate(text=text)
sub.subset(font)
font.flavor="woff2"
out=root/"public/fonts/dizi-serif-hk.woff2"
out.parent.mkdir(parents=True,exist_ok=True)
font.save(out)
print(json.dumps({"characters":len(set(text)),"fontBytes":out.stat().st_size}))

