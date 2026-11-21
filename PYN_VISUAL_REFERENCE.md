---
title: Pyn Visuals Website — AI & Visual Reference
aliases:
  - Pyn Visuals Site Reference
  - Pyn Visuals Website Context
tags:
  - pyn-visuals
  - website
  - visual-reference
  - ai-context
  - obsidian
source: https://github.com/Haydenp0130/pyn-visuals-site
live_site: https://haydenp0130.github.io/pyn-visuals-site/
last_reviewed: 2026-11-21
---

# Pyn Visuals Website — AI & Visual Reference

> This file is a portable, Obsidian-friendly description of the complete Pyn Visuals website as implemented in this repository. Use it as grounding context for visual analysis, website redesigns, image selection, content edits, and code generation. The source files remain authoritative if this reference and the implementation ever disagree.

## 1. Project identity

**Brand:** Pyn Visuals  
**Owner / photographer / videographer:** Hayden Pyne  
**Business type:** Independent photo and video business  
**Home base:** Kennewick, Washington  
**Service area:** Tri-Cities (Kennewick, Pasco, Richland, West Richland) and travel  
**Main specialty:** Sports photography and videography, especially lacrosse  
**Other work:** Athlete and team highlights, business promotional content, social media video, creative and custom photo/video projects  
**Phone:** 509-572-7469  
**Instagram:** [@pynvisuals](https://www.instagram.com/pynvisuals/)  
**Live site:** [haydenp0130.github.io/pyn-visuals-site](https://haydenp0130.github.io/pyn-visuals-site/)  
**Repository:** [Haydenp0130/pyn-visuals-site](https://github.com/Haydenp0130/pyn-visuals-site)

### Brand voice

Direct, personal, confident, and grounded in real work. Copy is conversational and specific: games, tournaments, athletes, teams, local businesses, and actual project goals. Emphasize that Hayden works directly with the client, is based in Kennewick, serves the Tri-Cities, can travel, and provides custom quotes. Avoid inflated agency language, generic claims, invented client results, fixed package prices, guaranteed deliverables, or promises not present in the source.

## 2. Visual design language

### Overall impression

Editorial sports and creative portfolio. The look is restrained and high contrast: warm paper backgrounds, deep ink sections, large condensed uppercase headlines, small technical labels, strong photography, and thin rules. It should feel contemporary, clean, cinematic, and premium without looking flashy or corporate. The logo is monochrome; there is no bright brand accent color.

### Color tokens

| Role | Value | Use |
|---|---|---|
| Ink | `#0C0D0F` | Main text, dark sections, primary buttons |
| Ink 2 | `#16171A` | Dark image/card surfaces |
| Ink 3 | `#232428` | Hover state on dark buttons |
| Warm paper | `#F4F2EE` | Main page background, light button text |
| Paper 2 | `#EBE8E2` | Alternate warm section background |
| Gray 700 | `#46443F` | Body text on paper |
| Gray 500 | `#67645E` | Muted text, labels on paper |
| Light line | `#D8D4CC` | Dividers on paper |
| Muted on ink | `#A7A49D` | Secondary text on dark sections |
| Error | `#9B2C22` | Form errors only |

### Typography

- **Archivo** is the main sans family. Use wide/heavy bold uppercase display lettering for major headings and a clear sans for body text.
- **IBM Plex Mono** is used for eyebrows, metadata, counters, footer headings, and technical details.
- Eyebrows are uppercase mono labels with generous tracking and a short horizontal rule before the text.
- Display headings are uppercase, very bold, tightly tracked, and compact in line height.
- Body copy is readable, warm, and not overly dense. Use muted gray for supporting text.

### Shape, spacing, and responsive layout

- Content max width: 1360px; fluid page gutters; generous vertical section spacing.
- Mostly square corners: 2px radius. Keep borders thin and understated.
- Buttons are uppercase, rectangular, and at least 52px tall; primary actions use ink on paper or paper on ink. Secondary links use an underline and a small arrow.
- Grid layouts use 12-column or split-column structures on desktop, then stack cleanly on mobile.
- Header is sticky with a translucent warm-white surface. Desktop nav collapses to a full-screen warm-paper mobile menu at 860px and below.
- Portfolio uses a masonry-style gallery with natural image ratios; the home page's selected-work section is one larger tile with two stacked tiles at desktop widths.

### Photography and image direction

Use the actual photography as the visual center. The work includes dramatic night lacrosse under stadium lights, game action and celebrations, football moments, black-and-white sports frames, golden-hour portraits, travel imagery, automotive content, and real local-business/detailing content. Crop intentionally around the subject and preserve visible equipment, faces, and action. The hero image is a lacrosse player's side profile in a white helmet under stadium lights; on wide screens it is shifted to the right so the headline has open dark space on the left. Overlays add a dark bottom gradient, softer left gradient, and subtle grain.

Do not replace Pyn Visuals branding with a different logo, invent client/team marks, add saturated accent colors, or use generic stock imagery when the real assets are available.

## 3. Site map and page-by-page content

Global navigation: **Work**, **Services**, **About**, **Contact**. The logo/wordmark goes to Home. Desktop header includes a **Book a Shoot** button. Mobile navigation includes Home and the same destinations. All pages have the same footer with business summary, site links, phone, Instagram, booking inquiry, current year, and location.

### Home — `index.html`

**Purpose:** Immediate brand impression, selected work, service overview, and booking conversion.

1. **Hero:** Full-height cinematic night lacrosse photo. Small label: “Sports photo + video · Kennewick, WA.” Coordinates and location: “46.21° N / 119.14° W” and “Kennewick, WA / Tri-Cities.” Main headline: **“The moments that matter. Captured.”** Supporting copy: “Lacrosse and sports coverage, highlight content, and promotional media for teams, athletes, and businesses across the Tri-Cities and beyond.” Actions: **Book a Shoot** and **View the work**.
2. **Intro:** Eyebrow/name: “Pyn Visuals.” Statement: “An independent photo and video business in Kennewick, Washington, built around sports, especially lacrosse. Also creating promotional and social content for businesses across the Tri-Cities, and anywhere a project calls for it.” Fact row: Based in Kennewick, WA; Serving the Tri-Cities; Travel available; Focus sports and lacrosse.
3. **Selected work:** Dark background. Eyebrow “Selected work.” Heading: **“On the field and behind the brand.”** Three items are selected with `featured: true` in `js/config.js`: Trophy night, Summer tournament clip, and Mobile detailing, on the job. Link: **Full portfolio**.
4. **Services overview:** Heading **“What we shoot.”** Copy: “Every project is different, so every quote is custom. Tell us what you need and we'll put together the right coverage.” Four numbered service rows link to their matching service detail.
5. **Booking CTA:** Dark band. “Got a game, tournament, or project coming up?” Action: **Start a Project**. Also shows phone and Instagram.

### Work / Portfolio — `portfolio.html`

**Purpose:** Browse work and open photos/videos at a larger size. Page title **“The work.”** Intro: “Photo and video from the field and for local businesses. Select any piece to view it larger or play the video.” Filter controls: **All, Sports, Lacrosse, Business, Creative, Video**. The image grid uses portfolio data from `js/config.js`. Selecting a photo opens it in an accessible lightbox; selecting a video opens playback. Footer note links to Instagram. Final CTA: **“Like what you see? Let's plan yours.”** with **Book a Shoot** and phone link.

### Services — `services.html`

**Purpose:** Explain work types and booking process; invite a custom quote. Page title **“What we shoot.”** Intro: “Sports first, lacrosse especially, with room for business and custom projects. Every job is quoted individually, so reach out with your details for a custom quote.”

Four services, generated from `js/config.js`:

1. **Sports & lacrosse coverage** — “Photo and video at games, tournaments, and events, built around the plays that decide them.” Lacrosse is the main focus; other sports are welcome. Coverage can be photo, video, or both and is shaped around schedule, venue, and intended use. Good fit for single games/full tournament weekends; teams, clubs, school programs, event organizers; families and athletes.
2. **Player & team highlights** — “Highlight content that shows what a player or team can do, cut for recruiting, recaps, or social.” Projects can use footage shot at games or a dedicated session; format, length, and style are planned during inquiry. Good fit for recruiting, season/tournament recaps, and team/club social channels.
3. **Business promo & social content** — “Photo and short-form video that shows what your business does and who's behind it.” Promotional photos, brand videos, and social-first clips for businesses and organizations, planned for websites, ads, or social. Good fit for Tri-Cities businesses, vertical video for Instagram/TikTok/Reels, and websites, menus, listings, and promotions.
4. **Custom photo & video projects** — “Something that doesn't fit a box? Share the idea and it can be scoped together.” Events, portraits, creative concepts, and other projects. Good fit for one-off shoots, creative/passion projects, and mixed photo/video ideas.

Booking process: **Send an inquiry → Talk it through → Get a custom quote → Confirm and shoot.** Pricing section says every project gets its own quote; coverage, travel, and intended use shape the price. CTA: **Request a Quote** or call/text 509-572-7469.

### About — `about.html`

**Purpose:** Introduce Hayden personally and establish local presence. Page title **“Hayden Pyne.”** Portrait shows Hayden at night in front of basalt rocks, wearing a black hoodie. Intro in source: “I'm Hayden, a 20-year-old photographer and videographer based in Kennewick, Washington, and the person behind Pyn Visuals.”

Main copy: “Photography and videography are what I love to do. I'm always chasing the frame that tells the whole story: the shot leaving the stick, the celebration after the whistle, the quiet moment under the lights before the game starts.” It says sports are the main focus, especially lacrosse; Hayden shoots games, tournaments, and highlight content and also creates promotional photos and short-form video for local businesses. Personal work includes portraits, cars, travel, and other things that catch the light. Pyn Visuals is independent; clients work with Hayden directly. He is based in Kennewick, works across the Tri-Cities, and is open to travel. Every project starts with a conversation.

Then three pillars: **Sports & lacrosse** (game/tournament coverage, player/team highlights); **Businesses** (promotional photos/video and short-form social content); **Custom projects** (events, creative ideas, and other photo/video requests). Location section: **“Kennewick-based. Ready to travel.”** Lists Kennewick, Pasco, Richland, West Richland, and travel. Final CTA: **“Let's make something worth watching.”** with **Book a Shoot** and Instagram.

> The age phrase is currently hard-coded in the About page and SEO description. Treat “20-year-old” as source copy that may need updating before reusing; do not present it as independently verified.

### Contact / Book a Shoot — `contact.html`

**Purpose:** Collect project information and give direct contact options. Page title **“Book a shoot.”** Intro: “Tell us about your game, event, or project. You'll hear back to talk through details, availability, and a custom quote.”

Inquiry form fields: name (required), email (required), phone (optional), organization (optional), project type (required), location (optional), start/end date (optional), project details (required), and hidden spam-trap field. Project-type options: Lacrosse game coverage; Tournament or event coverage; Other sports coverage; Player or team highlights; Business promotional content; Social media video; Custom photo/video project; Not sure yet. Form confirms that an inquiry is not a booking; the date is reserved only after direct confirmation. Errors are shown beside fields and in a summary. If configured, the form sends through a hosted form endpoint; source currently uses Formspree integration configured in `js/config.js`. Direct contact card shows phone, Instagram, Kennewick base, and Tri-Cities + travel. The page explains that pricing is custom.

## 4. Portfolio inventory

There are **25 items** in the configured gallery: **19 photos and 6 videos**. Video thumbnails use image assets. Categories drive filters; a secondary label such as “Football,” “Portraits,” “Automotive,” or “Travel” may display even when the matching broad filter is Sports or Creative.

| Title | Kind | Category | Asset / visual description |
|---|---|---|---|
| Trophy night | Photo, featured | Sports / Lacrosse | `lacrosse-team-trophy.jpg` — white and green lacrosse team gathered under lights; player holds trophy |
| Under the moon | Photo | Sports / Football | `football-under-the-moon.jpg` — red-uniformed player under a stadium light, moon in the sky |
| Summer tournament clip | Video, featured | Sports / Lacrosse | `summer-tournament-clip-thumb.jpg` / `summer-tournament-clip.mp4` — teal attacker shooting against orange goalie |
| Mobile detailing, on the job | Photo, featured | Business | `business-detailing-at-work.jpg` — two detailers work on red car in driveway |
| Shot on goal | Photo | Sports / Lacrosse | `lacrosse-shot-on-goal.jpg` — white #17 shooting while red defenders close in |
| Sideline focus | Photo | Sports / Football | `football-sideline-focus.jpg` — red #5 adjusting helmet strap in front of stands |
| Under the lights | Photo | Sports / Lacrosse | `lacrosse-under-the-lights.jpg` — white helmet in stadium light; also hero photo |
| Golden field portrait | Photo | Portraits / Creative | `creative-field-portrait.jpg` — woman in white dress in sunlit tall grass |
| Behind-the-back x2, Boise | Video | Sports / Lacrosse | `boise-lacrosse-btb-thumb.jpg` / `boise-lacrosse-btb.mp4` — players battling by goal in daylight |
| Walk-off at sunset | Photo | Sports | `sports-walk-off-sunset.jpg` — red-uniformed players walking toward low sun with long shadows |
| Night game portrait | Photo | Sports / Lacrosse | `lacrosse-night-portrait.jpg` — dark-uniformed player alone under lights with stick raised |
| Detailing crew portrait | Photo | Business | `business-detailing-crew.jpg` — detailer from behind in black branded hoodie beside truck |
| Lacrosse in the pines | Photo | Sports / Lacrosse | `lacrosse-in-the-pines.jpg` — white helmet and gold shorts against pine trees |
| Sixes League, week 2 | Video | Sports / Lacrosse | `sixes-league-week-2-thumb.jpg` / `sixes-league-week-2.mp4` — sunny turf field and team tent |
| Ball carrier | Photo | Sports / Football | `football-ball-carrier-bw.jpg` — black-and-white ball carrier cutting past defender and crowd |
| Car feature, golden hour | Photo | Automotive / Creative | `creative-car-feature.jpg` — three-frame white sedan montage on country roads at sunset |
| Light beam | Photo | Sports / Lacrosse | `lacrosse-black-and-white.jpg` — black-and-white player in mesh pinnie with beam across dark sky |
| Player highlight, golden hour | Video | Sports / Lacrosse | `player-highlight-golden-hour-thumb.jpg` / `.mp4` — red/white players in evening light |
| Detailing social post | Photo | Business | `business-detailing-social-post.jpg` — social collage of crew cleaning red SUV, steam cleaner, branded hoodies |
| Number 53 | Photo | Sports / Football | `football-number-53-bw.jpg` — black-and-white portrait of football player #53 |
| Motion study | Photo | Sports / Football | `football-motion-study.jpg` — black-and-white motion-blurred sprinting player |
| Cinematic game edit | Video | Sports / Lacrosse | `cinematic-game-edit-thumb.jpg` / `.mp4` — purple #13 in front of goal |
| Golden hour silhouette | Photo | Creative | `creative-golden-hour-silhouette.jpg` — person by window as sun glows through sheer curtains |
| City light trails | Photo | Travel / Creative | `creative-city-light-trails.jpg` — long exposure, palm-lined city street and traffic trails |
| Multnomah Falls | Video | Travel / Creative | `multnomah-falls-thumb.jpg` / `multnomah-falls.mp4` — person in front of waterfall |

## 5. Functionality and interaction model

- Static site: plain HTML, CSS, and JavaScript; no framework, build step, or package install.
- `js/config.js` is the central content source for business contact details, logo, hero, services, form project types, filters, and portfolio records.
- `js/components.js` creates shared responsive header/footer and brand markup. Current page gets `aria-current="page"`.
- `js/main.js` synchronizes phone/Instagram links, sets hero image/crop, optionally plays a hero MP4, creates service rows and detail sections, supports query-string form preselection, and reveals sections on scroll.
- `js/gallery.js` creates filter buttons and masonry cards. Filters hide themselves if no matching items exist. Native dialog lightbox supports image/video viewing, previous/next navigation, Escape/arrow keys, focus handling, and media cleanup.
- `js/inquiry-form.js` handles required-field checks, date range validation, honeypot, accessible error messaging, form submission and success/failure result states.
- Reduced-motion preference disables smooth scroll/reveal/hero animation and prevents optional background video. Hero video also respects data saver. Images use lazy loading where appropriate.
- Accessibility details include skip link, visible focus ring, semantic headings, alt text, labeled errors, live status announcements, keyboard-operable mobile navigation and lightbox, and responsive layouts.
- External font dependency: Google Fonts (Archivo and IBM Plex Mono). Static hosting target is GitHub Pages.

## 6. Source map

| Path | Responsibility |
|---|---|
| `index.html` | Home page structure and SEO/social metadata |
| `portfolio.html` | Filterable portfolio shell and booking CTA |
| `services.html` | Service intro, booking flow, custom quote copy |
| `about.html` | Hayden biography, focus areas, local coverage |
| `contact.html` | Inquiry form and direct contact information |
| `css/styles.css` | Complete responsive design system and page styles |
| `js/config.js` | Main site content, portfolio data, service data, contacts |
| `js/components.js` | Shared header, mobile menu, footer, HTML escaping |
| `js/main.js` | Hero, services, contact links, motion/reveal behavior |
| `js/gallery.js` | Portfolio rendering, filtering, lightbox |
| `js/inquiry-form.js` | Validation, submission, success/error states |
| `assets/brand/` | Original and transparent ink logo |
| `assets/images/hero/` | Hero photo |
| `assets/images/about/` | Owner portrait |
| `assets/images/portfolio/` | Portfolio photos and video thumbnails |
| `assets/video/` | Self-hosted MP4 portfolio videos |
| `assets/social/` | Social share image |

### Other shipped assets

- Brand: `assets/brand/pyn-visuals-logo-ink.png`, `assets/brand/pyn-visuals-logo-original.jpg`
- Icons/social: `assets/icon-512.png`, `assets/apple-touch-icon.png`, `assets/favicon-32.png`, `assets/social/og-image.jpg`
- Hero/about: `assets/images/hero/hero.jpg`, `assets/images/about/hayden-pyne.jpg`
- Video files: `boise-lacrosse-btb.mp4`, `multnomah-falls.mp4`, `cinematic-game-edit.mp4`, `player-highlight-golden-hour.mp4`, `summer-tournament-clip.mp4`, `sixes-league-week-2.mp4` (6 local videos total; all six are in portfolio config)

## 7. AI usage guidance

When creating or editing site material:

1. Preserve the real brand facts in section 1 and the design tokens in section 2.
2. Use the page map and exact current copy in section 3 to maintain consistency across pages.
3. Consult the portfolio inventory before selecting images or claiming what a visual shows.
4. Treat the code as the final source of truth. Before making changes, inspect the relevant HTML, `js/config.js`, and CSS rather than assuming this reference is newer.
5. Keep visual output photo-led, monochrome, editorial, spacious, responsive, and accessible.
6. Use exact relative asset paths from the repository. Do not invent filenames or external links.
7. For a major redesign, preserve the booking route, phone/Instagram access, custom-quote messaging, and mobile navigation.

## 8. Obsidian notes

This file uses YAML front matter, tags, tables, and standard Markdown links. It can be placed directly into an Obsidian vault as one reference note. Suggested related notes: `[[Pyn Visuals Brand]]`, `[[Pyn Visuals Website Pages]]`, `[[Pyn Visuals Portfolio Assets]]`, and `[[Pyn Visuals Services]]`. These are optional note names and do not imply those notes already exist.

---

*Reference created from the repository source and configured assets on 2026-11-21.*
