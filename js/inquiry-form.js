/* =========================================================================
   BOOKING INQUIRY FORM
   -------------------------------------------------------------------------
   IMPORTANT: This is a static site with no backend. The form can only
   deliver messages once a form service endpoint is set in js/config.js
   (window.PYN.inquiryForm.endpoint). See README.md → "Connect the form".

   - Endpoint set:   the form POSTs to it and shows a success message ONLY
                     if the service responds OK.
   - Endpoint empty: the form validates, then tells the visitor plainly
                     that nothing was sent and offers text / Instagram /
                     copy-to-clipboard instead. It never claims success.
   ========================================================================= */

(function () {
  const form = document.querySelector("[data-inquiry-form]");
  if (!form) return;

  const site = window.PYN;
  const b = site.business;
  const endpoint = (site.inquiryForm && site.inquiryForm.endpoint || "").trim();
  const isLocal = location.protocol === "file:" || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);

  const $ = (sel) => form.querySelector(sel);
  const resultEl = document.querySelector("[data-form-result]");
  const summaryEl = $("[data-error-summary]");
  const submitBtn = $('button[type="submit"]');

  /* Project type options from config, with ?type=... preselect */
  const select = $("#project-type");
  select.insertAdjacentHTML(
    "beforeend",
    site.projectTypes.map((t) => `<option value="${site.esc(t.value)}">${site.esc(t.label)}</option>`).join("")
  );
  const preset = new URLSearchParams(location.search).get("type");
  if (preset && site.projectTypes.some((t) => t.value === preset)) select.value = preset;

  /* Setup reminder for the site owner (only visible when previewing locally) */
  if (!endpoint && isLocal) $("[data-setup-notice]").hidden = false;
  if (!endpoint) console.warn("[Pyn Visuals] Inquiry form is not connected. Set PYN.inquiryForm.endpoint in js/config.js.");

  /* ---------- Validation ---------- */
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const phoneOk = (v) => !v || v.replace(/\D/g, "").length >= 10;

  const rules = {
    name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
    email: (v) => (!v.trim() ? "Please enter your email address." : emailOk(v.trim()) ? "" : "Please enter a valid email, like name@example.com."),
    phone: (v) => (phoneOk(v) ? "" : "Please enter a full phone number, or leave it blank."),
    projectType: (v) => (v ? "" : "Please choose a project type."),
    dateEnd: (v) => {
      const start = $("#date-start").value;
      return v && start && v < start ? "The end date can't be before the start date." : "";
    },
    details: (v) => (v.trim().length >= 20 ? "" : "Please add a few details about the project (at least 20 characters)."),
  };

  function setError(input, msg) {
    const err = document.getElementById(`${input.id}-error`);
    if (err) err.textContent = msg;
    input.setAttribute("aria-invalid", msg ? "true" : "false");
  }

  function validateField(input) {
    const rule = rules[input.name];
    if (!rule) return "";
    const msg = rule(input.value);
    setError(input, msg);
    return msg;
  }

  // Validate on blur; clear errors as the visitor fixes them
  Object.keys(rules).forEach((name) => {
    const input = form.elements[name];
    input.addEventListener("blur", () => { if (input.value || input.getAttribute("aria-invalid") === "true") validateField(input); });
    input.addEventListener("input", () => { if (input.getAttribute("aria-invalid") === "true") validateField(input); });
  });
  $("#date-start").addEventListener("change", () => validateField($("#date-end")));

  function validateAll() {
    const errors = [];
    Object.keys(rules).forEach((name) => {
      const input = form.elements[name];
      const msg = validateField(input);
      if (msg) errors.push({ input, msg });
    });
    return errors;
  }

  function showSummary(errors) {
    if (!errors.length) { summaryEl.hidden = true; return; }
    summaryEl.innerHTML = `<strong>Please fix ${errors.length === 1 ? "1 field" : `${errors.length} fields`}:</strong><ul>${errors
      .map((e) => `<li><a href="#${e.input.id}">${site.esc(e.msg)}</a></li>`)
      .join("")}</ul>`;
    summaryEl.hidden = false;
    summaryEl.focus();
  }
  summaryEl.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    e.preventDefault();
    document.querySelector(a.getAttribute("href")).focus();
  });

  /* ---------- Plain-text copy of the inquiry (for the not-connected fallback) ---------- */
  function inquiryText() {
    const f = form.elements;
    const type = select.options[select.selectedIndex]?.text || "";
    const dates = [f.dateStart.value, f.dateEnd.value].filter(Boolean).join(" to ") || "Not set";
    const opt = (label, v) => (v.trim() ? `${label}: ${v.trim()}` : null);
    return [
      `Booking inquiry for ${b.name}`,
      opt("Name", f.name.value),
      opt("Email", f.email.value),
      opt("Phone", f.phone.value),
      opt("Organization", f.organization.value),
      `Project type: ${type}`,
      `Date(s): ${dates}`,
      opt("Location", f.location.value),
      "",
      f.details.value.trim(),
    ].filter((l) => l !== null).join("\n");
  }

  /* ---------- Result panels ---------- */
  function showResult(html) {
    resultEl.innerHTML = html;
    resultEl.hidden = false;
    form.hidden = true;
    const heading = resultEl.querySelector("h2");
    heading.setAttribute("tabindex", "-1");
    heading.focus();
    resultEl.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  function showSent(name) {
    showResult(`
      <p class="eyebrow">Inquiry sent</p>
      <h2 class="display" style="margin-top:1rem">Thanks, ${site.esc(name.split(" ")[0])}.</h2>
      <p>Your inquiry was sent to ${site.esc(b.name)}. You'll get a reply at the email address you provided to talk through details and pricing.</p>
      <p><strong>Please note:</strong> sending an inquiry doesn't confirm a booking. Your date is only reserved once it's confirmed directly with you.</p>
      <div class="form-result__actions">
        <a class="btn btn--ghost" href="portfolio.html">Browse the work</a>
        <a class="btn btn--ghost" href="${site.esc(b.instagramUrl)}" target="_blank" rel="noopener">Instagram ${site.esc(b.instagramHandle)}</a>
      </div>`);
  }

  function showNotConnected() {
    const text = inquiryText();
    const sms = `sms:${b.phoneHref}?&body=${encodeURIComponent(text)}`;
    showResult(`
      <p class="eyebrow">Not sent</p>
      <h2 class="display" style="margin-top:1rem">Your inquiry hasn't been sent.</h2>
      <p>Online inquiries aren't switched on yet, so this form couldn't deliver your message. Your details are below. Please text or call <a href="tel:${site.esc(b.phoneHref)}">${site.esc(b.phoneDisplay)}</a>, or send a DM on Instagram.</p>
      <div class="form-result__actions">
        <a class="btn" href="${sms}">Text this inquiry</a>
        <button class="btn btn--ghost" type="button" data-copy>Copy details</button>
        <a class="btn btn--ghost" href="${site.esc(b.instagramUrl)}" target="_blank" rel="noopener">Instagram</a>
      </div>
      <label class="visually-hidden" for="inquiry-copy">Your inquiry details</label>
      <textarea class="input" id="inquiry-copy" readonly>${site.esc(text)}</textarea>
      <p><button class="link-arrow" type="button" data-edit style="background:none;border:0;cursor:pointer;color:inherit">&larr; Back to the form</button></p>`);
    bindResultActions(text);
  }

  function bindResultActions(text) {
    const copyBtn = resultEl.querySelector("[data-copy]");
    if (copyBtn) copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = "Copied";
      } catch {
        const ta = resultEl.querySelector("textarea");
        ta.select();
        copyBtn.textContent = "Select & copy";
      }
    });
    const edit = resultEl.querySelector("[data-edit]");
    if (edit) edit.addEventListener("click", () => {
      resultEl.hidden = true;
      form.hidden = false;
      submitBtn.focus();
    });
  }

  function showSendError() {
    const err = $("[data-send-error]");
    err.innerHTML = `<strong>Your inquiry couldn't be sent.</strong>Something went wrong on our end or with your connection, so nothing was delivered. Please try again, or text or call <a href="tel:${site.esc(b.phoneHref)}">${site.esc(b.phoneDisplay)}</a>.`;
    err.hidden = false;
    err.focus();
  }

  /* ---------- Submit ---------- */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    $("[data-send-error]").hidden = true;

    const errors = validateAll();
    showSummary(errors);
    if (errors.length) return;

    // Spam trap: real visitors never fill this hidden field.
    if (form.elements._gotcha.value) return;

    if (!endpoint) { showNotConnected(); return; }

    submitBtn.disabled = true;
    const original = submitBtn.textContent;
    submitBtn.textContent = "Sending…";
    try {
      const data = new FormData(form);
      data.set("projectType", select.options[select.selectedIndex].text);
      data.set("_subject", `New inquiry: ${data.get("projectType")} (${data.get("name")})`);
      const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const name = form.elements.name.value.trim();
      form.reset();
      showSent(name);
    } catch (err) {
      console.error("[Pyn Visuals] Inquiry failed to send:", err);
      showSendError();
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = original;
    }
  });
})();
