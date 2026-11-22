# Pyn Visuals: Website

A fast, static website (plain HTML, CSS, and JavaScript). There's nothing to install and no build step.

```
pyn-visuals-site/
├─ index.html          Home (hero, intro, selected work, services, booking CTA)
├─ portfolio.html      Filterable gallery + photo/video lightbox
├─ services.html       Service details, how booking works, pricing note
├─ about.html          About Pyn Visuals
├─ contact.html        Booking inquiry form + direct contact
├─ reviews.html        Reviews panel + "Leave a review" form
├─ css/styles.css      All styling (colors, fonts, spacing at the top)
├─ js/config.js        ★ CONTENT: contact info, logo, form, hero, services, portfolio
├─ js/components.js    Shared header + footer (built from config.js)
├─ js/gallery.js       Work cards, filters, lightbox
├─ js/main.js          Hero video, services lists, scroll reveal
├─ js/inquiry-form.js  Form validation + sending
├─ js/reviews.js       Scrolling reviews panel + review form
├─ assets/
│  ├─ brand/           Logo (ink-black PV mark + original file)
│  ├─ images/hero/     hero.jpg  (placeholder)
│  ├─ images/portfolio/ placeholder-*.jpg (placeholders)
│  ├─ images/about/    about.jpg (placeholder)
│  ├─ video/           Put MP4s here (optional)
│  └─ social/          og-image.jpg (link preview image)
└─ serve.ps1           Optional local preview server
```

## Run it

**Quickest:** double-click `index.html`. It opens in your browser and everything works.

**Like a real web server (optional):** in PowerShell, from this folder:

```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```

Then open http://localhost:8080. Press Ctrl+C to stop.

## Put it online

Any static host works. Upload the whole folder:

- **Netlify:** drag the `pyn-visuals-site` folder onto https://app.netlify.com/drop
- **GitHub Pages:** push this folder to a repo (GitHub Desktop works), then Settings → Pages → deploy from branch.
- **Cloudflare Pages / Vercel:** "static site", no build command, output folder = root.

**Live site:** https://haydenp0130.github.io/pyn-visuals-site/ (GitHub Pages, from the `main` branch of
https://github.com/Haydenp0130/pyn-visuals-site). To update it: commit and push in GitHub Desktop.

If you move to a custom domain, update `og:url` and `og:image` in the `<head>` of each page to the new address
so link previews keep working on social apps.

## Connect the inquiry form (required before launch)

There's no backend, so the form needs a form service to deliver messages to your email.
**Until you do this, the form does not send anything.** Visitors are told so plainly and offered
your phone and Instagram instead. When you preview locally you'll also see a "Setup needed" note above the form.

1. Sign up at https://formspree.io (free tier) or a similar service (Basin, Getform…).
2. Create a form and set the email address you want inquiries sent to.
3. Copy the form's endpoint URL (looks like `https://formspree.io/f/abcdwxyz`).
4. Paste it into `js/config.js`:
   ```js
   inquiryForm: { endpoint: "https://formspree.io/f/abcdwxyz" },
   ```
5. Send yourself a test inquiry from the live site.

The form sends these fields: `name`, `email`, `phone`, `organization`, `projectType`, `dateStart`, `dateEnd`, `location`, `details`, plus `_subject` and a spam trap called `_gotcha` (Formspree understands both).
The success message only appears when the service actually confirms the message was received.

## Reviews

The home page and `reviews.html` show a scrolling panel of reviews, and `reviews.html` has a "Leave a review" form.

- **Nothing posts automatically.** Each submitted review is emailed to you through Formspree (the same form as inquiries, subject "New review: …"). The email says whether the person agreed to have it shown on the site.
- **To publish one:** copy it into the `reviews` list in `js/config.js` (the format is explained there), then commit and push. Newest first.
- While the list is empty, the panel shows a "Be the first to leave a review" card.
- To send reviews to a separate Formspree form, set `reviewForm.endpoint` in `js/config.js`.

## Adding and replacing work

Your photos and videos from `Desktop\portfolio` are on the site, converted for the web:
- **Photos:** resized to 2000px and compressed (camera files were 10–34 MB; web copies are ~120–540 KB). Camera metadata is removed.
- **Videos:** converted to 1080p H.264 MP4 (60 fps max, plays instantly) in `assets/video/`. Thumbnails are frames pulled from each clip (`*-thumb.jpg`).
- The originals in `Desktop\portfolio` were not changed.

