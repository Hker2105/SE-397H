document.addEventListener('DOMContentLoaded', async () => {
  const headerHost = document.getElementById('header');
  if (!headerHost) return;

  try {
    const res = await fetch('/Frontend/header.html');
    const html = await res.text();
    headerHost.innerHTML = html;

    updateCartBadge();
    updateAuthMenu();
  } catch (error) {
    console.error('Không thể tải header:', error);
  }
});

function getCartItems() {
  try {
    return JSON.parse(localStorage.getItem('cartItems') || '[]');
  } catch {
    return [];
  }
}


function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('khachHang') || 'null');
  } catch {
    return null;
  }
}

function isAdminUser(user) {
  return String(user?.LoaiTaiKhoan || '').toLowerCase() === 'admin';
}

function updateAuthMenu() {
  const rightMenu = document.querySelector('.menu-right');
  if (!rightMenu) return;

  const user = getCurrentUser();
  if (!user) {
    rightMenu.innerHTML = `
      <li><a href="/Owner/login.html">Đăng nhập</a></li>
      <li><a href="/Owner/register.html">Đăng ký</a></li>
    `;
    return;
  }

  const fullName = user.HoTen || user.TenKhachHang || user.Email || 'Tài khoản';
  const adminLink = isAdminUser(user)
    ? '<li><a href="/Admin/category.html" class="admin-back-link">Quay lại Admin</a></li>'
    : '';

  rightMenu.innerHTML = `
    ${adminLink}
    <li><a href="/Owner/update_info.html">${fullName}</a></li>
    <li><a href="#" id="logout-link">Đăng xuất</a></li>
  `;

  document.getElementById('logout-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('khachHang');
    window.location.href = '/Owner/login.html';
  });
}

function updateCartBadge() {
  const cartItems = getCartItems();
  const totalQty = cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

  const cartIcon = document.querySelector('.fa-shopping-cart');
  if (!cartIcon) return;

  const badge = cartIcon.closest('.icon')?.querySelector('span');
  if (badge) badge.textContent = totalQty;
}

window.updateCartBadge = updateCartBadge;
