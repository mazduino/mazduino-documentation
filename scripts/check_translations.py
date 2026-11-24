#!/usr/bin/env python3
"""List pages whose English version is missing or older than the Indonesian source.

Indonesian pages are docs/NAME.md, English pages docs/NAME.en.md. A page counts as stale when
the Indonesian file was committed after its English file, or has uncommitted changes the
English file does not. Run before a deploy:

    python3 scripts/check_translations.py          # translated pages that are out of date
    python3 scripts/check_translations.py --all    # also list pages with no English version

Exits with status 1 when a translated page is out of date.
"""
import subprocess
import sys
from pathlib import Path

DOCS = Path(__file__).resolve().parent.parent / "docs"


def last_change(path: Path) -> float:
    """Commit time of the last commit touching path, or its mtime if it has local changes."""
    rel = path.relative_to(DOCS.parent)
    dirty = subprocess.run(["git", "status", "--porcelain", "--", str(rel)],
                           cwd=DOCS.parent, capture_output=True, text=True).stdout.strip()
    if dirty:
        return path.stat().st_mtime
    out = subprocess.run(["git", "log", "-1", "--format=%ct", "--", str(rel)],
                         cwd=DOCS.parent, capture_output=True, text=True).stdout.strip()
    return float(out) if out else path.stat().st_mtime


def main() -> int:
    show_missing = "--all" in sys.argv
    stale, missing = [], []
    for source in sorted(DOCS.rglob("*.md")):
        if source.name.endswith(".en.md"):
            continue
        english = source.with_name(source.stem + ".en.md")
        name = source.relative_to(DOCS).as_posix()
        if not english.exists():
            missing.append(name)
        elif last_change(source) > last_change(english):
            stale.append(name)

    for name in stale:
        print(f"out of date: {name}")
    if show_missing:
        for name in missing:
            print(f"not translated: {name}")
    pages = len(list(p for p in DOCS.rglob("*.md") if not p.name.endswith(".en.md")))
    print(f"{pages} pages: {pages - len(missing)} translated, {len(stale)} out of date, "
          f"{len(missing)} not translated", file=sys.stderr)
    return 1 if stale else 0


if __name__ == "__main__":
    sys.exit(main())
