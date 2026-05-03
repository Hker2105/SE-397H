document.addEventListener('DOMContentLoaded', () => {
  const SHIPPING_FEE = 200000;

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

  const getCartItems = () => JSON.parse(localStorage.getItem('cartItems') || '[]');
  const saveCartItems = (items) => localStorage.setItem('cartItems', JSON.stringify(items));

  function formatVnd(value) {
    return `${Number(value).toLocaleString('vi-VN')} VNĐ`;
  }

  function updateTotal(cartItems) {
    const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);
    costCartElems[0].textContent = formatVnd(subtotal);
    costCartElems[1].textContent = formatVnd(SHIPPING_FEE);
    totalPriceElem.textContent = formatVnd(subtotal + SHIPPING_FEE);
  }

  function renderCart() {
    const cartItems = getCartItems();
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
        <div class="cart_about"><div class="info_cart-frame"><input type="number" min="1" value="${item.quantity}" class="qty-input" data-index="${index}" style="width:60px;"></div></div>
        <div class="cart_about"><div class="info_cart-frame">${formatVnd(Number(item.price || 0) * Number(item.quantity || 0))}</div></div>
        <div class="cart_about"><div class="info_cart-frame"><button class="btn-remove" data-index="${index}">Xóa</button></div></div>
      `;

      cartRowsContainer.appendChild(row);
    });

    updateTotal(cartItems);

    cartRowsContainer.querySelectorAll('.qty-input').forEach((input) => {
      input.addEventListener('change', (e) => {
        const items = getCartItems();
        const idx = Number(e.target.dataset.index);
        let val = parseInt(e.target.value, 10);
        if (!Number.isFinite(val) || val < 1) val = 1;
        items[idx].quantity = val;
        saveCartItems(items);
        renderCart();
      });
    });

    cartRowsContainer.querySelectorAll('.btn-remove').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const items = getCartItems();
        const idx = Number(e.target.dataset.index);
        items.splice(idx, 1);
        saveCartItems(items);
        renderCart();
      });
    });

    if (typeof window.updateCartBadge === 'function') window.updateCartBadge();
  }

  checkoutBtn?.addEventListener('click', () => {
    const cartItems = getCartItems();
    if (cartItems.length === 0) {
      alert('Giỏ hàng đang trống!');
      return;
    }
    window.location.href = '/Owner/pay.html';
  });

  renderCart();
});
