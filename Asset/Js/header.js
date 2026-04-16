document.addEventListener('DOMContentLoaded', async () => {
  const headerHost = document.getElementById('header');
  if (!headerHost) return;

  try {
    const res = await fetch('/Frontend/header.html');
    const html = await res.text();
    headerHost.innerHTML = html;

    updateCartBadge();
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

function updateCartBadge() {
  const cartItems = getCartItems();
  const totalQty = cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

  const cartIcon = document.querySelector('.fa-shopping-cart');
  if (!cartIcon) return;

  const badge = cartIcon.closest('.icon')?.querySelector('span');
  if (badge) badge.textContent = totalQty;
}

window.updateCartBadge = updateCartBadge;
