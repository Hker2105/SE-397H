const API = `${window.location.origin}/api`;
let allProducts = [];

function formatPrice(price) {
  return `${Number(price || 0).toLocaleString('vi-VN')} vnđ`;
}

function getPriceRangeValue() {
  const selected = document.querySelector('input[name="price-filter"]:checked');
  return selected?.value || 'all';
}

function inRange(price, range) {
  switch (range) {
    case 'under-5': return price < 5000000;
    case '5-10': return price >= 5000000 && price < 10000000;
    case '10-20': return price >= 10000000 && price < 20000000;
    case '20-30': return price >= 20000000 && price < 30000000;
    case 'over-30': return price >= 30000000;
    default: return true;
  }
}

function applyFilters() {
  const range = getPriceRangeValue();
  const keyword = (document.querySelector('.search-box input')?.value || '').trim().toLowerCase();

  const filtered = allProducts.filter((item) => {
    const okPrice = inRange(Number(item.Gia || 0), range);
    const okName = !keyword || String(item.TenSP || '').toLowerCase().includes(keyword);
    return okPrice && okName;
  });

  renderProducts(filtered);
}

function renderProducts(products) {
  const grid = document.querySelector('.product-grid');
  if (!grid) return;

  if (!products.length) {
    grid.innerHTML = '<p class="product-empty">Không có sản phẩm phù hợp bộ lọc.</p>';
    return;
  }

  grid.innerHTML = products.map((item) => {
    const safeName = String(item.TenSP || 'Sản phẩm').replace(/"/g, '&quot;');
    return `
      <div class="product-card">
        <div class="product-img-box">
          <img src="/backend/Assets/${item.HinhAnh}" alt="${safeName}" onerror="this.src='https://via.placeholder.com/320x220?text=No+Image'">
        </div>
        <h3 class="product-name" title="${safeName}">${item.TenSP}</h3>
        <p class="product-price">${formatPrice(item.Gia)}</p>
        <div class="product-actions">
          <a href="/Owner/Product_details.html?id=${item.MaSP}" class="action-link">👁 Xem chi tiết</a>
          <a href="#" class="action-link add-to-cart" data-id="${item.MaSP}" data-name="${safeName}" data-price="${item.Gia}">🛒 Thêm vào giỏ hàng</a>
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.add-to-cart').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const price = Number(btn.dataset.price || 0);
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const existing = cartItems.find((item) => item.id === id);

      if (existing) existing.quantity += 1;
      else cartItems.push({ id, name, price, quantity: 1 });

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      if (typeof window.updateCartBadge === 'function') {
        window.updateCartBadge();
      }
      alert('Đã thêm vào giỏ hàng!');
    });
  });
}

async function loadProducts() {
  try {
    const res = await fetch(`${API}/sanphams?limit=200`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const json = await res.json();
    allProducts = json.data || [];
    applyFilters();
  } catch (error) {
    console.error(error);
    alert('Không tải được danh sách sản phẩm từ backend.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const query = new URLSearchParams(window.location.search).get('q');
  const input = document.querySelector('.search-box input');
  if (query && input) input.value = decodeURIComponent(query);

  document.querySelector('.btn-filter')?.addEventListener('click', applyFilters);
  document.querySelectorAll('input[name="price-filter"]').forEach((el) => el.addEventListener('change', applyFilters));
  document.querySelector('.search-box button')?.addEventListener('click', applyFilters);
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyFilters();
    }
  });
  loadProducts();
});
