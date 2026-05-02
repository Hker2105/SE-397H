function initPayInvoice() {
  const SHIPPING_FEE = 200000;
  const productLine = document.getElementById('pay-products');
  const subtotalLine = document.getElementById('pay-subtotal');
  const shippingLine = document.getElementById('pay-shipping');
  const orderBtn = document.querySelector('.pay-btn');

  if (!productLine || !subtotalLine || !shippingLine || !orderBtn) return;

  const formatVnd = (value) => `${Number(value).toLocaleString('vi-VN')} VNĐ`;

  const getCartItems = () => {
    try {
      const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
      if (Array.isArray(items)) return items;
      return [];
    } catch {
      return [];
    }
  };

  const renderInvoice = () => {
    const cartItems = getCartItems();

    if (!cartItems.length) {
      productLine.textContent = 'Sản phẩm: (trống)';
      subtotalLine.textContent = `Thành tiền: ${formatVnd(0)}`;
      shippingLine.textContent = `Phí vận chuyển: ${formatVnd(0)}`;
      orderBtn.disabled = true;
      orderBtn.style.opacity = '0.6';
      return;
    }

    const normalized = cartItems.map((item) => ({
      name: item.name || item.product || 'Sản phẩm',
      quantity: Number(item.quantity || 1),
      price: Number(item.price || 0),
    }));

    const productText = normalized.map((item) => `${item.name} x${item.quantity}`).join(', ');
    const subtotal = normalized.reduce((sum, item) => sum + item.price * item.quantity, 0);

    productLine.textContent = `Sản phẩm: ${productText}`;
    subtotalLine.textContent = `Thành tiền: ${formatVnd(subtotal)}`;
    shippingLine.textContent = `Phí vận chuyển: ${formatVnd(SHIPPING_FEE)}`;
    orderBtn.disabled = false;
    orderBtn.style.opacity = '1';
  };

  orderBtn.onclick = () => {
    const cartItems = getCartItems();
    if (!cartItems.length) {
      alert('Giỏ hàng đang trống!');
      return;
    }

    alert('Đặt hàng thành công!');
    localStorage.removeItem('cartItems');
    window.location.href = '/Owner/oder.html';
  };

  renderInvoice();
  window.addEventListener('storage', renderInvoice);
}

document.addEventListener('DOMContentLoaded', initPayInvoice);
window.addEventListener('load', initPayInvoice);
