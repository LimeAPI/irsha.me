# Irsha Global — irsha.me

The official website for **Irsha Global**, an independent venture studio building thoughtful digital products across language learning, hospitality technology, and everyday design.

A warm, editorial, paper-toned one-pager: Instrument Serif headlines, DM Sans body copy, DM Mono details, and a single electric-blue accent.

## Portfolio

| Venture | Space | Status | Site |
|---------|-------|--------|------|
| Talkingo | Language · AI learning | Live | [talkingo.ai](https://talkingo.ai) |
| Mangodish | Hospitality · Restaurant technology | In development | [mangodish.com](https://mangodish.com) |
| Lunitaa | Apparel · Everyday essentials | Live | [lunitaa.com](https://lunitaa.com) |

## Tech

- **Single self-contained page** — vanilla HTML, CSS, and JS inline in `index.html`. No build step, no dependencies.
- Google Fonts: Instrument Serif, DM Sans, DM Mono
- Section index: ventures, services, **digital & AI transformation**, studio, philosophy, about, contact
- Vertical venture story on every screen size — no scroll hijacking, each venture reachable by normal scroll (plus quick-jump chips)
- Scroll-reveal animation, active-section nav highlighting, reading-progress bar, WhatsApp quick contact
- First-visit logo ignition: dot burst + blue ring sweep, ~1.2s, CSS-only, skipped for reduced motion and repeat visits
- Offices block (Sheridan WY registered office, Cairo, India via US line, Managua) with WhatsApp-only numbers
- Legal identity surfaced as "Irsha Global LLC" in the copyright, footer and Organization schema
- Custom SVG artwork and icons, adaptive blend-mode cursor that stays visible on both light and dark sections
- Fully responsive, keyboard-navigable, and respects `prefers-reduced-motion`
- Schema.org `Organization` JSON-LD, Open Graph / Twitter Card metadata, sitemap, `robots.txt`, and a branded `404.html`

## Structure

```
index.html          The entire site (markup + styles + scripts)
404.html            Branded not-found page
robots.txt          Crawl rules + sitemap reference
sitemap.xml         Single-URL sitemap
CNAME               Custom domain: irsha.me
.nojekyll           Disable Jekyll processing on GitHub Pages
assets/             favicon.svg, og-image.png (1200x630), apple-touch-icon.png
```

## Local preview

```powershell
python -m http.server 8080
# then open http://localhost:8080
```

## Deploy

Served by **GitHub Pages** with the custom domain [irsha.me](https://irsha.me), deployed from the **`master`** branch root.

Because Pages watches `master`, `main` and `master` must be kept in sync:

```powershell
git push origin main
git push origin main:master
```

`CNAME` and `.nojekyll` must stay in the repo root for the custom domain and static hosting to keep working.
