/**
 * QA Playground - E-Commerce Practice Platform Engine
 */
let cart = [];
let wishlist = [];

const sampleProducts = [
  { id: 101, name: 'Automation Mechanical Keyboard', category: 'Hardware', price: 129.99, rating: 4.8, image: '⌨️' },
  { id: 102, name: 'Precision Wireless Gaming Mouse', category: 'Hardware', price: 69.99, rating: 4.7, image: '🖱️' },
  { id: 103, name: 'Dual 4K Monitor Arm Desk Mount', category: 'Accessories', price: 89.50, rating: 4.9, image: '🖥️' },
  { id: 104, name: 'Noise-Canceling Test Headset', category: 'Audio', price: 149.00, rating: 4.6, image: '🎧' },
  { id: 105, name: 'Selenium & Playwright Mastery Handbook', category: 'Books', price: 34.99, rating: 5.0, image: '📘' },
  { id: 106, name: 'Ergonomic SDET Desk Chair', category: 'Furniture', price: 299.99, rating: 4.8, image: '🪑' },
];

document.addEventListener('DOMContentLoaded', () => {
  renderProductGrid(sampleProducts);

  const searchInput = document.getElementById('input-ecom-search');
  const catFilter = document.getElementById('select-ecom-category');
  const priceFilter = document.getElementById('input-ecom-price');
  const priceLabel = document.getElementById('text-ecom-price-val');

  if (searchInput) searchInput.addEventListener('input', filterProducts);
  if (catFilter) catFilter.addEventListener('change', filterProducts);
  if (priceFilter) {
    priceFilter.addEventListener('input', (e) => {
      if (priceLabel) priceLabel.textContent = `$${e.target.value}`;
      filterProducts();
    });
  }

  const btnOpenCart = document.getElementById('btn-open-cart-drawer');
  const btnCloseCart = document.getElementById('btn-close-cart-drawer');
  const drawer = document.getElementById('drawer-cart');

  if (btnOpenCart && drawer) btnOpenCart.addEventListener('click', () => drawer.classList.add('open'));
  if (btnCloseCart && drawer) btnCloseCart.addEventListener('click', () => drawer.classList.remove('open'));
});

function renderProductGrid(products) {
  const container = document.getElementById('div-ecom-product-grid');
  if (!container) return;

  container.innerHTML = '';
  if (products.length === 0) {
    container.innerHTML = '<div id="div-ecom-no-products" style="grid-column: 1/-1; text-align:center; padding:40px; color:#9CA3AF;">No products match your criteria.</div>';
    return;
  }

  products.forEach(p => {
    const card = document.createElement('div');
    card.id = `card-product-${p.id}`;
    card.className = 'qa-card';
    card.setAttribute('data-testid', `product-card-${p.id}`);
    card.setAttribute('data-qa', `ecom-product-${p.id}`);
    card.style.cssText = 'display:flex; flex-direction:column; justify-between; margin-bottom:0;';

    card.innerHTML = `
      <div id="div-img-container-${p.id}" style="height:140px; background:#1F2937; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:48px; margin-bottom:16px;">
        ${p.image}
      </div>
      <div id="div-badge-cat-${p.id}" class="qa-badge qa-badge-blue" style="width:fit-content; margin-bottom:8px;">${p.category}</div>
      <h3 id="heading-product-name-${p.id}" style="font-size:16px; font-weight:700; margin-bottom:6px;">${p.name}</h3>
      <div id="div-product-rating-${p.id}" style="font-size:13px; color:#F59E0B; margin-bottom:12px;">★ ${p.rating} (120+ reviews)</div>
      <div id="div-product-price-row-${p.id}" style="display:flex; align-items:center; justify-content:space-between; margin-top:auto; pt:12px;">
        <span id="span-product-price-${p.id}" style="font-size:20px; font-weight:800; color:#3B82F6;">$${p.price.toFixed(2)}</span>
        <button id="btn-add-cart-${p.id}" data-testid="btn-add-to-cart-${p.id}" data-qa="add-cart-btn-${p.id}" class="qa-btn qa-btn-primary" onclick="addToCart(${p.id})">
          + Add Cart
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterProducts() {
  const query = document.getElementById('input-ecom-search')?.value.toLowerCase() || '';
  const category = document.getElementById('select-ecom-category')?.value || 'all';
  const maxPrice = parseFloat(document.getElementById('input-ecom-price')?.value || 500);

  const filtered = sampleProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(query);
    const matchesCat = category === 'all' || p.category.toLowerCase() === category.toLowerCase();
    const matchesPrice = p.price <= maxPrice;
    return matchesSearch && matchesCat && matchesPrice;
  });

  renderProductGrid(filtered);
}

function addToCart(productId) {
  const prod = sampleProducts.find(p => p.id === productId);
  if (!prod) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...prod, qty: 1 });
  }

  updateCartUI();
  showQAToast(`Added "${prod.name}" to cart!`, 'success');
}

function updateCartUI() {
  const countBadge = document.getElementById('badge-cart-count');
  const cartList = document.getElementById('div-cart-items-list');
  const subtotalElem = document.getElementById('span-cart-subtotal');
  const totalElem = document.getElementById('span-cart-total');

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  if (countBadge) countBadge.textContent = totalItems;

  if (!cartList) return;

  if (cart.length === 0) {
    cartList.innerHTML = '<div id="div-cart-empty" style="text-align:center; padding:30px; color:#9CA3AF;">Your shopping cart is empty.</div>';
    if (subtotalElem) subtotalElem.textContent = '$0.00';
    if (totalElem) totalElem.textContent = '$0.00';
    return;
  }

  cartList.innerHTML = '';
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.qty;
    const row = document.createElement('div');
    row.id = `cart-item-row-${item.id}`;
    row.style.cssText = 'display:flex; align-items:center; justify-content:space-between; padding:12px; border-bottom:1px solid #1F2937;';

    row.innerHTML = `
      <div id="div-cart-item-info-${item.id}">
        <div id="text-cart-item-name-${item.id}" style="font-weight:600; font-size:14px;">${item.name}</div>
        <div id="text-cart-item-price-${item.id}" style="font-size:12px; color:#9CA3AF;">$${item.price.toFixed(2)} x ${item.qty}</div>
      </div>
      <div id="div-cart-item-controls-${item.id}" style="display:flex; align-items:center; gap:8px;">
        <button id="btn-qty-minus-${item.id}" class="qa-btn qa-btn-secondary" style="padding:2px 8px;" onclick="changeQty(${item.id}, -1)">-</button>
        <span id="span-cart-qty-${item.id}" style="font-weight:700;">${item.qty}</span>
        <button id="btn-qty-plus-${item.id}" class="qa-btn qa-btn-secondary" style="padding:2px 8px;" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
    `;
    cartList.appendChild(row);
  });

  if (subtotalElem) subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
  if (totalElem) totalElem.textContent = `$${(subtotal * 1.08).toFixed(2)}`;
}

function changeQty(productId, delta) {
  const idx = cart.findIndex(item => item.id === productId);
  if (idx !== -1) {
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) {
      cart.splice(idx, 1);
    }
  }
  updateCartUI();
}
