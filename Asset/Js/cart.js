document.addEventListener('DOMContentLoaded', () => {
  const SHIPPING_FEE = 200000;

  const cartContainer = document.querySelector('.info_cart-title');
  const totalPriceElem = document.querySelector('.total_price-number');
  const costCartElems = document.querySelectorAll('.cost_cart-number');
  const checkoutBtn = document.querySelector('.button_buy');

  if (!cartContainer || !totalPriceElem || costCartElems.length < 2) return;

  const cartRowsContainer = document.createElement('div');
  cartRowsContainer.classList.add('cart-rows-container');
  cartContainer.parentNode.appendChild(cartRowsContainer);

  const getCartItems = () => JSON.parse(localStorage.getItem('cartItems') || '[]');
  const saveCartItems = (items) => localStorage.setItem('cartItems', JSON.stringify(items));

  function formatVnd(value) {
    return `${Number(value).toLocaleString('vi-VN')} VNĐ`;
  }

  function updateTotal(cartItems) {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    costCartElems[0].textContent = formatVnd(subtotal);
    costCartElems[1].textContent = formatVnd(SHIPPING_FEE);
    totalPriceElem.textContent = formatVnd(subtotal + SHIPPING_FEE);
  }

  function renderCart() {
    const cartItems = getCartItems();
    cartRowsContainer.innerHTML = '';

    if (cartItems.length === 0) {
      updateTotal([]);
      if (typeof window.updateCartBadge === 'function') window.updateCartBadge();
      return;
    }

    cartItems.forEach((item, index) => {
      const row = document.createElement('div');
      row.classList.add('cart_row');
      row.style.display = 'flex';
      row.style.alignItems = 'center';
      row.style.marginTop = '10px';

      row.innerHTML = `
        <div style="width:150px;">${item.name}</div>
        <div style="width:120px;">${formatVnd(item.price)}</div>
        <div style="width:100px;">
          <input type="number" min="1" value="${item.quantity}" class="qty-input" data-index="${index}" style="width:50px;">
        </div>
        <div style="width:120px;" class="item-total">${formatVnd(item.price * item.quantity)}</div>
        <div style="width:60px;">
          <button class="btn-remove" data-index="${index}">Xóa</button>
        </div>
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

    alert('Đang chuyển đến bước thanh toán...');
    window.location.href = '/Owner/pay.html';
  });

  renderCart();
});