To convert new videos the same way, CapCut's bundled ffmpeg works (example for a 16:9 clip):

```powershell
& "$env:LOCALAPPDATA\CapCut\Apps\9.7.1.4203\ffmpeg.exe" -i "INPUT.mov" -vf "scale=1920:-2,format=nv12" -c:v h264_amf -quality quality -rc vbr_peak -b:v 6M -maxrate 9M -c:a aac -b:a 160k -movflags +faststart "assets\video\NAME.mp4"
```

For long videos (over ~1 minute), consider uploading to YouTube or Vimeo and using `{ youtube: "…" }` / `{ vimeo: "…" }` instead, to keep the site light.

Remaining placeholders (clearly labeled) and how to replace them:

| What | File(s) to change |
|---|---|
| **More portfolio photos/videos** | Add images to `assets/images/portfolio/` (and MP4s to `assets/video/`), then add entries to the `portfolio` list in `js/config.js` (instructions are in the file). |
| **Filters** | Filters (Sports, Lacrosse, Business, Creative, Video) hide themselves when no item matches, and reappear when you add matching work. Add new ones in `portfolioFilters` in `js/config.js`. |
| **Video playback** | On each video item in `js/config.js`, set `video: { youtube: "…" }`, `{ vimeo: "…" }`, or `{ mp4: "assets/video/clip.mp4" }`. The image in `src` becomes the thumbnail. |
| **Home hero image** | Currently your "under the lights" photo. To change it, replace `assets/images/hero/hero.jpg` (~2400px wide), then update `hero.alt` / `hero.focus` in `js/config.js` and the `alt` on the hero `<img>` in `index.html`. |
| **Home hero video (optional)** | Put a short muted MP4 in `assets/video/` and set `hero.video` in `js/config.js`. It's skipped for visitors who prefer reduced motion. |
| **"Selected work" on Home** | Set `featured: true` on up to 3 portfolio items in `js/config.js`. |
| **Services page images** | `image` / `imageAlt` on each service in `js/config.js`. |
| **About photo & bio** | Photo: `assets/images/about/hayden-pyne.jpg` (portrait works best; update the `alt` in `about.html` if you swap it). Bio text is in `about.html`. Your age ("20-year-old") is written there too, so update it each year. |
| **Vector logo (optional)** | If you get an SVG version, put it in `assets/brand/` and change `logo.src` in `js/config.js`. |

**Image tips:** export JPG or WebP at roughly 2000px on the long edge and 200–500 KB each. Write `alt` text that describes what's actually in the photo.

## Edit text and contact details

| What | Where |
|---|---|
| Phone, Instagram, city, region | `business` in `js/config.js` (header, footer, and contact links update automatically). Also update the matching text in a few hard-coded lines in the HTML (search for `509-572-7469`) and the `telephone` in the `<script type="application/ld+json">` block in `index.html`. |
| Services, descriptions, "good fit for" lists | `services` in `js/config.js` |
| Project types in the form | `projectTypes` in `js/config.js` |
| Portfolio filters | `portfolioFilters` in `js/config.js` |
| Hero headline, home intro, booking steps, about text | Directly in `index.html`, `services.html`, `about.html` |
| Page titles, descriptions, share text | `<title>` and `<meta>` tags at the top of each `.html` file |
| Colors / fonts | Top of `css/styles.css` (`:root`) |

## Design notes

- **Palette:** ink black `#0C0D0F` (sampled from your logo), warm white `#F4F2EE`, and neutral grays. Your logo has no accent color, so the site doesn't use one. Buttons are ink or warm white.
- **Logo:** shown unaltered in ink black on the warm-white header. `pyn-visuals-logo-ink.png` is your original with only its white background made transparent and trimmed. The original is kept as `pyn-visuals-logo-original.jpg`. On dark areas (like the footer) the name is shown as text instead of recoloring the logo.
- **Type:** Archivo (headings use its wide, heavy style) + IBM Plex Mono for small labels, loaded from Google Fonts.
- **Motion:** gentle fade-ins and a slow hero settle. All of it is disabled for visitors with "reduce motion" turned on.
- **Accessibility:** skip link, keyboard-friendly menu, filters, and lightbox (arrow keys / Esc), visible focus styles, labeled form errors, and AA-or-better text contrast.
