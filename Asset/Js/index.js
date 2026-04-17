document.addEventListener('DOMContentLoaded', () => {
  const addButtons = Array.from(document.querySelectorAll('.product-card .action-link'))
    .filter((link) => link.textContent.includes('Thêm vào giỏ hàng'));

  addButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const card = btn.closest('.product-card');
      if (!card) return;

      const name = card.querySelector('.product-name')?.textContent?.trim() || 'Sản phẩm';
      const priceText = card.querySelector('.product-price')?.textContent?.trim() || '0';
      const price = Number((priceText.match(/\d+/g) || []).join('')) || 0;

      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const existing = cartItems.find((item) => item.name === name);

      if (existing) {
        existing.quantity += 1;
      } else {
        cartItems.push({ name, price, quantity: 1 });
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      if (typeof window.updateCartBadge === 'function') {
        window.updateCartBadge();
      }

      alert('Đã thêm vào giỏ hàng!');
    });
  });
});
