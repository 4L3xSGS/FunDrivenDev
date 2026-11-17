"""Verifica a estrutura e links locais; não substitui testes no navegador."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import shutil
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]
errors = []
node = shutil.which("node")
if not node:
    errors.append("Node.js não encontrado: necessário para verificar JavaScript.")

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.scripts = []
        self.current = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ("a", "link") and a.get("href"):
            self.links.append(a["href"])
        if tag in ("img", "script") and a.get("src"):
            self.links.append(a["src"])
        if tag == "script" and not a.get("src") and a.get("type", "") in ("", "text/javascript", "module"):
            self.current = []

    def handle_data(self, data):
        if self.current is not None:
            self.current.append(data)

    def handle_endtag(self, tag):
        if tag == "script" and self.current is not None:
            self.scripts.append("".join(self.current))
            self.current = None

def check_link(source, link):
    parts = urlsplit(link)
    if parts.scheme or parts.netloc or not parts.path:
        return
    target = (source.parent / unquote(parts.path)).resolve()
    if not target.is_relative_to(ROOT) or not target.exists():
        errors.append(f"{source.relative_to(ROOT)}: link local inválido: {link}")

html_count = 0
script_count = 0
for source in sorted(ROOT.rglob("*")):
    if not source.is_file() or any(x.startswith(".") or x in ("node_modules", "__pycache__") for x in source.relative_to(ROOT).parts):
        continue
    if source.suffix not in (".html", ".md", ".js"):
        continue
    text = source.read_text(encoding="utf-8")
    scripts = []
    if source.suffix == ".html":
        html_count += 1
        page = Page()
        page.feed(text)
        for link in page.links:
            check_link(source, link)
        scripts = page.scripts
    elif source.suffix == ".md":
        # Ignora exemplos de código; verifica os links Markdown do documento.
        plain = re.sub(r"^\x60{3}.*?^\x60{3}\s*$", "", text, flags=re.M | re.S)
        for link in re.findall(r"!?\[[^\]]*\]\(([^)\s]+)\)", plain):
            check_link(source, link)
    else:
        scripts = [text]
    if node:
        for script in scripts:
            script_count += 1
            with tempfile.TemporaryDirectory() as tmp:
                js = Path(tmp) / "check.mjs"
                js.write_text(script, encoding="utf-8")
                result = subprocess.run([node, "--check", str(js)], capture_output=True, text=True)
                if result.returncode:
                    errors.append(f"{source.relative_to(ROOT)}: JavaScript inválido\n{result.stderr}")

games = sorted(p for p in (ROOT / "jogos").iterdir() if p.is_dir())
readme = (ROOT / "README.md").read_text(encoding="utf-8")
catalog = (ROOT / "index.html").read_text(encoding="utf-8")
for game in games:
    for name in ("index.html", "README.md"):
        if not (game / name).is_file():
            errors.append(f"{game.name}: falta {name}")
    if f"jogos/{game.name}/" not in readme or f"jogos/{game.name}/index.html" not in catalog:
        errors.append(f"{game.name}: ausente em um dos catálogos.")

if errors:
    print("\n".join(errors), file=sys.stderr)
    sys.exit(1)
print(f"OK: {len(games)} jogo(s), {html_count} páginas HTML e {script_count} script(s); links locais e sintaxe verificados.")
