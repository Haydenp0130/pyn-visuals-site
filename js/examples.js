/* =========================================================================
   WEB DESIGN: example site previews
   - Desktop / Tablet / Phone buttons swap the virtual screen size
   - Each live <iframe> renders at that real width, then scales to fit its card
   - Arrow buttons page through the side-scrolling track
   ========================================================================= */

(function () {
  const root = document.querySelector("[data-examples]");
  if (!root) return;
  const track = root.querySelector(".ex-track");
  const buttons = [...root.querySelectorAll("[data-view]")].filter((b) => b.tagName === "BUTTON");
  const prev = root.querySelector("[data-ex-prev]");
  const next = root.querySelector("[data-ex-next]");
  const SIZES = { desktop: 1440, tablet: 820, phone: 390 };

  /* Scale every preview so its virtual page width fills the screen box */
  const rescale = () => {
    const w = SIZES[track.dataset.view];
    track.querySelectorAll(".ex-screen").forEach((screen) => {
      screen.style.setProperty("--s", (screen.clientWidth / w).toFixed(4));
    });
  };
  const ro = new ResizeObserver(rescale);
  track.querySelectorAll(".ex-screen").forEach((s) => ro.observe(s));

  const setView = (view) => {
    track.dataset.view = view;
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.view === view)));
    rescale();
    updateArrows();
  };
  buttons.forEach((b) => b.addEventListener("click", () => setView(b.dataset.view)));

  /* Arrows: move one card at a time */
  const step = () => {
    const card = track.querySelector(".ex-card");
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
  };
  function updateArrows() {
    const max = track.scrollWidth - track.clientWidth - 2;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max;
  }
  prev.addEventListener("click", () => track.scrollBy({ left: -step() }));
  next.addEventListener("click", () => track.scrollBy({ left: step() }));
  track.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows);

  /* Start in the view that matches the visitor's own screen */
  setView(window.matchMedia("(max-width: 700px)").matches ? "phone" : "desktop");
})();
