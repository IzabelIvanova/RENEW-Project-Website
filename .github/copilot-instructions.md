# Copilot Instructions for RENEW Project Website

This repository is a **static bilingual website** for the RENEW research project. It is built on an HTML5 UP template extended with custom styles and a little vanilla JavaScript. There is no framework, server-side code, or tooling beyond optional Sass compilation.

Use these notes when writing or editing code or helping the human contributor: the goal is to make the site editable and maintainable with minimal surprises.

---

## Big picture

- All pages are plain `.html` files at the repository root or under `en-renew-project/` for the English translations. English pages are named `en-<original>.html` and reference assets with `../` paths.
- The design is responsive via the template's CSS and uses jQuery + Scrollex/Scrolly plugins shipped in `assets/js/*`.
- Styles are authored in SCSS under `assets/sass`; the compiled output is in `assets/css/main.css` and `noscript.css`. The template's structure is preserved (`base/`, `components/`, etc.).
- Interactivity is driven by `assets/js/main.js`. Custom logic includes:
  - language toggle and breadcrumb generation
  - publication abstract toggling
  - package description toggling (used on `packages.html`)
  - the rest of the file is unchanged template code.

There is no build pipeline: you simply edit the HTML, CSS (or Sass) and reload the pages in a browser. To regenerate styles run a Sass compiler yourself; there is no npm/gulp/webpack config in this repo.

---

## Developer workflows

1. **Editing content**
   - Change text directly in the `.html` files. When adding a new page or section:
     - Copy the Bulgarian page and create an English counterpart under `en-renew-project` with `en-` prefix.
     - Update the language arrays (`titlesBG`, `titlesEN`, `sectionsBG`, `sectionsEN`, `customHierarchy`) in `assets/js/main.js` so the dynamic breadcrumb works for your new page.
     - Add the new page to the nav in both language versions; the `<nav>` markup is duplicated in each file because the template doesn’t support includes.
   - For lists like publications or work packages, follow existing pattern: a `.statistics` or `.actions` `<ul>` with items; copy one of the existing `<li>` blocks.
   - When editing the Bulgarian site, keep IDs and fragment identifiers consistent (`#first`, `#second`, `#news`). The English pages use the same IDs prefixed with `en-`.

2. **Styling**
   - Modify SCSS in `assets/sass`. The `main.scss` file imports the template library; add new rules there or in an appropriate partial.
   - Run your own Sass command, e.g.
     ```powershell
     sass --no-source-map assets/sass/main.scss assets/css/main.css
     sass --no-source-map assets/sass/noscript.scss assets/css/noscript.css
     ```
   - The compiled CSS is checked in; do not forget to commit it after recompilation so the published site has the latest styles.
   - You can also edit `assets/css/main.css` directly for minor tweaks, but the source of truth is SCSS.

3. **JavaScript**
   - Keep custom code in `assets/js/main.js`. If you add new UI behaviors, append them to the end of the file (after the existing DOMContentLoaded handlers) to avoid disrupting the template’s logic.
   - Beware of the language toggle logic: it infers the target URL by prefixing or removing `en-` from the filename. If you change naming conventions, update that listener accordingly.
   - When adding new interactive fragments (e.g. another `'toggle-abstract'` button) follow the existing pattern of class selectors and data attributes.

4. **Previewing**
   - No server is required; open any `*.html` file in the browser. For features that depend on `window.location.pathname` (breadcrumbs, language toggle), serve over `http://` using a simple static server if testing on file:// causes problems.
     - For example: `python -m http.server` in the repository root or use the built‑in Live Server extension in VS Code.

5. **Assets & dependencies**
   - External resources (FontAwesome, Swiper) are pulled from CDNs. If you add other third‑party libraries, follow the same pattern of including them with `<link>`/`<script>` tags.
   - All local assets (images, fonts) live under `images/`, `assets/webfonts/`, etc.
   - There is no package manager; you can add `package.json`/`npm` tooling yourself if you want, but it's not required by the project.

---

## Project conventions & patterns

- **Bilingual structure**: Bulgarian is the default. Language switching is manual—maintain parallel files and update JS arrays. Do **not** try to centralize text; the site is static.
- **Paths and fragments**: page IDs used in navigation are stable (`#intro`, `#first`, etc.). When reusing the same HTML across languages the IDs are rewritten (`#en-intro`). Be cautious when copying code between versions.
- **Interactive sections**:
  - `togglePackage(id)` hides all `.package-content` elements then shows the named one. Use it for any new expandable section arranged with the same markup.
  - Abstract toggles look for `.toggle-abstract` buttons inside `<p class="abstract">` and flip `.short-text`/`.full-text`. Keep these class names if you add more text blocks.
- **Breadcrumb mapping**: the hard‑coded JS maps filenames to Bulgarian/English titles. When adding pages or renaming, this map must be updated to avoid showing the filename.
- **SCSS organization**: keep the HTML5 UP file‑structure; modifications should go into new partials in `components`/`layout` or directly into `main.scss` for minor tweaks.

---

## Editing guidelines for AI agents

When the AI generates or modifies code:

- Keep indentation and language (BG/EN) consistent with the surrounding file.
- Do not introduce build tools unless the user requests them; assume manual compilation of Sass and no packaging steps.
- When adding navigation links or breadcrumbs, update both language versions and the JS maps.
- If proposing new features (like a carousel), prefer using the existing CDN‑loaded Swiper instance; add initialization code at the bottom of `assets/js/main.js`.
- Avoid adding dependencies that require NPM or a server; this site is intended to be deployable as a static folder.

---

## Examples

- **Adding a new page**: copy `team.html` → `project-results.html`, update `<title>`, add link in both navs, create `en-renew-project/en-project-results.html`, extend `titlesBG`, `titlesEN`, and `customHierarchy` if you want breadcrumbs to link back to a section.
- **New publication**: clone one of the `<li class="fit">` blocks in `index.html`, change the `href`, `h2` text, and author list. The toggle behavior will work automatically because of the `.toggle-abstract` selector.
- **New stylesheet rule**: open `assets/sass/components/_button.scss` and modify button colors, then compile.

---

Feel free to ask for clarification if any instructions are unclear or if there are additional workflows you'd like documented.