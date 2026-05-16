# The Melva — Production Site

Quiet-luxury redesign of [themelva.com](https://www.themelva.com), built as a static Vite + React + TypeScript site deployed on Netlify.

Same site structure as before (Home, Rooms & Rates, Gallery, Testimonials, Contact), same SEO setup (sitemap, robots, Schema.org). New visual system, real photos throughout, and a contact form that delivers enquiries straight to your Telegram via a small Netlify Function — no database, no third-party form service.

---

## Run locally

You'll need **Node 18+** and **npm**.

```bash
npm install
npm run dev          # http://localhost:5173 — site only, no functions
```

To test the contact form locally (so you actually receive Telegram messages while you click around), use Netlify's CLI:

```bash
# 1. Create .env in this folder (it's git-ignored — see .env.example)
TELEGRAM_BOT_TOKEN=...your token...
TELEGRAM_CHAT_ID=1840955641

# 2. Run with functions
npm run dev:netlify  # http://localhost:8888 — site + functions
```

To preview the production build:

```bash
npm run build        # outputs to dist/
npm run preview      # serves dist/ at http://localhost:4173
```

---

## Telegram setup (one-time)

The contact form posts to a Netlify Function (`netlify/functions/enquiry.ts`) which forwards the message to your Telegram chat. To make it work in production:

1. **Get a bot token**
   - Open Telegram, chat with [@BotFather](https://t.me/BotFather)
   - `/newbot` → give it a name (e.g. "The Melva enquiries")
   - Save the token it prints. *Anyone with this token can post as your bot — treat it like a password.*

2. **Get your chat ID**
   - Chat with [@userinfobot](https://t.me/userinfobot) — it'll reply with your numeric ID
   - Then chat once with your new bot (send it `/start`) so it's allowed to message you

3. **Set the env vars in Netlify**
   - Netlify dashboard → your site → **Site configuration** → **Environment variables**
   - Add `TELEGRAM_BOT_TOKEN` with the token from step 1
   - Add `TELEGRAM_CHAT_ID` with the number from step 2
   - Optionally `ALLOWED_ORIGIN` = `https://www.themelva.com` to lock the function to your domain
   - **Save** and trigger a redeploy (Deploys → Trigger deploy)

4. **Test on the live site**
   - Go to themelva.com/contact, fill in the form, click Send
   - You should receive a Telegram message within a second
   - If you don't: Netlify dashboard → Functions → enquiry → check the logs

### Rotating the token

If your bot token leaks (screenshot, accidental commit, copied into a chat), rotate it:
- `@BotFather` → `/mytoken` → choose your bot → "Revoke current token"
- Update `TELEGRAM_BOT_TOKEN` in Netlify env vars
- Redeploy

The old token immediately stops working.

---

## Push to GitHub → auto-deploys to Netlify

Your repo at `https://github.com/mutheer/the-melva.git` is already wired to Netlify (per `netlify.toml`). Any push to `main` triggers a rebuild.

### Option A — replace everything in one commit (recommended)

This is the cleanest path. Open a terminal in this folder:

```bash
git init -b main
git remote add origin https://github.com/mutheer/the-melva.git
git add .
git commit -m "Redesign: quiet-luxury rebuild with new photography + Telegram contact"
git push --force origin main
```

> ⚠️ `--force` rewrites history on `main`. Old commits are gone from the branch (still recoverable via Netlify deploy history). Only do this if you're sure.

### Option B — replace files inside an existing clone (preserves history)

```bash
cd path/to/your/clone-of-the-melva
git rm -rf .
cp -r /path/to/this/project/. .
git add .
git commit -m "Redesign: quiet-luxury rebuild with new photography + Telegram contact"
git push origin main
```

### Option C — drag-drop into Netlify (no git)

1. Run `npm install && npm run build` here
2. Go to your site on app.netlify.com
3. **Deploys** → drag the `dist/` folder onto the page
4. ⚠️ Functions won't deploy this way — use git push for production.

---

## What changed

**Visual system**
- Type: Marcellus (display serif) + Manrope (body sans) + Cormorant Garamond italic accent
- Palette: warm bone `#F1ECE4`, deep ink `#1A1A18`, umber accent `#8A6E47`
- Removed: parallax hero, generic icon-card "intro" grid, fake bookings counter, admin login link, language selector, Pexels stock pool image

**Content honesty**
- No mention of room count
- No mock "12 bookings in last 24 hours" claim
- OG/Twitter/Schema images all changed from a stock Pexels photo to your real exterior `hero.jpg`

**Routes preserved (1:1 with current `sitemap.xml`)**
- `/` Home
- `/rooms` Rooms & Rates
- `/gallery` Gallery
- `/testimonials` Testimonials
- `/contact` Contact (working form → Telegram)

**Performance**
- All photos compressed (~1.6 MB total for 18 images, down from ~15+ MB)
- Hero preloaded with `fetchpriority="high"` and a 1 KB blur-up placeholder
- Below-the-fold images lazy-loaded
- Gallery page images eager-loaded (CSS columns + lazy-load combo is unreliable)

**Bookings**
- Every CTA links to `https://www.booking.com/Share-pfDWkt0`
- WhatsApp float links to `+267 75010066`

**Contact form**
- Server-side Netlify Function (`/api/enquiry`) posts to Telegram Bot API
- Honeypot + length-cap protection against spam
- Token lives in Netlify env vars — never in the repo, never in the browser

---

## Project structure

```
.
├── index.html
├── netlify.toml                    # Netlify build + /api/* → function redirect
├── package.json
├── tailwind.config.js
├── tsconfig*.json
├── vite.config.ts
├── .env.example                    # Template — copy to .env for local dev
├── netlify/
│   └── functions/
│       └── enquiry.ts              # Telegram delivery endpoint
├── public/
│   ├── favicon.png
│   ├── robots.txt
│   ├── sitemap.xml
│   └── *.jpg / *.png               # Photography + logo
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── data/static.ts
    ├── components/Layout/
    │   ├── Header.tsx
    │   ├── Footer.tsx
    │   ├── WhatsAppButton.tsx
    │   ├── PageHero.tsx
    │   └── Icons.tsx
    └── pages/
        ├── Home.tsx
        ├── Rooms.tsx
        ├── Gallery.tsx
        ├── Testimonials.tsx
        └── Contact.tsx
```

---

## Replacing photos later

Drop new JPEGs into `public/` and reference them in `src/data/static.ts`. Keep file sizes under ~300 KB per image (1600–1800 px on the long edge, JPEG quality 0.78 is a good target).

The single missing high-res asset is the **hero photo**: `hero.jpg` is currently 720×720. When stretched across a desktop hero it looks soft. Re-shoot or re-export the dusk shot at minimum 2400×1600 and drop it in.
