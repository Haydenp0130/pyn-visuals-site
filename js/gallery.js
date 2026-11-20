/* =========================================================================
   GALLERY: work cards, portfolio filters, and the photo/video lightbox.
   Content comes from window.PYN.portfolio in js/config.js.
   ========================================================================= */

(function () {
  const site = window.PYN;
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ICONS = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5z" fill="currentColor"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>',
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4l-8 8 8 8" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4l8 8-8 8" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>',
  };

  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const categoryLabel = (item) => {
    const cats = item.categories || [];
    const specific = cats.find((c) => c !== "sports");
    return cap(specific || cats[0] || "");
  };
  const metaLabel = (item) => `${categoryLabel(item)} · ${item.type === "video" ? "Video" : "Photo"}`;

  /* ---------- Work card (shared markup) ---------- */
  function workCard(item, index, { uniform = false } = {}) {
    // `ratio` (e.g. "2000 / 1237") sets an exact tile shape; otherwise `aspect` picks a preset
    const ratio = uniform || item.ratio ? "" : ` ratio-${item.aspect || "landscape"}`;
    const ratioStyle = !uniform && item.ratio ? ` style="aspect-ratio:${esc(item.ratio)}"` : "";
    const kind = item.type === "video" ? "video" : "photo";
    const label = `Open ${item.title}, ${kind}${item.placeholder ? ", placeholder" : ""}`;
    return `
      <button class="work-card" type="button" data-index="${index}" aria-label="${esc(label)}">
        <div class="work-card__frame${ratio}"${ratioStyle}>
          <img src="${esc(item.src)}" alt="${esc(item.alt)}" loading="lazy" decoding="async" />
          ${item.placeholder ? '<div class="work-card__badges"><span class="tag">Placeholder</span></div>' : ""}
          ${item.type === "video" ? `<span class="work-card__play">${ICONS.play}</span>` : ""}
        </div>
        <div class="work-card__caption">
          <span class="work-card__title">${esc(item.title)}</span>
          <span class="work-card__meta">${esc(metaLabel(item))}</span>
        </div>
      </button>`;
  }

  /* ---------- Video source helpers ---------- */
  function youtubeId(v) {
    const m = String(v).match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : /^[\w-]{11}$/.test(v) ? v : null;
  }
  function vimeoId(v) {
    const m = String(v).match(/(\d{6,})/);
    return m ? m[1] : null;
  }

  /* ---------- Lightbox ---------- */
  class Lightbox {
    constructor() {
      this.items = [];
      this.index = 0;
      this.opener = null;
      this.el = document.createElement("dialog");
      this.el.className = "lightbox";
      this.el.setAttribute("aria-label", "Portfolio viewer");
      this.el.innerHTML = `
        <div class="lightbox__inner">
          <div class="lightbox__bar">
            <span class="lightbox__count" aria-live="polite"></span>
            <button class="lightbox__btn" type="button" data-close aria-label="Close viewer">${ICONS.close}</button>
          </div>
          <div class="lightbox__stage">
            <button class="lightbox__btn lightbox__nav lightbox__nav--prev" type="button" data-prev aria-label="Previous item">${ICONS.prev}</button>
            <div class="lightbox__media"></div>
            <button class="lightbox__btn lightbox__nav lightbox__nav--next" type="button" data-next aria-label="Next item">${ICONS.next}</button>
          </div>
          <div class="lightbox__caption">
            <span class="lightbox__title"></span>
            <span class="lightbox__meta"></span>
          </div>
        </div>`;
      document.body.appendChild(this.el);

      this.media = this.el.querySelector(".lightbox__media");
      this.el.querySelector("[data-close]").addEventListener("click", () => this.close());
      this.el.querySelector("[data-prev]").addEventListener("click", () => this.step(-1));
      this.el.querySelector("[data-next]").addEventListener("click", () => this.step(1));
      this.el.addEventListener("close", () => this.cleanup());
      this.el.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") this.step(-1);
        if (e.key === "ArrowRight") this.step(1);
      });
      // Click on the empty backdrop area closes
      this.el.addEventListener("click", (e) => {
        if (e.target === this.el || e.target.classList.contains("lightbox__stage")) this.close();
      });
      // Swipe on touch screens
      let x0 = null;
      this.el.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
      this.el.addEventListener("touchend", (e) => {
        if (x0 === null) return;
        const dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 50) this.step(dx < 0 ? 1 : -1);
        x0 = null;
      });
    }

    open(items, index, opener) {
      this.items = items;
      this.opener = opener || document.activeElement;
      this.show(index);
      if (typeof this.el.showModal === "function") this.el.showModal();
      else this.el.setAttribute("open", "");
      document.body.style.overflow = "hidden";
      this.el.querySelector("[data-close]").focus();
    }

    close() {
      if (typeof this.el.close === "function") this.el.close();
      else { this.el.removeAttribute("open"); this.cleanup(); }
    }

    cleanup() {
      this.media.innerHTML = ""; // stops any playing video
      document.body.style.overflow = "";
      if (this.opener && document.contains(this.opener)) this.opener.focus();
    }

    step(d) {
      if (this.items.length < 2) return;
      this.show((this.index + d + this.items.length) % this.items.length);
    }

    show(i) {
      this.index = i;
      const item = this.items[i];
      const multi = this.items.length > 1;
      this.el.querySelectorAll(".lightbox__nav").forEach((b) => (b.hidden = !multi));
      this.el.querySelector(".lightbox__count").textContent = `${String(i + 1).padStart(2, "0")} / ${String(this.items.length).padStart(2, "0")}`;
      this.el.querySelector(".lightbox__title").textContent = item.title + (item.placeholder ? " (placeholder)" : "");
      this.el.querySelector(".lightbox__meta").textContent = metaLabel(item);
      this.media.innerHTML = this.render(item);
    }

    render(item) {
      if (item.type !== "video") {
        return `<img src="${esc(item.full || item.src)}" alt="${esc(item.alt)}" />`;
      }
      const v = item.video || {};
      const auto = reduceMotion ? 0 : 1;
      if (v.youtube && youtubeId(v.youtube)) {
        return `<div class="lightbox__embed"><iframe src="https://www.youtube-nocookie.com/embed/${youtubeId(v.youtube)}?rel=0&autoplay=${auto}" title="${esc(item.title)}" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen></iframe></div>`;
      }
      if (v.vimeo && vimeoId(v.vimeo)) {
        return `<div class="lightbox__embed"><iframe src="https://player.vimeo.com/video/${vimeoId(v.vimeo)}?autoplay=${auto}&dnt=1" title="${esc(item.title)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
      }
      if (v.mp4) {
        return `<video src="${esc(v.mp4)}" poster="${esc(item.src)}" controls playsinline preload="metadata"${auto ? " autoplay" : ""} aria-label="${esc(item.title)}"></video>`;
      }
      // No video file yet: show the thumbnail with an honest message.
      return `
        <div class="lightbox__pending">
          <img src="${esc(item.src)}" alt="${esc(item.alt)}" />
          <div class="lightbox__pending-msg">
            <strong>Video coming soon</strong>
            <span>This is a placeholder. Add a YouTube, Vimeo, or MP4 link for this item in js/config.js.</span>
          </div>
        </div>`;
    }
  }

  let lightbox;
  const getLightbox = () => (lightbox ||= new Lightbox());

  /* ---------- Home: selected work ---------- */
  const featuredEl = document.querySelector("[data-featured-work]");
  if (featuredEl) {
    const featured = site.portfolio.filter((p) => p.featured).slice(0, 3);
    featuredEl.innerHTML = featured.map((item, i) => workCard(item, i, { uniform: true })).join("");
    featuredEl.addEventListener("click", (e) => {
      const card = e.target.closest(".work-card");
      if (card) getLightbox().open(featured, Number(card.dataset.index), card);
    });
  }

  /* ---------- Portfolio page: filters + gallery ---------- */
  const galleryEl = document.querySelector("[data-gallery]");
  if (galleryEl) {
    const items = site.portfolio;
    const filtersEl = document.querySelector("[data-filters]");
    const statusEl = document.querySelector("[data-gallery-status]");
    const matches = (item, f) => f === "all" || (f === "video" ? item.type === "video" : (item.categories || []).includes(f));

    // Build every tile once, then distribute them into columns (masonry).
    const holder = document.createElement("div");
    holder.innerHTML = items
      .map((item, i) => `<div class="gallery__item" data-reveal>${workCard(item, i)}</div>`)
      .join("");
    const tiles = [...holder.children];

    const ASPECT = { landscape: 3 / 2, tall: 2 / 3, portrait: 4 / 5, wide: 16 / 9, square: 1, vertical: 9 / 16 };
    const shapeOf = (item) => {
      if (item.ratio) {
        const [w, h] = String(item.ratio).split("/").map(Number);
        if (w && h) return w / h;
      }
      return ASPECT[item.aspect] || ASPECT.landscape;
    };
    const columnCount = () => (galleryEl.clientWidth >= 960 ? 3 : galleryEl.clientWidth >= 560 ? 2 : 1);

    let lastCols = 0;
    const layout = (force) => {
      const n = columnCount();
      if (n === lastCols && !force) return;
      lastCols = n;
      const cols = Array.from({ length: n }, () => {
        const c = document.createElement("div");
        c.className = "gallery__col";
        return c;
      });
      const heights = new Array(n).fill(0);
      const hiddenTiles = [];
      tiles.forEach((tile, i) => {
        if (tile.hidden) { hiddenTiles.push(tile); return; }
        const k = heights.indexOf(Math.min(...heights)); // shortest column
        cols[k].appendChild(tile);
        heights[k] += 1 / shapeOf(items[i]) + 0.15; // tile height + caption, relative to width
      });
      hiddenTiles.forEach((t) => cols[0].appendChild(t));
      galleryEl.replaceChildren(...cols);
    };
    layout(true);
    window.addEventListener("resize", () => layout(false), { passive: true });

    // Filters with no matching items are hidden (they reappear once you add work for them)
    filtersEl.innerHTML = site.portfolioFilters
      .map((f) => {
        const n = items.filter((it) => matches(it, f.value)).length;
        if (!n && f.value !== "all") return "";
        return `<button class="filter" type="button" data-filter="${esc(f.value)}" aria-pressed="false">${esc(f.label)}<span class="filter__count">${n}</span></button>`;
      })
      .join("");

    let active = "all";
    const apply = (f, announce) => {
      active = filtersEl.querySelector(`[data-filter="${CSS.escape(f)}"]`) ? f : "all";
      filtersEl.querySelectorAll(".filter").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === active)));
      let shown = 0;
      tiles.forEach((el, i) => {
        const ok = matches(items[i], active);
        el.hidden = !ok;
        if (ok) { shown++; el.classList.add("is-visible"); }
      });
      layout(true); // rebalance columns for the filtered set
      if (statusEl) {
        const label = site.portfolioFilters.find((x) => x.value === active).label;
        statusEl.textContent = announce ? `Showing ${shown} ${shown === 1 ? "item" : "items"}${active === "all" ? "" : ` in ${label}`}.` : "";
      }
    };

    filtersEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      apply(btn.dataset.filter, true);
      history.replaceState(null, "", btn.dataset.filter === "all" ? location.pathname : `#${btn.dataset.filter}`);
    });

    galleryEl.addEventListener("click", (e) => {
      const card = e.target.closest(".work-card");
      if (!card) return;
      const visible = items.filter((it) => matches(it, active));
      const clicked = items[Number(card.dataset.index)];
      getLightbox().open(visible, visible.indexOf(clicked), card);
    });

    apply(decodeURIComponent(location.hash.slice(1)) || "all", false);
  }
})();
