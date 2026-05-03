document.addEventListener('DOMContentLoaded', () => {
  const SHIPPING_FEE = 200000;
  const API = 'http://127.0.0.1:3000/api';

  const cartContainer = document.querySelector('.info_cart');
  const headerRow = document.querySelector('.info_cart-title');
  const totalPriceElem = document.querySelector('.total_price-number');
  const costCartElems = document.querySelectorAll('.cost_cart-number');
  const checkoutBtn = document.querySelector('.button_buy');

  if (!cartContainer || !headerRow || !totalPriceElem || costCartElems.length < 2) return;

  let cartRowsContainer = document.querySelector('.cart-rows-container');
  if (!cartRowsContainer) {
    cartRowsContainer = document.createElement('div');
    cartRowsContainer.className = 'cart-rows-container';
    cartContainer.appendChild(cartRowsContainer);
  }

  const getCurrentCustomer = () => JSON.parse(localStorage.getItem('khachHang') || 'null');

  async function fetchCartItems() {
    const khachHang = getCurrentCustomer();
    if (!khachHang?.MaKhachHang) return [];
    try {
      const [cartRes, productRes] = await Promise.all([
        fetch(`${API}/giohangs?limit=1000`),
        fetch(`${API}/sanphams?limit=500`)
      ]);
      if (!cartRes.ok || !productRes.ok) return [];

      const cartJson = await cartRes.json();
      const productJson = await productRes.json();
      const products = productJson.data || [];

      return (cartJson.data || [])
        .filter((item) => String(item.MaKhachHang) === String(khachHang.MaKhachHang))
        .map((item) => {
          const product = products.find((p) => String(p.MaSP) === String(item.MaSP));
          return {
            MaGH: item.MaGH,
            MaSP: item.MaSP,
            name: product?.TenSP || 'Sản phẩm',
            price: Number(product?.Gia || 0),
            quantity: Number(item.SoLuong || 1)
          };
        });
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  function formatVnd(value) {
    return `${Number(value).toLocaleString('vi-VN')} VNĐ`;
  }

  function updateTotal(cartItems) {
    const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);
    costCartElems[0].textContent = formatVnd(subtotal);
    costCartElems[1].textContent = formatVnd(SHIPPING_FEE);
    totalPriceElem.textContent = formatVnd(subtotal + SHIPPING_FEE);
  }

  async function renderCart() {
    const cartItems = await fetchCartItems();
    cartRowsContainer.innerHTML = '';

    if (cartItems.length === 0) {
      cartRowsContainer.innerHTML = '<p style="margin:12px 0;">Giỏ hàng đang trống.</p>';
      updateTotal([]);
      if (typeof window.updateCartBadge === 'function') window.updateCartBadge();
      return;
    }

    cartItems.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'info_cart-title cart-item-row';

      row.innerHTML = `
        <div class="cart_about"><div class="info_cart-frame">${item.name || ''}</div></div>
        <div class="cart_about"><div class="info_cart-frame">${formatVnd(item.price)}</div></div>
        <div class="cart_about"><div class="info_cart-frame"><input type="number" min="1" value="${item.quantity}" class="qty-input" data-id="${item.MaGH}" style="width:60px;"></div></div>
        <div class="cart_about"><div class="info_cart-frame">${formatVnd(Number(item.price || 0) * Number(item.quantity || 0))}</div></div>
        <div class="cart_about"><div class="info_cart-frame"><button class="btn-remove" data-id="${item.MaGH}">Xóa</button></div></div>
      `;

      cartRowsContainer.appendChild(row);
    });

    updateTotal(cartItems);

    cartRowsContainer.querySelectorAll('.qty-input').forEach((input) => {
      input.addEventListener('change', async (e) => {
        const id = e.target.dataset.id;
        let val = parseInt(e.target.value, 10);
        if (!Number.isFinite(val) || val < 1) val = 1;
        await fetch(`${API}/giohangs/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ SoLuong: val })
        });
        renderCart();
      });
    });

    cartRowsContainer.querySelectorAll('.btn-remove').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        await fetch(`${API}/giohangs/${id}`, { method: 'DELETE' });
        renderCart();
      });
    });

    if (typeof window.updateCartBadge === 'function') window.updateCartBadge();
  }

  checkoutBtn?.addEventListener('click', async () => {
    const cartItems = await fetchCartItems();
    if (cartItems.length === 0) {
      alert('Giỏ hàng đang trống!');
      return;
    }
    window.location.href = '/Owner/pay.html';
  });

  renderCart();
});
