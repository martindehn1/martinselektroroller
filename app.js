const grid = document.getElementById('productGrid');
const search = document.getElementById('productSearch');
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const jumpButtons = [...document.querySelectorAll('[data-jump-filter]')];
let activeFilter = 'all';

function escapeHtml(value=''){
  return value.replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[ch]));
}

function descriptionFor(product){
  const bits = [];
  if (product.speed) bits.push(product.speed);
  if (product.range) bits.push(`${product.range} Reichweite`);
  if (product.power) bits.push(product.power);
  return bits.join(' · ') || 'Mehr Details folgen in Martins persönlichem Test.';
}

function renderProducts(){
  const term = (search?.value || '').trim().toLowerCase();
  const filtered = window.PRODUCTS.filter(product => {
    const categoryMatch = activeFilter === 'all' || product.category === activeFilter;
    const textMatch = !term || `${product.name} ${product.category} ${product.speed} ${product.range} ${product.power}`.toLowerCase().includes(term);
    return categoryMatch && textMatch;
  });

  if(!filtered.length){
    grid.innerHTML = '<div class="empty-state">Kein passendes Modell gefunden. Versuch einen anderen Suchbegriff oder eine andere Kategorie.</div>';
    return;
  }

  grid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-visual">
        <span class="product-badge">${escapeHtml(product.category)}</span>
        <div class="mini-vehicle vehicle-silhouette" aria-hidden="true">
          <div class="wheel wheel-left"></div>
          <div class="wheel wheel-right"></div>
          <div class="vehicle-body"></div>
          <div class="vehicle-handle"></div>
        </div>
      </div>
      <div class="product-content">
        <h3 class="product-title">${escapeHtml(product.name)}</h3>
        <p class="product-desc">${escapeHtml(descriptionFor(product))}</p>
        <div class="spec-row">
          ${product.speed ? `<span class="spec">${escapeHtml(product.speed)}</span>` : ''}
          ${product.range ? `<span class="spec">${escapeHtml(product.range)}</span>` : ''}
          ${product.power ? `<span class="spec">${escapeHtml(product.power)}</span>` : ''}
        </div>
        <div class="price-row">
          <div class="price"><small>aktueller Listenpreis*</small><strong>${escapeHtml(product.price)}</strong></div>
          <a class="affiliate-button" href="${product.affiliate}" target="_blank" rel="sponsored nofollow noopener">Bei Futura ansehen ↗</a>
        </div>
      </div>
    </article>
  `).join('');
}

function setFilter(filter){
  activeFilter = filter;
  filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === filter));
  renderProducts();
}

filterButtons.forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));
search?.addEventListener('input', renderProducts);

jumpButtons.forEach(button => button.addEventListener('click', () => {
  setFilter(button.dataset.jumpFilter);
  document.getElementById('modelle')?.scrollIntoView({behavior:'smooth'});
}));

renderProducts();
