document.addEventListener('DOMContentLoaded', () => {
  const SHIPPING_FEE = 200000;

  const productLine = document.querySelector('.pay-invoice-item.line');
  const invoiceItems = document.querySelectorAll('.pay-invoice-item');
  const orderBtn = document.querySelector('.pay-btn');

  if (!productLine || invoiceItems.length < 3) return;

  function formatVnd(value) {
    return `${Number(value).toLocaleString('vi-VN')} VNĐ`;
  }

  function getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems') || '[]');
  }

  function renderInvoice() {
    const cartItems = getCartItems();

    if (!cartItems.length) {
      productLine.textContent = 'Sản phẩm: (trống)';
      invoiceItems[1].textContent = `Thành tiền: ${formatVnd(0)}`;
      invoiceItems[2].textContent = `Phí vận chuyển: ${formatVnd(0)}`;
      orderBtn.disabled = true;
      orderBtn.style.opacity = '0.6';
      return;
    }

    const productText = cartItems.map((item) => `${item.name} x${item.quantity}`).join(', ');
    const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);

    productLine.textContent = `Sản phẩm: ${productText}`;
    invoiceItems[1].textContent = `Thành tiền: ${formatVnd(subtotal)}`;
    invoiceItems[2].textContent = `Phí vận chuyển: ${formatVnd(SHIPPING_FEE)}`;
  }

  orderBtn?.addEventListener('click', () => {
    const cartItems = getCartItems();
    if (!cartItems.length) {
      alert('Giỏ hàng đang trống!');
      return;
    }

    alert('Đặt hàng thành công!');
    localStorage.removeItem('cartItems');
    window.location.href = '/Owner/oder.html';
  });

  renderInvoice();
});
