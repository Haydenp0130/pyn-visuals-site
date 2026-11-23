/* =========================================================================
   WEB DESIGN PRICING
   Builds every price on the site from PYN.webDesign in js/config.js:
   - [data-wd-packages]   the three package cards
   - [data-wd-sub]        the $0-upfront subscription band
   - [data-wd-compare]    the comparison table
   - [data-wd-extras]     additional costs list
   - [data-wd-text="…"]   single values used inside copy (FAQ, hero, home)
   Load it before main.js so the scroll-reveal picks up the new elements.
   ========================================================================= */

(function () {
  const site = window.PYN;
  const wd = site && site.webDesign;
  if (!wd) return;
  const esc = site.esc;
  const money = (n) => "$" + Number(n).toLocaleString("en-US");
  const packageHref = (id) => `contact.html?type=web-design&package=${encodeURIComponent(id)}`;
  const sub = wd.subscription;
  const firstYear = sub.monthly * sub.termMonths;
  const cheapest = wd.packages.reduce((a, p) => (p.upfront < a.upfront ? p : a), wd.packages[0]);
  const check = `<svg class="wd-check" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/></svg>`;

  /* ---------- Single values inside copy ---------- */
  const TEXT = {
    hourly: money(wd.hourlyRate),
    "from-upfront": money(cheapest.upfront),
    "from-monthly": money(cheapest.monthly),
    "sub-monthly": money(sub.monthly),
    "sub-term": String(sub.termMonths),
    "sub-first-year": money(firstYear),
  };
  document.querySelectorAll("[data-wd-text]").forEach((el) => {
    const v = TEXT[el.dataset.wdText];
    if (v != null) el.textContent = v;
  });

  /* ---------- Package cards ---------- */
  const cards = document.querySelector("[data-wd-packages]");
  if (cards) {
    cards.innerHTML = wd.packages
      .map((p) => {
        const titleId = `pkg-${esc(p.id)}-title`;
        return `
        <li class="wd-card${p.featured ? " wd-card--featured dark" : ""}" data-reveal>
          <article aria-labelledby="${titleId}">
            <div class="wd-card__top">
              <h3 class="wd-card__name" id="${titleId}">${esc(p.name)}</h3>
              ${p.featured ? `<span class="wd-card__badge">Most popular</span>` : ""}
            </div>
            <p class="wd-card__summary">${esc(p.summary)}</p>
            <div class="wd-price">
              <p class="wd-price__main">${p.startingAt ? `<span class="wd-price__from">Starting at</span>` : ""}<span class="wd-price__num">${money(p.upfront)}</span><span class="wd-price__unit">upfront</span></p>
              <p class="wd-price__monthly"><span class="wd-price__plus" aria-hidden="true">+</span><span class="visually-hidden">plus </span><strong>${money(p.monthly)}</strong>/month <span class="wd-price__label">hosting &amp; management</span></p>
            </div>
            <ul class="wd-list">${p.features.map((f) => `<li>${check}<span>${esc(f)}</span></li>`).join("")}</ul>
            ${p.note ? `<p class="wd-card__note">${esc(p.note)}</p>` : ""}
            <a class="btn ${p.featured ? "btn--light" : "btn--ghost"} wd-card__cta" href="${packageHref(p.id)}">${esc(p.cta)}<span class="visually-hidden">: ${esc(p.name)} package</span></a>
          </article>
        </li>`;
      })
      .join("");
  }

  /* ---------- Subscription ---------- */
  const subEl = document.querySelector("[data-wd-sub]");
  if (subEl) {
    subEl.innerHTML = `
      <div class="wd-sub__price">
        <p class="wd-price__main"><span class="wd-price__num">${money(sub.monthly)}</span><span class="wd-price__unit">/month</span></p>
        <p class="wd-sub__zero">${money(sub.upfront)} upfront · ${sub.termMonths}-month agreement</p>
      </div>
      <ul class="wd-list wd-list--two">${sub.features.map((f) => `<li>${check}<span>${esc(f)}</span></li>`).join("")}</ul>
      <p class="wd-sub__terms"><strong>${sub.termMonths}-month agreement required. First-year total: ${money(firstYear)}.</strong> Additional services, domain registration and third-party costs may apply.</p>
      <a class="btn btn--light" href="${packageHref(sub.id)}">${esc(sub.cta)}</a>`;
  }

  /* ---------- Comparison table ---------- */
  const compare = document.querySelector("[data-wd-compare]");
  if (compare) {
    const plans = [...wd.packages, sub];
    const cell = (v) => (v ? esc(v) : `<span class="wd-dash" aria-label="Not included">—</span>`);
    compare.innerHTML = `
      <table class="wd-table">
        <caption class="visually-hidden">What each web design package includes</caption>
        <thead>
          <tr>
            <td></td>
            ${plans.map((p) => `<th scope="col"${p.featured ? ' class="is-featured"' : ""}>${esc(p.name)}<span>${p.startingAt ? "From " : ""}${money(p.upfront)} + ${money(p.monthly)}/mo</span></th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${wd.compareRows
            .map(
              (r) => `<tr><th scope="row">${esc(r.label)}</th>${plans
                .map((p) => `<td data-label="${esc(p.name)}"${p.featured ? ' class="is-featured"' : ""}>${cell(p.compare[r.key])}</td>`)
                .join("")}</tr>`
            )
            .join("")}
        </tbody>
      </table>`;
  }

  /* ---------- Extras ---------- */
  const extras = document.querySelector("[data-wd-extras]");
  if (extras) extras.innerHTML = wd.extras.map((x) => `<li>${esc(x)}</li>`).join("");

  const compareNote = document.querySelector("[data-wd-compare-note]");
  if (compareNote) compareNote.textContent = wd.compareNote || "";

  /* ---------- Search engine data (prices stay in sync with config) ---------- */
  if (cards) {
    const offers = [...wd.packages, sub].map((p) => ({
      "@type": "Offer",
      name: `${p.name} website package`,
      description: p.summary,
      priceCurrency: "USD",
      price: p.upfront,
      priceSpecification: [
        { "@type": "UnitPriceSpecification", price: p.upfront, priceCurrency: "USD", name: "Upfront build fee" },
        { "@type": "UnitPriceSpecification", price: p.monthly, priceCurrency: "USD", unitCode: "MON", name: "Monthly hosting and management" },
      ],
      url: "https://pynvisuals.com/web-design.html#pricing",
    }));
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Website design and management",
      serviceType: "Small business website design",
      provider: { "@type": "LocalBusiness", name: site.business.name, telephone: site.business.phoneHref, address: { "@type": "PostalAddress", addressLocality: site.business.city, addressRegion: site.business.state, addressCountry: "US" } },
      areaServed: ["Kennewick, WA", "Richland, WA", "Pasco, WA", "Tri-Cities, WA"],
      offers,
    });
    document.head.appendChild(ld);
  }
})();
