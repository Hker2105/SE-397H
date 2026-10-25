document.addEventListener('DOMContentLoaded', () => {
  const API = 'http://127.0.0.1:3000/api';
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

  if (!orderBtn || !productsEl || !subtotalEl || !shippingEl) return;

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
  const getPaymentMethod = () => localStorage.getItem('paymentMethod') || '';

  const getCartItems = () => {
    const checkoutItems = readJson('checkoutItems', []);
    if (Array.isArray(checkoutItems) && checkoutItems.length) return checkoutItems;
    const cartItems = readJson('cartItems', []);
    return Array.isArray(cartItems) ? cartItems : [];
  };

  const normalizeItems = (items) =>
    items.map((i) => ({
      ...i,
      name: i.name || i.product || 'Sản phẩm',
      quantity: Number(i.quantity || 1),
      price: Number(i.price || 0),
    }));

  // ---------- Hóa đơn ----------
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

    const normalized = normalizeItems(items);
    const subtotal = normalized.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const names = normalized.map((i) => `${i.name} x${i.quantity}`).join(', ');

    productsEl.innerHTML = `<strong>Sản phẩm: ${names}</strong>`;
    subtotalEl.innerHTML = `<strong>Thành tiền: ${format(subtotal)}</strong>`;
    shippingEl.innerHTML = `<strong>Phí vận chuyển: ${format(SHIPPING_FEE)}</strong>`;
    orderBtn.disabled = false;
    orderBtn.style.opacity = '1';
  };

  // ---------- Tự điền từ thông tin tài khoản ----------
  const prefillForm = async () => {
    const fill = (el, value) => { if (el && value) el.value = value; };

    let user = getCurrentUser() || {};
    if (user.MaKhachHang) {
      try {
        const res = await fetch(`${API}/khachhangs/${user.MaKhachHang}`);
        if (res.ok) {
          const json = await res.json();
          if (json.data) user = { ...user, ...json.data };
        }
      } catch (err) {
        console.warn('Không lấy được thông tin tài khoản từ server, dùng dữ liệu đã lưu.', err);
      }
    }

    fill(inputs.name, user.HoTen);
    fill(inputs.phone, user.SoDienThoai);
    fill(inputs.email, user.Email);
    fill(inputs.address, user.DiaChi);
  };

  // ---------- Kiểm tra dữ liệu ----------
  const validate = () => {
    const get = (el) => (el ? el.value.trim() : '');

    if (!get(inputs.name)) { alert('Vui lòng nhập họ và tên'); return false; }
    if (!get(inputs.phone)) { alert('Vui lòng nhập số điện thoại'); return false; }
    if (!/^(0|\+84)\d{9,10}$/.test(get(inputs.phone))) { alert('Số điện thoại không hợp lệ'); return false; }
    if (!get(inputs.email)) { alert('Vui lòng nhập email'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get(inputs.email))) { alert('Email không hợp lệ'); return false; }
    if (!get(inputs.address)) { alert('Vui lòng nhập địa chỉ'); return false; }

    if (!getPaymentMethod()) {
      alert('Bạn chưa chọn phương thức thanh toán. Vui lòng quay lại bước trước.');
      window.location.href = 'pay.html';
      return false;
    }
    return true;
  };

  // ---------- Gửi đơn lên server (để admin thấy) ----------
  const resolveMaSP = async (items) => {
    const needLookup = items.some((i) => !(i.MaSP || i.productId));
    const byName = {};
    if (needLookup) {
      try {
        const res = await fetch(`${API}/sanphams?limit=100`);
        const json = await res.json();
        (json.data || []).forEach((sp) => {
          byName[String(sp.TenSP || '').trim().toLowerCase()] = sp.MaSP;
        });
      } catch (err) {
        console.warn('Không lấy được danh sách sản phẩm', err);
      }
    }
    return items.map((i) => ({
      ...i,
      MaSP: i.MaSP || i.productId || byName[i.name.trim().toLowerCase()],
    }));
  };

  const sendOrdersToServer = async (items, note) => {
    const maKH = getCurrentUser()?.MaKhachHang;
    if (!maKH) throw new Error('Không tìm thấy mã khách hàng, vui lòng đăng nhập lại.');

    const resolved = await resolveMaSP(normalizeItems(items));
    const missing = resolved.filter((i) => !i.MaSP);
    if (missing.length) {
      throw new Error('Không xác định được mã sản phẩm: ' + missing.map((m) => m.name).join(', '));
    }

    for (const item of resolved) {
      const res = await fetch(`${API}/donhangs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          MaKhachHang: maKH,
          MaSP: item.MaSP,
          SoLuong: item.quantity,
          DonGia: item.price,
          TongTien: item.price * item.quantity,
          NgayDat: new Date().toISOString().split('T')[0],
          GhiChu: note,
          TinhTrang: 'Chờ xác nhận',
        }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.message || 'Server từ chối tạo đơn hàng');
      }
    }
  };

  // ---------- Bấm Đặt Hàng ----------
  orderBtn.addEventListener('click', async () => {
    const cartItems = getCartItems();
    if (!cartItems.length) {
      alert('Giỏ hàng đang trống!');
      return;
    }
    if (!validate()) return;

    const currentUser = getCurrentUser();
    const subtotal = normalizeItems(cartItems).reduce((s, i) => s + i.price * i.quantity, 0);
    const note = inputs.note ? inputs.note.value.trim() : '';

    orderBtn.disabled = true;
    try {
      await sendOrdersToServer(cartItems, note);
    } catch (err) {
      console.error(err);
      alert('Đặt hàng thất bại: ' + err.message);
      orderBtn.disabled = false;
      return;
    }

    const orderRecord = {
      id: `OD${Date.now()}`,
      customerId: getCurrentUserId(),
      MaKhachHang: currentUser?.MaKhachHang || '',
      name: inputs.name.value.trim(),
      phone: inputs.phone.value.trim(),
      email: inputs.email.value.trim(),
      address: inputs.address.value.trim(),
      note,
      paymentMethod: getPaymentMethod(),
      cartItems,
      total: subtotal,
      shippingFee: SHIPPING_FEE,
      createdAt: new Date().toISOString(),
      status: 'Chờ xác nhận',
    };

    localStorage.setItem(getOrderInfoKey(), JSON.stringify(orderRecord));
    const history = readJson(getOrderHistoryKey(), []);
    const safeHistory = Array.isArray(history) ? history : [];
    safeHistory.unshift(orderRecord);
    localStorage.setItem(getOrderHistoryKey(), JSON.stringify(safeHistory));

    localStorage.removeItem('cartItems');
    localStorage.removeItem('checkoutItems');
    localStorage.removeItem('paymentMethod');

    alert('Đặt hàng thành công!');
    window.location.href = 'order_history.html';
  });

  renderInvoice();
  prefillForm();
});