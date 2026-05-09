document.addEventListener('DOMContentLoaded', () => {
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
    const imageText = items.map((it) => it.image || it.HinhAnh || '').filter(Boolean).join(', ') || '--';
    const subtotal = items.reduce((sum, it) => sum + Number(it.price || 0) * Number(it.quantity || 0), 0);

    return `
      <tr>
        <td>${productsText || '--'}</td>
        <td>${imageText}</td>
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
