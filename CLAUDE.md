# beto.page

Sitio personal de Roberto Salas. Repo: `rsalas6/beto.page` (GitHub).

Blog personal súper minimalista, **todo el sitio en inglés**. Estilo inspirado en tinycomputer.co: fondo `#111`, títulos en serif (Newsreader), cuerpo en mono (IBM Plex Mono), cursor parpadeante, listas con fecha a la derecha, separadores `— — —`.

## Stack y estructura

- Astro 7 + Tailwind 4 (`@tailwindcss/vite`, `@tailwindcss/typography`). JS en cliente solo donde hace falta: un script inline en la home que elige al azar la segunda línea del título (`SITE.taglines`) y los scripts de `/tools/`.
- `src/site.ts` — nombre, descripción, email y enlaces de la home.
- `src/content/posts/*.md` — posts. Con cuerpo → página en `/posts/<id>/`. Solo frontmatter → "nota" de una línea sin enlace. `draft: true` los oculta.
- `src/styles/global.css` — tokens (`ink`, `paper`, `muted`, `rule`) y `cursor-block`.
- `/rss.xml` y sitemap (excluye `/resume-print*`).
- `/tools/` — herramientas minimalistas que corren en el navegador: `qr` (lib `qrcode`, descarga PNG/SVG), `string` (case, slug, base64, URL) y `diff` (lib `diff`, por líneas). Comparten `ToolLayout.astro` y las clases `.field` / `.btn` de `global.css`.

## CV (PDF)

- Datos en `src/data/resume.json`; plantilla `src/components/ResumePrint.astro` (prop `lang`: `es` | `en`).
- Incluye las cédulas profesionales (`education[].credential`, solo el número).
- Se publica un solo CV, en inglés: `/cv.pdf` (renderizado desde `/resume-print/`). El JSON conserva los textos en español por si se necesitan.
- `npm run build:pdf` compila y genera `public/cv.pdf` con Puppeteer (y lo copia a `dist/`). Regenerar y commitear el PDF tras cambiar el CV.

## Cuentas de GitHub (`gh`) — REGLA OBLIGATORIA

En esta máquina hay dos cuentas logueadas en `gh`: `rsalas6` y `roberto-micro1`.

- **Este repo SIEMPRE se trabaja con `rsalas6`** (push, pull, PRs, issues, releases, etc.).
- **La cuenta activa por defecto debe quedar SIEMPRE en `roberto-micro1`** al terminar.
- Flujo para cualquier operación con `gh` o `git` remoto (push/pull/fetch usan el credential helper de `gh`, o sea la cuenta activa):

```sh
gh auth switch -u rsalas6
# ... operaciones (git push, gh pr create, etc.) ...
gh auth switch -u roberto-micro1
```

- Aunque la operación falle, hay que volver a `roberto-micro1` (encadenar con `;`, no con `&&`).
- Verificar con `gh auth status` que `roberto-micro1` quedó como `Active account: true`.

## Git

- Identidad de commits: `Roberto Salas <rsalas0691@gmail.com>`.
- Mensajes de commit estilo conventional commits (`feat:`, `fix:`, `refactor:`, ...).
