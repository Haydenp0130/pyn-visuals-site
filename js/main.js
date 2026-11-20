/* =========================================================================
   SHARED PAGE BEHAVIOR
   - Fills contact links from js/config.js
   - Home hero media + services list
   - Services page blocks
   - Subtle scroll reveal (skipped when reduced motion is preferred)
   ========================================================================= */

(function () {
  const site = window.PYN;
  const b = site.business;
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Contact links: keep every page in sync with config ---------- */
  document.querySelectorAll('[data-link="phone"]').forEach((a) => {
    a.href = `tel:${b.phoneHref}`;
    if (!a.dataset.keepText) a.textContent = b.phoneDisplay;
  });
  document.querySelectorAll('[data-link="sms"]').forEach((a) => { a.href = `sms:${b.phoneHref}`; });
  document.querySelectorAll('[data-link="instagram"]').forEach((a) => {
    a.href = b.instagramUrl;
    if (!a.dataset.keepText) a.textContent = b.instagramHandle;
  });

  /* ---------- Home hero ---------- */
  const hero = document.querySelector("[data-hero]");
  if (hero && site.hero) {
    const img = hero.querySelector(".hero__media img");
    if (img && site.hero.image) { img.src = site.hero.image; img.alt = site.hero.alt || ""; }
    if (img && site.hero.focus) img.style.objectPosition = site.hero.focus;
    const tag = hero.querySelector(".hero__tag");
    if (tag) tag.hidden = !site.hero.placeholder;

    const saveData = navigator.connection && navigator.connection.saveData;
    if (site.hero.video && !reduceMotion && !saveData) {
      const v = document.createElement("video");
      Object.assign(v, { muted: true, loop: true, playsInline: true, autoplay: true, preload: "metadata" });
      v.setAttribute("muted", "");
      v.setAttribute("playsinline", "");
      v.setAttribute("aria-hidden", "true");
      v.poster = site.hero.image;
      v.src = site.hero.video;
      v.addEventListener("playing", () => img && (img.style.opacity = "0"), { once: true });
      hero.querySelector(".hero__media").appendChild(v);
    }
  }

  /* ---------- Home: services list ---------- */
  const rows = document.querySelector("[data-service-rows]");
  if (rows) {
    rows.innerHTML = site.services
      .map(
        (s, i) => `
        <li class="service-row" data-reveal>
          <a href="services.html#${esc(s.id)}">
            <span class="service-row__num">${String(i + 1).padStart(2, "0")}</span>
            <span class="h3">${esc(s.title)}</span>
            <span class="service-row__text">${esc(s.summary)}</span>
            <span class="service-row__arrow" aria-hidden="true">&rarr;</span>
          </a>
        </li>`
      )
      .join("");
  }

  /* ---------- Services page ---------- */
  const blocks = document.querySelector("[data-service-blocks]");
  if (blocks) {
    blocks.innerHTML = site.services
      .map(
        (s, i) => `
        <article class="service-block" id="${esc(s.id)}" aria-labelledby="${esc(s.id)}-title">
          <div class="container service-block__grid">
            ${s.image ? `<div class="service-block__media" data-reveal><img src="${esc(s.image)}" alt="${esc(s.imageAlt)}" loading="lazy" decoding="async" /></div>` : ""}
            <div data-reveal>
              <span class="service-block__num">${String(i + 1).padStart(2, "0")} / ${String(site.services.length).padStart(2, "0")}</span>
              <h2 class="display h2" id="${esc(s.id)}-title" style="font-size:clamp(1.9rem,3.6vw,3rem)">${esc(s.title)}</h2>
              <p class="service-block__summary">${esc(s.summary)}</p>
              <p class="service-block__desc">${esc(s.description)}</p>
              <p class="eyebrow fit-label">A good fit for</p>
              <ul class="fit-list">${s.fitFor.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
              <div class="service-block__cta">
                <a class="link-arrow" href="contact.html?type=${encodeURIComponent(s.projectType)}">Inquire about this <span class="arrow" aria-hidden="true">&rarr;</span></a>
              </div>
            </div>
          </div>
        </article>`
      )
      .join("");
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (!reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
})();
