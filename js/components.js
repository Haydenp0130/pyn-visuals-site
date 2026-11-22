/* =========================================================================
   REUSABLE COMPONENTS
   <site-header current="home|portfolio|services|about|contact">
   <site-footer>
   Both read their details from js/config.js, so contact info and links
   only need to be changed in one place.
   ========================================================================= */

(function () {
  const site = window.PYN;
  const b = site.business;

  const NAV = [
    { key: "portfolio", label: "Work", href: "portfolio.html" },
    { key: "services", label: "Services", href: "services.html" },
    { key: "web-design", label: "Web Design", href: "web-design.html" },
    { key: "reviews", label: "Reviews", href: "reviews.html" },
    { key: "about", label: "About", href: "about.html" },
    { key: "contact", label: "Contact", href: "contact.html" },
  ];

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  window.PYN.esc = esc;

  const brandMarkup = (withLogo) => {
    const logo =
      withLogo && site.logo && site.logo.src
        ? `<img src="${esc(site.logo.src)}" alt="${esc(site.logo.alt)}" height="${site.logo.height || 26}" style="height:${site.logo.height || 26}px" /><span class="brand__divider" aria-hidden="true"></span>`
        : "";
    return `${logo}<span class="brand__word">Pyn <span>Visuals</span></span>`;
  };

  const current = (el, key) => (el.getAttribute("current") === key ? ' aria-current="page"' : "");

  class SiteHeader extends HTMLElement {
    connectedCallback() {
      const navLinks = NAV.map(
        (n) => `<li><a class="nav__link" href="${n.href}"${current(this, n.key)}>${n.label}</a></li>`
      ).join("");
      const mobileLinks = [{ key: "home", label: "Home", href: "index.html" }, ...NAV]
        .map((n) => `<li><a href="${n.href}"${current(this, n.key)}>${n.label}</a></li>`)
        .join("");

      this.innerHTML = `
        <a class="skip-link" href="#main">Skip to content</a>
        <header class="site-header">
          <div class="container site-header__bar">
            <a class="brand" href="index.html" aria-label="${esc(b.name)}, home">${brandMarkup(true)}</a>
            <nav class="nav" aria-label="Main">
              <ul class="nav__list">${navLinks}</ul>
              <a class="btn btn--sm" href="contact.html">Get a Quote</a>
            </nav>
            <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu">
              <span class="menu-toggle__label">Menu</span><span class="menu-toggle__icon" aria-hidden="true"></span>
            </button>
          </div>
        </header>
        <div class="mobile-menu" id="mobile-menu" hidden>
          <nav aria-label="Mobile">
            <ul class="mobile-menu__list">${mobileLinks}</ul>
          </nav>
          <div class="mobile-menu__foot">
            <a class="btn" href="contact.html">Get a Quote</a>
            <div class="mobile-menu__contact mono">
              <a href="tel:${esc(b.phoneHref)}">${esc(b.phoneDisplay)}</a>
              <a href="${esc(b.instagramUrl)}" target="_blank" rel="noopener">Instagram ${esc(b.instagramHandle)}</a>
            </div>
          </div>
        </div>`;

      const header = this.querySelector(".site-header");
      const toggle = this.querySelector(".menu-toggle");
      const menu = this.querySelector(".mobile-menu");
      const label = this.querySelector(".menu-toggle__label");

      const setOpen = (open) => {
        toggle.setAttribute("aria-expanded", String(open));
        label.textContent = open ? "Close" : "Menu";
        menu.hidden = !open;
        document.body.classList.toggle("menu-open", open);
      };
      toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !menu.hidden) { setOpen(false); toggle.focus(); }
      });
      menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
      window.matchMedia("(min-width: 1121px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });

      const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  }

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      const year = new Date().getFullYear();
      this.innerHTML = `
        <footer class="site-footer">
          <div class="container site-footer__top">
            <div>
              <a class="brand" href="index.html" aria-label="${esc(b.name)}, home">${brandMarkup(false)}</a>
              <p class="site-footer__blurb">Sports, lacrosse, and business photo + video, plus web design and marketing. Based in ${esc(b.city)}, ${esc(b.stateLong)}. Serving the ${esc(b.region)} and available for travel.</p>
            </div>
            <div>
              <h2>Site</h2>
              <ul>
                <li><a href="index.html">Home</a></li>
                ${NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join("")}
              </ul>
            </div>
            <div>
              <h2>Contact</h2>
              <ul>
                <li><a href="tel:${esc(b.phoneHref)}">${esc(b.phoneDisplay)}</a></li>
                <li><a href="${esc(b.instagramUrl)}" target="_blank" rel="noopener">Instagram ${esc(b.instagramHandle)}</a></li>
                <li><a href="contact.html">Contact us</a></li>
              </ul>
            </div>
          </div>
          <div class="container site-footer__bottom">
            <span>&copy; ${year} ${esc(b.name)}</span>
            <span>${esc(b.city)}, ${esc(b.state)} &middot; ${esc(b.region)}</span>
          </div>
        </footer>`;
    }
  }

  customElements.define("site-header", SiteHeader);
  customElements.define("site-footer", SiteFooter);
})();
