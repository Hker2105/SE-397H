document.addEventListener('DOMContentLoaded', () => {
  const SHIPPING_FEE = 200000;

  const inputs = {
    name: document.querySelector('input[placeholder="Họ và tên"]'),
    phone: document.querySelector('input[placeholder="Số điện thoại"]'),
    email: document.querySelector('input[placeholder="Email"]'),
    address: document.querySelector('input[placeholder="Địa chỉ"]'),
    note: document.querySelector('input[placeholder="Ghi chú"]'),
  };

  const orderBtn = document.querySelector('.order-btn');
  const productsEl = document.getElementById('order-products');
  const subtotalEl = document.getElementById('order-subtotal');
  const shippingEl = document.getElementById('order-shipping');
  const paymentMethodEl = document.getElementById('order-payment-method');

  if (!orderBtn || !productsEl || !subtotalEl || !shippingEl || !paymentMethodEl) return;

  const format = (n) => `${Number(n || 0).toLocaleString('vi-VN')} VNĐ`;
  const readJson = (key, fallback) => {
    try {
      const value = JSON.parse(localStorage.getItem(key) || 'null');
      return value ?? fallback;
    } catch {
      return fallback;
    }
  };
  const getCurrentUser = () => readJson('khachHang', null);
  const getCurrentUserId = () => {
    const user = getCurrentUser();
    return user?.MaKhachHang || user?.Email || 'guest';
  };
  const getOrderHistoryKey = () => `orderHistory_${getCurrentUserId()}`;
  const getOrderInfoKey = () => `orderInfo_${getCurrentUserId()}`;

  const getCartItems = () => {
    const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems') || '[]');
    if (Array.isArray(checkoutItems) && checkoutItems.length) return checkoutItems;
    return JSON.parse(localStorage.getItem('cartItems') || '[]');
  };

  const renderInvoice = () => {
    const items = getCartItems();
    if (!items.length) {
      productsEl.innerHTML = '<strong>Sản phẩm: (trống)</strong>';
      subtotalEl.innerHTML = `<strong>Thành tiền: ${format(0)}</strong>`;
      shippingEl.innerHTML = `<strong>Phí vận chuyển: ${format(0)}</strong>`;
      orderBtn.disabled = true;
      orderBtn.style.opacity = '0.6';
      return;
    }

    const normalized = items.map((i) => ({
      name: i.name || i.product || 'Sản phẩm',
      quantity: Number(i.quantity || 1),
      price: Number(i.price || 0),
    }));

    const subtotal = normalized.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const names = normalized.map((i) => `${i.name} x${i.quantity}`).join(', ');

    productsEl.innerHTML = `<strong>Sản phẩm: ${names}</strong>`;
    subtotalEl.innerHTML = `<strong>Thành tiền: ${format(subtotal)}</strong>`;
    shippingEl.innerHTML = `<strong>Phí vận chuyển: ${format(SHIPPING_FEE)}</strong>`;
    orderBtn.disabled = false;
    orderBtn.style.opacity = '1';
  };

  const validate = () => {
    if (!inputs.name.value.trim()) return alert('Vui lòng nhập họ và tên');
    if (!inputs.phone.value.trim()) return alert('Vui lòng nhập số điện thoại');
    if (!inputs.email.value.trim()) return alert('Vui lòng nhập email');
    if (!inputs.address.value.trim()) return alert('Vui lòng nhập địa chỉ');
    if (!paymentMethodEl.value) return alert('Vui lòng chọn phương thức thanh toán');
    return true;
  };

  orderBtn.addEventListener('click', () => {
    const cartItems = getCartItems();
    if (!cartItems.length) return alert('Giỏ hàng đang trống!');
    if (!validate()) return;

    const currentUser = getCurrentUser();
    const currentUserId = getCurrentUserId();
    const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);

    const orderRecord = {
      id: `OD${Date.now()}`,
      customerId: currentUserId,
      MaKhachHang: currentUser?.MaKhachHang || '',
      name: inputs.name.value.trim(),
      phone: inputs.phone.value.trim(),
      email: inputs.email.value.trim(),
      address: inputs.address.value.trim(),
      note: inputs.note.value.trim(),
      paymentMethod: paymentMethodEl.value,
      cartItems,
      total: subtotal,
      createdAt: new Date().toISOString(),
      status: 'Chờ xác nhận',
    };

    localStorage.setItem(getOrderInfoKey(), JSON.stringify(orderRecord));
    const history = readJson(getOrderHistoryKey(), []);
    const safeHistory = Array.isArray(history) ? history : [];
    safeHistory.unshift(orderRecord);
    localStorage.setItem(getOrderHistoryKey(), JSON.stringify(safeHistory));

    alert('Đặt hàng thành công!');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('checkoutItems');
    window.location.href = '/index.html';
  });

  renderInvoice();
});
