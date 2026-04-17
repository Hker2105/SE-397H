(function () {
  const HEADER_SELECTOR = '#header';
  const HEADER_TEMPLATE = '/Frontend/header.html';

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function getCartItems() {
    return readJson('cartItems', []);
  }

  function updateCartBadge() {
    const totalQty = getCartItems().reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
    const iconWrap = document.querySelector('.header .fa-shopping-cart')?.closest('.icon');
    const badge = iconWrap?.querySelector('span');
    if (badge) badge.textContent = String(totalQty);
  }

  function updateWishlistBadge() {
    const totalFav = readJson('wishlistItems', []).length;
    const iconWrap = document.querySelector('.header .fa-heart')?.closest('.icon');
    const badge = iconWrap?.querySelector('span');
    if (badge) badge.textContent = String(totalFav);
  }

  function markActiveMenu() {
    const path = window.location.pathname.toLowerCase();
    document.querySelectorAll('.navbar a[href]').forEach((link) => {
      const href = (link.getAttribute('href') || '').toLowerCase();
      if (!href || href === '#') return;

      const normalizedHref = href.replace('..', '');
      if (path.endsWith(normalizedHref) || (normalizedHref === '/index.html' && (path === '/' || path.endsWith('/index.html')))) {
        link.classList.add('active-link');
      }
    });
  }

  function setupSearch() {
    const input = document.querySelector('.header .search-box input');
    const button = document.querySelector('.header .search-box button');
    if (!input || !button) return;

    const submitSearch = () => {
      const keyword = input.value.trim();
      if (!keyword) return;

      const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');
      if (isHome) {
        window.dispatchEvent(new CustomEvent('g5-search', { detail: keyword }));
      } else {
        window.location.href = `/index.html?search=${encodeURIComponent(keyword)}`;
      }
    };

    button.addEventListener('click', submitSearch);
    input.addEventListener('keydown', (e) => e.key === 'Enter' && submitSearch());
  }

  function setupCategoryMenu() {
    document.querySelectorAll('#categoryMenu [data-category]').forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const category = item.dataset.category;

        const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');
        if (isHome) {
          window.dispatchEvent(new CustomEvent('g5-category', { detail: category }));
          document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.location.href = `/index.html?category=${encodeURIComponent(category)}#products`;
        }
      });
    });
  }

  function setupAuthMenu() {
    const menuRight = document.querySelector('.menu-right');
    if (!menuRight) return;

    const currentUser = readJson('currentUser', null);
    if (!currentUser || !currentUser.username) return;

    menuRight.innerHTML = `
      <li class="account-panel">
        <a href="#" class="account-trigger"><i class="fa fa-user-circle"></i>${currentUser.username}</a>
        <ul class="dropdown-menu">
          <li><a href="/Owner/update_info.html">Thông tin tài khoản</a></li>
          <li><a href="#" id="logoutBtn">Đăng xuất</a></li>
        </ul>
      </li>
    `;

    document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('currentUser');
      window.location.href = '/index.html';
    });
  }

  async function loadHeader() {
    const host = document.querySelector(HEADER_SELECTOR);
    if (!host) return;

    try {
      const res = await fetch(HEADER_TEMPLATE);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      host.innerHTML = await res.text();

      setupSearch();
      setupCategoryMenu();
      setupAuthMenu();
      markActiveMenu();
      updateCartBadge();
      updateWishlistBadge();
    } catch (error) {
      console.error('Không thể tải header:', error);
    }
  }

  window.updateCartBadge = updateCartBadge;
  document.addEventListener('DOMContentLoaded', loadHeader);
})();
