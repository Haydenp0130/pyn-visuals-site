/* =========================================================================
   REVIEWS
   - [data-reviews-panel]  Scrolling panel of reviews from js/config.js
   - [data-review-form]    "Leave a review" form (reviews.html)

   No backend: submitted reviews are emailed to you through the form
   service (PYN.reviewForm.endpoint, or the inquiry form's endpoint).
   They only appear on the site once you add them to PYN.reviews.
   ========================================================================= */

(function () {
  const site = window.PYN;
  const b = site.business;
  const esc = site.esc;
  const reviews = (site.reviews || []).filter((r) => r && r.text && r.name);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fmtDate = (d) => {
    const m = /^(\d{4})-(\d{1,2})/.exec(d || "");
    return m ? `${MONTHS[Number(m[2]) - 1] || ""} ${m[1]}`.trim() : "";
  };
  const stars = (n) => {
    const r = Math.max(0, Math.min(5, Math.round(Number(n) || 0)));
    if (!r) return "";
    return `<p class="review-card__stars" role="img" aria-label="${r} out of 5 stars">${"★".repeat(r)}<span class="review-card__stars-off">${"★".repeat(5 - r)}</span></p>`;
  };

  /* ---------- Panel ---------- */
  document.querySelectorAll("[data-reviews-panel]").forEach((panel) => {
    const formHref = panel.dataset.formHref || "reviews.html#leave-review";
    const track = document.createElement("ul");
    track.className = "reviews-track";
    track.setAttribute("tabindex", "0");
    track.setAttribute("aria-label", "Reviews. Scroll sideways to see more.");

    if (!reviews.length) {
      track.classList.add("reviews-track--empty");
      track.removeAttribute("tabindex");
      track.removeAttribute("aria-label");
      track.innerHTML = `
        <li class="review-card review-card--empty">
          <p class="eyebrow">No reviews yet</p>
          <p class="review-card__text">Worked with ${esc(b.name)} at a game, tournament, or shoot? Be the first to share how it went.</p>
          <a class="btn btn--sm" href="${esc(formHref)}">Leave a review</a>
        </li>`;
    } else {
      track.innerHTML = reviews
        .map((r) => {
          const meta = [r.org, r.project].filter(Boolean).map(esc).join(" &middot; ");
          const date = fmtDate(r.date);
          return `
          <li class="review-card">
            <div class="review-card__top">${stars(r.rating)}${date ? `<p class="review-card__date">${esc(date)}</p>` : ""}</div>
            <blockquote class="review-card__text"><p>${esc(r.text)}</p></blockquote>
            <footer class="review-card__foot">
              <p class="review-card__name">${esc(r.name)}</p>
              ${meta ? `<p class="review-card__meta">${meta}</p>` : ""}
            </footer>
          </li>`;
        })
        .join("");
    }
    panel.appendChild(track);

    /* Prev / next buttons (live in the section heading, if present) */
    const controls = document.querySelector(`[data-reviews-controls="${panel.id}"]`);
    if (!controls || !reviews.length) { if (controls) controls.hidden = true; return; }
    const prev = controls.querySelector("[data-prev]");
    const next = controls.querySelector("[data-next]");
    const step = () => {
      const card = track.querySelector(".review-card");
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
    };
    const behavior = reduceMotion ? "auto" : "smooth";
    prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior }));
    next.addEventListener("click", () => track.scrollBy({ left: step(), behavior }));
    const update = () => {
      const max = track.scrollWidth - track.clientWidth - 2;
      controls.hidden = max <= 0;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max;
    };
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  });

  /* ---------- Leave-a-review form ---------- */
  const form = document.querySelector("[data-review-form]");
  if (!form) return;

  const endpoint = ((site.reviewForm && site.reviewForm.endpoint) || (site.inquiryForm && site.inquiryForm.endpoint) || "").trim();
  const $ = (sel) => form.querySelector(sel);
  const resultEl = document.querySelector("[data-review-result]");
  const summaryEl = $("[data-error-summary]");
  const submitBtn = $('button[type="submit"]');

  const select = $("#review-project");
  select.insertAdjacentHTML(
    "beforeend",
    site.projectTypes.filter((t) => t.value !== "not-sure")
      .map((t) => `<option value="${esc(t.label)}">${esc(t.label)}</option>`).join("")
  );

  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const rules = {
    name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
    rating: () => (form.querySelector('input[name="rating"]:checked') ? "" : "Please choose a star rating."),
    review: (v) => (v.trim().length >= 20 ? "" : "Please write a little more (at least 20 characters)."),
    email: (v) => (!v.trim() || emailOk(v.trim()) ? "" : "Please enter a valid email, or leave it blank."),
  };
  const fieldFor = (name) => (name === "rating" ? $("#rating-1") : form.elements[name]);
  const errorIdFor = (name) => (name === "rating" ? "rating-error" : `${form.elements[name].id}-error`);

  function validateField(name) {
    const msg = rules[name](name === "rating" ? "" : form.elements[name].value);
    document.getElementById(errorIdFor(name)).textContent = msg;
    if (name === "rating") $("[data-rating]").setAttribute("aria-invalid", msg ? "true" : "false");
    else form.elements[name].setAttribute("aria-invalid", msg ? "true" : "false");
    return msg;
  }

  ["name", "review", "email"].forEach((name) => {
    const input = form.elements[name];
    input.addEventListener("blur", () => { if (input.value || input.getAttribute("aria-invalid") === "true") validateField(name); });
    input.addEventListener("input", () => { if (input.getAttribute("aria-invalid") === "true") validateField(name); });
  });
  form.querySelectorAll('input[name="rating"]').forEach((r) => r.addEventListener("change", () => validateField("rating")));

  /* Live character count for the review */
  const count = $("[data-review-count]");
  const reviewInput = form.elements.review;
  const updateCount = () => { count.textContent = `${reviewInput.value.length} / ${reviewInput.maxLength}`; };
  reviewInput.addEventListener("input", updateCount);
  updateCount();

  function showSummary(errors) {
    if (!errors.length) { summaryEl.hidden = true; return; }
    summaryEl.innerHTML = `<strong>Please fix ${errors.length === 1 ? "1 field" : `${errors.length} fields`}:</strong><ul>${errors
      .map((e) => `<li><a href="#${fieldFor(e.name).id}">${esc(e.msg)}</a></li>`).join("")}</ul>`;
    summaryEl.hidden = false;
    summaryEl.focus();
  }
  summaryEl.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    e.preventDefault();
    document.querySelector(a.getAttribute("href")).focus();
  });

  function showResult(html) {
    resultEl.innerHTML = html;
    resultEl.hidden = false;
    form.hidden = true;
    const heading = resultEl.querySelector("h2");
    heading.setAttribute("tabindex", "-1");
    heading.focus();
    resultEl.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" });
  }

  function showSendError(msg) {
    const err = $("[data-send-error]");
    err.innerHTML = `<strong>Your review couldn't be sent.</strong>${msg} You can also send it as a DM on Instagram at <a href="${esc(b.instagramUrl)}" target="_blank" rel="noopener">${esc(b.instagramHandle)}</a>.`;
    err.hidden = false;
    err.focus();
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    $("[data-send-error]").hidden = true;

    const errors = Object.keys(rules).map((name) => ({ name, msg: validateField(name) })).filter((x) => x.msg);
    showSummary(errors);
    if (errors.length) return;

    if (form.elements._gotcha.value) return; // spam trap

    if (!endpoint) {
      showSendError("Online reviews aren't switched on yet, so nothing was sent.");
      return;
    }

    submitBtn.disabled = true;
    const original = submitBtn.textContent;
    submitBtn.textContent = "Sending…";
    try {
      const data = new FormData(form);
      const rating = data.get("rating");
      data.set("formType", "Review");
      data.set("rating", `${rating} out of 5`);
      data.set("showOnSite", form.elements.consent.checked ? "Yes, OK to show on the website" : "No, keep private");
      data.delete("consent");
      data.set("_subject", `New review: ${rating}★ from ${data.get("name")}`);
      const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const name = form.elements.name.value.trim();
      form.reset();
      updateCount();
      showResult(`
        <p class="eyebrow">Review sent</p>
        <h2 class="display" style="margin-top:1rem">Thanks, ${esc(name.split(" ")[0])}.</h2>
        <p>Your review was sent to ${esc(b.name)}. Reviews are read before they're added to the site, so it may take a few days to show up.</p>
        <div class="form-result__actions">
          <a class="btn btn--ghost" href="portfolio.html">Browse the work</a>
          <a class="btn btn--ghost" href="index.html">Back to home</a>
        </div>`);
    } catch (err) {
      console.error("[Pyn Visuals] Review failed to send:", err);
      showSendError("Something went wrong with the connection, so nothing was delivered. Please try again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = original;
    }
  });
})();
