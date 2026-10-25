document.addEventListener('DOMContentLoaded', async () => {
  const API = 'http://127.0.0.1:3000/api';
  const UPLOAD_URL = 'http://127.0.0.1:3000/uploads/';
  const NO_IMAGE = '/Asset/img/no-image.png';

  const tbody = document.querySelector('.order-table tbody');
  if (!tbody) return;

  const formatVnd = (n) => `${Number(n || 0).toLocaleString('vi-VN')} VNĐ`;
  const formatDate = (iso) => {
    if (!iso) return '--';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '--';
    return d.toLocaleDateString('vi-VN');
  };

  const readJson = (key, fallback) => {
    try {
      const value = JSON.parse(localStorage.getItem(key) || 'null');
      return value ?? fallback;
    } catch {
      return fallback;
    }
  };

  // ---------- Lấy danh sách sản phẩm từ API để có hình ảnh ----------
  const productById = {};
  const productByName = {};
  try {
    const res = await fetch(`${API}/sanphams?limit=100`);
    const json = await res.json();
    (json.data || []).forEach((sp) => {
      productById[sp.MaSP] = sp;
      productByName[String(sp.TenSP || '').trim().toLowerCase()] = sp;
    });
  } catch (err) {
    console.warn('Không lấy được danh sách sản phẩm:', err);
  }

  const findProduct = (item) => {
    const id = item.MaSP || item.id || item.productId;
    if (id && productById[id]) return productById[id];
    const name = String(item.name || item.product || '').trim().toLowerCase();
    return productByName[name] || null;
  };

  const getImageUrl = (item) => {
    const file = item.HinhAnh || item.image || findProduct(item)?.HinhAnh;
    if (!file) return NO_IMAGE;
    if (/^(https?:|data:|\/)/.test(file)) return file; // đã là URL đầy đủ
    return UPLOAD_URL + file;
  };

  const imageHtml = (items) => {
    if (!items.length) return '--';
    return items.map((it) => `
      <img src="${getImageUrl(it)}" alt="${it.name || 'Sản phẩm'}"
           style="width:50px; height:50px; object-fit:cover; margin:2px;"
           onerror="this.onerror=null; this.src='${NO_IMAGE}'">
    `).join('');
  };

  // ---------- Lấy đơn hàng ----------
  const currentUser = readJson('khachHang', null);
  const currentUserId = currentUser?.MaKhachHang || currentUser?.Email || 'guest';
  const historyKey = `orderHistory_${currentUserId}`;
  const infoKey = `orderInfo_${currentUserId}`;

  const scopedHistory = readJson(historyKey, []);
  const scopedFallback = readJson(infoKey, null);
  const guestHistory = currentUser ? [] : readJson('orderHistory', []);
  const guestFallback = currentUser ? null : readJson('orderInfo', null);

  const orders = Array.isArray(scopedHistory) && scopedHistory.length
    ? scopedHistory
    : (scopedFallback ? [scopedFallback] : (Array.isArray(guestHistory) && guestHistory.length ? guestHistory : (guestFallback ? [guestFallback] : [])));

  const visibleOrders = orders.filter((order) => {
    if (!currentUser) return true;
    return (order.customerId || order.MaKhachHang || order.email) === currentUserId || order.email === currentUser.Email;
  });

  if (!visibleOrders.length) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:16px;">Chưa có đơn hàng nào</td></tr>';
    return;
  }

  tbody.innerHTML = visibleOrders.map((order) => {
    const items = Array.isArray(order.cartItems) ? order.cartItems : [];
    const productsText = items.map((it) => `${it.name || 'Sản phẩm'} x${Number(it.quantity || 1)}`).join(', ');
    const subtotal = items.reduce((sum, it) => sum + Number(it.price || 0) * Number(it.quantity || 0), 0);

    return `
      <tr>
        <td>${productsText || '--'}</td>
        <td>${imageHtml(items)}</td>
        <td>${formatVnd(order.total || subtotal)}</td>
        <td>${order.phone || '--'}</td>
        <td>${order.address || '--'}</td>
        <td>${order.name || '--'}</td>
        <td>${formatDate(order.createdAt)}</td>
        <td>${order.status || 'Chờ xác nhận'}</td>
      </tr>
    `;
  }).join('');
});