(function () {
  const root = document.querySelector(".explorer");
  if (!root || !Array.isArray(window.PRODUCTS)) return;

  const products = window.PRODUCTS;
  const categoryOrder = [
    "Kabinenroller",
    "E-Roller",
    "E-Chopper",
    "Highspeed & 125er",
    "E-Motorrad & Enduro",
    "Quad",
    "E-Scooter",
  ];
  const categoryDescriptions = {
    Kabinenroller: "Wettergeschützt, kompakt und mit ganz eigenen Anforderungen",
    "E-Chopper": "Entspannt sitzen, markant auftreten",
    "E-Roller": "Für Stadt, Pendeln und Alltag",
    "Highspeed & 125er": "Für schnellere und längere Strecken",
    "E-Motorrad & Enduro": "Elektrisch und sportlicher unterwegs",
    Quad: "Vier Räder und ein besonderes Fahrgefühl",
    "E-Scooter": "Kompakt für kurze Wege",
  };
  const accents = {
    Kabinenroller: "accent-cabin",
    "E-Chopper": "accent-lime",
    "E-Roller": "accent-blue",
    "Highspeed & 125er": "accent-orange",
    "E-Motorrad & Enduro": "accent-red",
    Quad: "accent-sand",
    "E-Scooter": "accent-mint",
  };

  let activeCategory = "Alle";
  let query = "";
  let showAll = false;
  let compare = [];

  const categories = [
    "Alle",
    ...categoryOrder.filter((category) =>
      products.some((product) => product.category === category),
    ),
  ];

  function escapeHtml(value) {
    return String(value ?? "").replace(
      /[&<>'"]/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#039;",
          '"': "&quot;",
        })[character],
    );
  }

  function formatPrice(price) {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price);
  }

  function initials(name) {
    return name
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("");
  }

  function currentProducts() {
    const needle = query.trim().toLocaleLowerCase("de");
    return products.filter((product) => {
      const categoryMatches =
        activeCategory === "Alle" || product.category === activeCategory;
      const haystack = `${product.name} ${product.fullName} ${product.category}`
        .toLocaleLowerCase("de");
      return categoryMatches && (!needle || haystack.includes(needle));
    });
  }

  function card(product) {
    const selected = compare.includes(product.slug);
    const offerLabel = product.offerLabel || "Angebot";
    const offerRel = product.isAffiliate
      ? "sponsored nofollow noopener noreferrer"
      : "noopener noreferrer";
    const specs = [product.speed, product.range, product.power]
      .filter(Boolean)
      .map((spec) => `<span>${escapeHtml(spec)}</span>`)
      .join("");
    const visual = product.image
      ? `<img alt="${escapeHtml(product.name)} Elektroroller" loading="lazy" src="${escapeHtml(product.image)}">`
      : `<div class="product-monogram" aria-hidden="true">${escapeHtml(initials(product.name))}</div>`;
    const recommendation = product.recommendation
      ? `<p class="product-recommendation">${escapeHtml(product.recommendation)}</p>`
      : "";
    const sourceLink = product.sourceUrl
      ? `<a class="round-action" href="${escapeHtml(product.sourceUrl)}" target="_blank" rel="noopener noreferrer">Quelle ↗</a>`
      : "";

    return `
      <article class="product-card" id="modell-${escapeHtml(product.slug)}">
        <div class="product-visual ${accents[product.category] || "accent-sand"}">
          <div class="product-badges">
            <span>${
              product.category === "Kabinenroller"
                ? `Kabinenroller-Check${product.verifiedAt ? ` · ${escapeHtml(product.verifiedAt)}` : ""}`
                : "Datenblatt eingeordnet"
            }</span>
            <button aria-pressed="${selected}" class="compare-toggle${selected ? " selected" : ""}" data-compare="${escapeHtml(product.slug)}" type="button">
              ${selected ? "Ausgewählt" : "+ Vergleichen"}
            </button>
          </div>
          ${visual}
        </div>
        <div class="product-body">
          <p class="product-category">${escapeHtml(product.category)}</p>
          <h3>${escapeHtml(product.name)}</h3>
          <p class="product-fullname">${escapeHtml(product.fullName)}</p>
          ${recommendation}
          <div class="quick-specs">${specs}</div>
          <div class="product-footer">
            <div>
              <small>${product.verifiedAt ? `Preis geprüft ${escapeHtml(product.verifiedAt)}` : product.isAffiliate ? "Preis laut Partnerliste" : "Preis zuletzt erfasst"}</small>
              <strong>${formatPrice(product.price)}</strong>
            </div>
            <div class="product-actions">
              ${sourceLink}
              <a class="round-action round-action-dark" href="${escapeHtml(product.affiliateUrl)}" target="_blank" rel="${offerRel}">${escapeHtml(offerLabel)} ↗</a>
            </div>
          </div>
        </div>
      </article>`;
  }

  function comparePanel() {
    const selectedProducts = compare
      .map((slug) => products.find((product) => product.slug === slug))
      .filter(Boolean);

    if (!selectedProducts.length) return "";

    const columns = selectedProducts
      .map(
        (product) => `
          <article>
            <span>${escapeHtml(product.category)}</span>
            <h4>${escapeHtml(product.name)}</h4>
            <dl>
              <div><dt>Preis</dt><dd>${formatPrice(product.price)}</dd></div>
              <div><dt>Tempo</dt><dd>${escapeHtml(product.speed || "Auf Angebotsseite prüfen")}</dd></div>
              <div><dt>Reichweite</dt><dd>${escapeHtml(product.range || "Auf Angebotsseite prüfen")}</dd></div>
              <div><dt>Akku</dt><dd>${escapeHtml(product.battery || "Auf Angebotsseite prüfen")}</dd></div>
            </dl>
            <a href="${escapeHtml(product.sourceUrl || product.affiliateUrl)}" target="_blank" rel="${product.sourceUrl || !product.isAffiliate ? "noopener noreferrer" : "sponsored nofollow noopener noreferrer"}">${product.sourceUrl ? "Quelle öffnen" : `${escapeHtml(product.offerLabel || "Angebot")} öffnen`} →</a>
          </article>`,
      )
      .join("");

    return `
      <section class="compare-panel" id="direktvergleich" aria-live="polite">
        <div class="compare-panel-head">
          <div>
            <p class="eyebrow eyebrow-light">DEIN DIREKTVERGLEICH</p>
            <h3>${selectedProducts.length < 2 ? "Wähle noch ein Modell aus." : "Die wichtigsten Unterschiede auf einen Blick."}</h3>
          </div>
          <button data-clear-compare type="button">Auswahl leeren</button>
        </div>
        <div class="compare-columns">${columns}</div>
        <p class="compare-hint">Du kannst bis zu drei Modelle vergleichen.</p>
      </section>`;
  }

  function render() {
    const filtered = currentProducts();
    const visible = showAll ? filtered : filtered.slice(0, 9);
    const resultDescription =
      activeCategory === "Alle"
        ? ""
        : ` · ${categoryDescriptions[activeCategory] || ""}`;

    root.innerHTML = `
      <div class="explorer-toolbar">
        <div class="category-tabs" aria-label="Modelle nach Kategorie filtern">
          ${categories
            .map((category) => {
              const count =
                category === "Alle"
                  ? products.length
                  : products.filter((product) => product.category === category).length;
              return `<button class="category-tab${activeCategory === category ? " active" : ""}" data-category="${escapeHtml(category)}" type="button">${escapeHtml(category)} <span>${count}</span></button>`;
            })
            .join("")}
        </div>
        <label class="model-search">
          <span class="sr-only">Modelle durchsuchen</span>
          <input placeholder="Modell suchen" type="search" value="${escapeHtml(query)}">
          <span aria-hidden="true">⌕</span>
        </label>
      </div>
      <p class="explorer-result">${filtered.length} ${filtered.length === 1 ? "Modell" : "Modelle"}${escapeHtml(resultDescription)}</p>
      <div class="product-grid">${visible.map(card).join("")}</div>
      ${
        filtered.length
          ? ""
          : `<div class="empty-state"><strong>Kein Modell gefunden.</strong><span>Probiere einen anderen Namen oder setze den Filter zurück.</span><button data-reset type="button">Alle Modelle</button></div>`
      }
      ${
        filtered.length > 9
          ? `<button class="show-all" data-show-all type="button">${showAll ? "Weniger anzeigen" : `Alle ${filtered.length} Modelle anzeigen`}</button>`
          : ""
      }
      ${comparePanel()}`;
  }

  root.addEventListener("click", (event) => {
    const categoryButton = event.target.closest("[data-category]");
    if (categoryButton) {
      activeCategory = categoryButton.dataset.category;
      showAll = false;
      render();
      return;
    }

    const compareButton = event.target.closest("[data-compare]");
    if (compareButton) {
      const slug = compareButton.dataset.compare;
      compare = compare.includes(slug)
        ? compare.filter((item) => item !== slug)
        : [...compare.slice(-2), slug];
      render();
      return;
    }

    if (event.target.closest("[data-show-all]")) {
      showAll = !showAll;
      render();
      return;
    }

    if (event.target.closest("[data-clear-compare]")) {
      compare = [];
      render();
      return;
    }

    if (event.target.closest("[data-reset]")) {
      activeCategory = "Alle";
      query = "";
      showAll = false;
      render();
    }
  });

  root.addEventListener("input", (event) => {
    if (!event.target.matches(".model-search input")) return;
    query = event.target.value;
    showAll = false;
    render();
    const input = root.querySelector(".model-search input");
    if (input) {
      input.focus();
      input.setSelectionRange(query.length, query.length);
    }
  });

  document.addEventListener("click", (event) => {
    const modelLink = event.target.closest("[data-model-link]");
    if (!modelLink) return;
    const product = products.find(
      (candidate) => candidate.slug === modelLink.dataset.modelLink,
    );
    if (!product) return;
    event.preventDefault();
    activeCategory = product.category;
    query = product.name;
    showAll = true;
    render();
    requestAnimationFrame(() => {
      document
        .getElementById(`modell-${product.slug}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  render();
})();
