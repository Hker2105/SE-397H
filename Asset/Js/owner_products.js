const API = 'http://127.0.0.1:3000/api';
let allProducts = [];

function getCurrentCustomer() {
  return JSON.parse(localStorage.getItem('khachHang') || 'null');
}

function generateMaGH() {
  return `GH${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 100)}`;
}

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
    grid.innerHTML = '<p>Không có sản phẩm ở mức giá này</p>';
    return;
  }

  grid.innerHTML = products.map((item) => {
    const safeName = String(item.TenSP || 'Sản phẩm').replace(/"/g, '&quot;');
    return `
      <div class="product-card">
        <div class="product-img-box">
          <img src="/backend/Assets/${item.HinhAnh}" alt="${safeName}" onerror="this.src='https://via.placeholder.com/320x220?text=No+Image'">
        </div>
        <h3 class="product-name">${item.TenSP}</h3>
        <p class="product-price">${formatPrice(item.Gia)}</p>
        <div class="product-actions">
          <a href="/Owner/Product_details.html?id=${item.MaSP}" class="action-link">👁 Xem chi tiết</a>
          <a href="#" class="action-link add-to-cart" data-id="${item.MaSP}" data-name="${safeName}" data-price="${item.Gia}">🛒 Thêm vào giỏ hàng</a>
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.add-to-cart').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const khachHang = getCurrentCustomer();
      if (!khachHang?.MaKhachHang) {
        alert('Vui lòng đăng nhập để thêm vào giỏ hàng!');
        window.location.href = '/Owner/login.html';
        return;
      }

      const MaSP = btn.dataset.id;

      try {
        const listRes = await fetch(`${API}/giohangs?limit=1000`);
        const listJson = await listRes.json();
        const cartRows = listJson.data || [];

        const existingItem = cartRows.find(
          (item) => String(item.MaKhachHang) === String(khachHang.MaKhachHang) && String(item.MaSP) === String(MaSP)
        );

        const res = existingItem
          ? await fetch(`${API}/giohangs/${existingItem.MaGH}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ SoLuong: Number(existingItem.SoLuong || 0) + 1 })
          })
          : await fetch(`${API}/giohangs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              MaGH: generateMaGH(),
              MaKhachHang: khachHang.MaKhachHang,
              MaSP,
              NgayTao: new Date().toISOString(),
              SoLuong: 1
            })
          });

        const json = await res.json();
        if (!res.ok) throw new Error(json.message || 'Không thêm được vào giỏ hàng');

        alert('Đã thêm vào giỏ hàng!');
        if (typeof window.updateCartBadge === 'function') window.updateCartBadge();
      } catch (error) {
        console.error(error);
        alert('Lỗi khi thêm giỏ hàng qua API.');
      }
    });
  });
}

async function loadProducts() {
  try {
    const res = await fetch(`${API}/sanphams?limit=200`);
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
  loadProducts();
});
