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


  const bindCategoryToggle = () => {
    const menu = document.getElementById('home-category-list');
    const btn = document.querySelector('.dropbtn');
    if (!menu || !btn || btn.dataset.categoryBound === '1') return false;

    const placeMenu = () => {
      const rect = btn.getBoundingClientRect();
      menu.style.position = 'fixed';
      menu.style.left = `${rect.left}px`;
      menu.style.top = `${rect.bottom}px`;
      menu.style.width = `${rect.width}px`;
      menu.style.zIndex = '9999';
    };

    menu.classList.remove('is-open');
    btn.dataset.categoryBound = '1';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      placeMenu();
      menu.classList.toggle('is-open');
    });

    window.addEventListener('resize', () => {
      if (menu.classList.contains('is-open')) placeMenu();
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.remove('is-open');
      }
    });

    return true;
  };

  const bindCategoryFilter = () => {
    const links = document.querySelectorAll('#home-category-list a');
    if (!links.length) return;

    const rules = {
      'Gaming': ['gaming', 'tuf', 'rog', 'msi'],
      'Macbook': ['macbook'],
      'Học tập/văn phòng': ['aspire', 'vivobook', 'swift', 'inspiron', 'idea'],
      'Đồ họa, Kỹ thuật': ['xps', 'thinkpad', 'legion', 'predator'],
      'Cao cấp/Sang trọng': ['xps', 'spectre', 'zenbook', 'prestige', 'expertbook', 'macbook pro'],
      'Cũ': ['cũ', 'used'],
    };

    links.forEach((link) => {
      if (link.dataset.categoryBound === '1') return;
      link.dataset.categoryBound = '1';
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const name = link.textContent.trim();
        const keywords = rules[name] || [];
        const cards = document.querySelectorAll('.product-grid .product-card');

        cards.forEach((card) => {
          const text = card.querySelector('.product-name')?.textContent?.toLowerCase() || '';
          const show = !keywords.length || keywords.some((kw) => text.includes(kw));
          card.style.display = show ? '' : 'none';
        });

        document.querySelector('.new-products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  };
  if (!bindCategoryToggle()) {
    const categoryTimer = setInterval(() => {
      if (bindCategoryToggle()) clearInterval(categoryTimer);
    }, 200);
    setTimeout(() => clearInterval(categoryTimer), 5000);
  }

  bindCategoryFilter();

  if (!bindSearch()) {
    const timer = setInterval(() => {
      if (bindSearch()) clearInterval(timer);
    }, 200);
    setTimeout(() => clearInterval(timer), 5000);
  }
});
