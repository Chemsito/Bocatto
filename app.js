const PRODUCTS = window.BOCATTO_PRODUCTS || [];

const WHATSAPP = '51967539019';
const state = { category: 'Todos', query: '', visible: 18 };
const catalog = document.querySelector('#catalog-grid');
const count = document.querySelector('#result-count');
const search = document.querySelector('#catalog-search');
const empty = document.querySelector('#catalog-empty');
const moreButton = document.querySelector('#load-more');
const filterWrap = document.querySelector('#category-filters');

const normalize = (value) => value.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const wa = (message) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

document.querySelectorAll('[data-whatsapp]').forEach((el) => {
  el.setAttribute('href', wa(el.dataset.whatsapp || 'Hola Bocatto, quisiera información sobre sus bocaditos para eventos.'));
});

const categories = ['Todos', ...new Set(PRODUCTS.map((p) => p.category))];
filterWrap.innerHTML = categories.map((category, i) => `<button type="button" class="filter-chip${i === 0 ? ' active' : ''}" data-category="${category}">${category}</button>`).join('');

filterWrap.addEventListener('click', (event) => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  state.category = button.dataset.category;
  state.visible = 18;
  filterWrap.querySelectorAll('.filter-chip').forEach((chip) => chip.classList.toggle('active', chip === button));
  render();
});

search.addEventListener('input', () => {
  state.query = search.value.trim();
  state.visible = 18;
  render();
});

moreButton.addEventListener('click', () => {
  state.visible += 18;
  render();
});

function productCard(product) {
  const priceRows = product.prices.map((p) => `<li><span>${p.label}</span><strong>${p.value}</strong></li>`).join('');
  const message = `Hola Bocatto, quisiera cotizar ${product.name}. ¿Me pueden confirmar disponibilidad y precio?`;
  const icon = product.category.includes('Premium') ? '✦' : product.category === 'Infantil' ? '♡' : product.category === 'Kekes' ? '◌' : product.category === 'Postres' ? '◇' : product.category === 'Especiales' ? '◆' : '·';
  return `<article class="product-card">
    <div class="product-card-top">
      <span class="product-icon" aria-hidden="true">${icon}</span>
      <span class="product-category">${product.category}</span>
    </div>
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <ul class="price-list">${priceRows}</ul>
    ${product.note ? `<small class="product-note">${product.note}</small>` : ''}
    <a class="card-cta" href="${wa(message)}" target="_blank" rel="noopener">Cotizar por WhatsApp <span>↗</span></a>
  </article>`;
}

function render() {
  const q = normalize(state.query);
  const filtered = PRODUCTS.filter((p) => {
    const matchesCategory = state.category === 'Todos' || p.category === state.category;
    const haystack = normalize([p.name,p.category,p.description,...p.tags].join(' '));
    return matchesCategory && (!q || haystack.includes(q));
  });
  const shown = filtered.slice(0, state.visible);
  catalog.innerHTML = shown.map(productCard).join('');
  count.textContent = `${filtered.length} opción${filtered.length === 1 ? '' : 'es'} encontrada${filtered.length === 1 ? '' : 's'}`;
  empty.hidden = filtered.length !== 0;
  moreButton.hidden = shown.length >= filtered.length;
}

render();

const menuButton = document.querySelector('#menu-button');
const nav = document.querySelector('#site-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded','false'); nav.classList.remove('open');
}));

document.querySelector('#year').textContent = String(new Date().getFullYear());
