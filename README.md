# Azan Asghar — New Personal Portfolio

A complete, ready-to-deploy single-page portfolio for **Azan Asghar**
(Software Developer & Cyber Expert, founder of CoreVex).

## What this is — and what it is not

- **Same design language as the reference you liked:** light theme,
  Anton display headings, Segoe UI body text, IBM Plex Mono kickers,
  Caveat script eyebrow, white / `#0a0a0a` / `#efefec` palette,
  24px rounded cards, floating pill navbar, numbered sections
  (01–09), scrolling stack marquees, automation pipeline and a
  playable tic-tac-toe finale.
- **Same section structure:** hero → about → problems → services →
  selected work → person → design → process → stack → automation →
  contact → footer game.
- **NOT a copy of the other person's portfolio:** his name, his
  writing and his photos are not in here. Every word of copy is
  Azan's own — taken from azanasghar.me and CoreVex (Karigar PK,
  Nova AI Assistant, CoreVex CRM, Dubai Food POS, Service Booking
  App, Zynk 3D Editor, Chess, Database Projects). Copying someone
  else's identity onto your own site would hurt you, not help you.

## Files

| File | What it does |
|---|---|
| `index.html` | The whole page: all sections, content, contact form, game board |
| `styles.css` | All styling, from the design tokens (colours, fonts, radii, shadows) |
| `script.js` | Loader counter, mobile nav, scroll reveals, contact mailto, tic-tac-toe AI |
| `assets/images/azan1.png` | **You add this** — hero photo (transparent PNG) |
| `assets/images/azan2.png` | **You add this** — about + person photo (transparent PNG) |

No build step, no framework, no npm install. It is plain HTML/CSS/JS.

## Run it locally

Option 1 — just double-click `index.html`.

Option 2 — a local server (recommended, fonts load the same as live):

```bash
cd azan-portfolio
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy it (pick one)

**Cloudflare Pages (matches the reference site's hosting):**
Dashboard → Pages → Create → Upload assets → drag this whole folder in.

**Vercel:** `vercel` in this folder, or drag the folder into vercel.com/new.

**GitHub Pages:** push this folder to a repo → Settings → Pages →
Deploy from branch → root folder.

**Netlify Drop:** drag the folder onto app.netlify.com/drop.

After deploy, point your domain at it (Cloudflare Pages: Custom domains
→ add `azanasghar.me`), or keep the `*.pages.dev` address.

## Customise before you publish (5 minutes)

1. **Your photo:** hero photo → `assets/images/azan1.png`, about + person photo → `assets/images/azan2.png` (transparent PNGs). Until then the sections show clean light panels with your "AA" initials — nothing breaks.
2. **Contact form:** right now submitting opens the visitor's email
   app addressed to azan@corevex.tech. For a hosted form that
   works without an email app, sign up free at Formspree, then in
   `index.html` change `<form id="contactForm">` to
   `<form action="https://formspree.io/f/YOUR_ID" method="POST">`
   and delete the mailto handler in `script.js` (the "Contact form"
   block).
3. **Links:** GitHub (`github.com/azanasghar1813`), WhatsApp
   (`wa.me/923427066034`), CoreVex and email are already yours. Add
   LinkedIn/X links in the footer if you want them — they were left
   out rather than guessed.
4. **Work cards:** edit the `#work` section in `index.html` — each
   card is one `<article class="work-card">`. Add a real screenshot
   by replacing the emoji thumb div with an `<img>`.
5. **Design gallery:** the three mockups are pure CSS placeholders.
   Replace them with screenshots of your real dashboards when ready.

## Checklist before going live

- [ ] Photos added: assets/images/azan1.png and assets/images/azan2.png
- [ ] Form connected (Formspree) or mailto confirmed
- [ ] Every project card checked against your real status
- [ ] Opened once on a real phone (mobile menu + game board)
- [ ] Old azanasghar.me content backed up before replacing it
