mkdocs build
mkdocs gh-deploy

## Languages

Pages are written in Indonesian (`docs/NAME.md`). The English version of a page sits next to it
as `docs/NAME.en.md` and is served under `/en/`. A page with no English version shows the
Indonesian text on the English site, with a note.

- When an Indonesian page changes, update its `.en.md` in the same commit.
- Link to other pages as `NAME.md` in both languages; the English build picks `NAME.en.md` itself.
- English menu titles are set under `nav_translations` in `mkdocs.yml`.
- Before a deploy, `python3 scripts/check_translations.py` lists English pages that are older
  than their Indonesian source (`--all` also lists pages with no English version).
