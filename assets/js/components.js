// HEADER
class SiteHeader extends HTMLElement {
  connectedCallback() {
    const subtitle = this.dataset.subtitle || "";
    const root = this.dataset.root || "../";
    const active = this.dataset.active || "";
    const enableBack = this.dataset.enableBack === "true";
    const backHref = this.dataset.backHref || `${root}index.html`;

    this.innerHTML = `
      <header class="site-header">
        <div class="shell">
          <div class="header-left">
            ${enableBack ? `
            <button class="back-button" type="button">
              <svg viewBox="0 0 24 24" aria-hidden="true" class="back-icon">
                <path d="M15.5 19.5L8 12l7.5-7.5"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
              </svg>
              <span class="back-label">Zurück</span>
            </button>
            ` : ""}

            <div class="branding">
              <div class="logo-circle">
                <span class="logo-dot"></span>
              </div>
              <div class="brand-text">
                <span class="brand-title">Karate Technikbibliothek</span>
                <span class="brand-subtitle">${subtitle}</span>
              </div>
            </div>
          </div>

          <nav class="main-nav">
            <a href="${root}index.html" ${active === "start" ? 'aria-current="page"' : ""}>Start</a>
            <a href="${root}kihon/index.html" ${active === "kihon" ? 'aria-current="page"' : ""}>Kihon</a>
            <a href="${root}kata/index.html" ${active === "kata" ? 'aria-current="page"' : ""}>Kata</a>
          </nav>
        </div>
      </header>
    `;

    if (enableBack) {
      const btn = this.querySelector(".back-button");
      if (btn) {
        btn.addEventListener("click", () => {
          handleBack(backHref);
        });
      }
    }
  }
}

function handleBack(fallbackHref) {
  if (document.referrer) {
    try {
      const ref = new URL(document.referrer);
      if (ref.origin === window.location.origin) {
        history.back();
        return;
      }
    } catch {
      // ignore
    }
  }
  window.location.href = fallbackHref;
}

customElements.define("site-header", SiteHeader);


// FOOTER
class SiteFooter extends HTMLElement {
  connectedCallback() {
    // Du kannst später via data-Attribut andere Texte/Versionen setzen, falls nötig
    this.innerHTML = `
      <footer class="site-footer">
        <div class="shell footer-grid">
          <div class="footer-left">
            <span>© 2025 Markus Mock. Alle Rechte vorbehalten.</span>
            <span class="footer-note">
              Kata-Übersicht für interne Trainerarbeit.
            </span>
          </div>
          <div class="footer-right">
            <span>Kata · Version 0.1</span>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("site-footer", SiteFooter);