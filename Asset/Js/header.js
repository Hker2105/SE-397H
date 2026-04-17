(function () {
  const HEADER_SELECTOR = '#header';
  const HEADER_TEMPLATE = '/Frontend/header.html';

  function readJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
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
    const links = document.querySelectorAll('.navbar a[href]');

    links.forEach((link) => {
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
        return;
      }

      window.location.href = `/index.html?search=${encodeURIComponent(keyword)}`;
    };

    button.addEventListener('click', submitSearch);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submitSearch();
    });
  }

  function setupAuthMenu() {
    const menuRight = document.querySelector('.menu-right');
    if (!menuRight) return;

    const currentUser = readJson('currentUser', null);
    if (!currentUser || !currentUser.username) return;

    menuRight.innerHTML = `
      <li><a href="/Owner/update_info.html">Xin chào, ${currentUser.username}</a></li>
      <li><a href="#" id="logoutBtn">Đăng xuất</a></li>
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
