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

  const filterProducts = () => {
    const input = document.querySelector('.search-box input');
    const keyword = (input?.value || '').trim().toLowerCase();
    const cards = document.querySelectorAll('.product-grid .product-card');

    let visible = 0;
    cards.forEach((card) => {
      const name = card.querySelector('.product-name')?.textContent?.toLowerCase() || '';
      const show = !keyword || name.includes(keyword);
      card.style.display = show ? '' : 'none';
      if (show) visible += 1;
    });

    if (keyword && visible === 0) {
      window.location.href = `/Owner/sanphamcuahang.html?q=${encodeURIComponent(keyword)}`;
      return;
    }

    document.querySelector('.new-products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const bindSearch = () => {
    const input = document.querySelector('.search-box input');
    const button = document.querySelector('.search-box button');
    if (!input || !button || button.dataset.searchBound === '1') return false;

    button.dataset.searchBound = '1';
    button.addEventListener('click', filterProducts);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        filterProducts();
      }
    });
    return true;
  };

  if (!bindSearch()) {
    const timer = setInterval(() => {
      if (bindSearch()) clearInterval(timer);
    }, 200);
    setTimeout(() => clearInterval(timer), 5000);
  }
});
