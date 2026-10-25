function initPayInvoice() {
  const SHIPPING_FEE = 200000;
  const productLine = document.getElementById('pay-products');
  const subtotalLine = document.getElementById('pay-subtotal');
  const shippingLine = document.getElementById('pay-shipping');
  const orderBtn = document.querySelector('.pay-btn');

  if (!productLine || !subtotalLine || !shippingLine || !orderBtn) return;

  const formatVnd = (value) => `${Number(value || 0).toLocaleString('vi-VN')} VNĐ`;

  const getCartItems = () => {
    try {
      const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
      return Array.isArray(items) ? items : [];
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

    const productText = normalized.map((i) => `${i.name} x${i.quantity}`).join(', ');
    const subtotal = normalized.reduce((sum, i) => sum + i.price * i.quantity, 0);

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

    const selected = document.querySelector('input[type="radio"]:checked');
    if (!selected) {
      alert('Vui lòng chọn phương thức thanh toán!');
      return;
    }

    // Nếu radio chưa có value thì lấy nhãn bên cạnh làm giá trị
    const method = selected.value && selected.value !== 'on'
      ? selected.value
      : (selected.closest('label, div')?.textContent.trim().split('\n')[0] || 'COD');

    localStorage.setItem('paymentMethod', method);
    localStorage.setItem('checkoutItems', JSON.stringify(cartItems));
    window.location.href = '/Owner/oder.html';
  };

  renderInvoice();
  window.addEventListener('storage', renderInvoice);
}

// Chỉ chạy một lần, tránh gán sự kiện trùng
let payInitialized = false;
function runOnce() {
  if (payInitialized) return;
  payInitialized = true;
  initPayInvoice();
}
document.addEventListener('DOMContentLoaded', runOnce);
window.addEventListener('load', runOnce);