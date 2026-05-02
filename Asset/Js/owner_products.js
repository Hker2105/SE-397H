const API = 'http://127.0.0.1:3000/api';

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

function renderProducts(products) {
  const grid = document.querySelector('.product-grid');
  if (!grid) return;
  grid.innerHTML = products.map((item) => `
    <div class="product-card">
      <div class="product-img-box">
        <img src="https://via.placeholder.com/320x220?text=${encodeURIComponent(item.TenSP)}" alt="${item.TenSP}">
      </div>
      <h3 class="product-name">${item.TenSP}</h3>
      <p class="product-price">${formatPrice(item.Gia)}</p>
      <div class="product-actions">
        <a href="/Owner/Product_details.html?id=${item.MaSP}" class="action-link">👁 Xem chi tiết</a>
        <a href="#" class="action-link add-to-cart" data-name="${item.TenSP}" data-price="${item.Gia}">🛒 Thêm vào giỏ hàng</a>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.add-to-cart').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = btn.dataset.name;
      const price = Number(btn.dataset.price || 0);
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const existing = cartItems.find((item) => item.name === name);
      if (existing) existing.quantity += 1;
      else cartItems.push({ name, price, quantity: 1 });
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      alert('Đã thêm vào giỏ hàng!');
    });
  });
}

async function loadProducts() {
  try {
    const res = await fetch(`${API}/sanphams?limit=100`);
    const json = await res.json();
    const all = json.data || [];
    const range = getPriceRangeValue();
    const filtered = all.filter((item) => inRange(Number(item.Gia || 0), range));
    renderProducts(filtered);
  } catch (error) {
    console.error(error);
    alert('Không tải được danh sách sản phẩm từ backend.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.btn-filter')?.addEventListener('click', loadProducts);
  loadProducts();
});
