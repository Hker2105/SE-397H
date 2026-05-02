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

  const history = JSON.parse(localStorage.getItem('orderHistory') || '[]');
  const fallback = JSON.parse(localStorage.getItem('orderInfo') || 'null');
  const orders = Array.isArray(history) && history.length ? history : (fallback ? [fallback] : []);

  if (!orders.length) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:16px;">Chưa có đơn hàng nào</td></tr>';
    return;
  }

  tbody.innerHTML = orders.map((order) => {
    const items = Array.isArray(order.cartItems) ? order.cartItems : [];
    const productsText = items.map((it) => `${it.name || 'Sản phẩm'} x${Number(it.quantity || 1)}`).join(', ');
    const subtotal = items.reduce((sum, it) => sum + Number(it.price || 0) * Number(it.quantity || 0), 0);

    return `
      <tr>
        <td>${productsText || '--'}</td>
        <td>--</td>
        <td>${formatVnd(subtotal)}</td>
        <td>${order.phone || '--'}</td>
        <td>${order.address || '--'}</td>
        <td>${order.name || '--'}</td>
        <td>${formatDate(order.createdAt)}</td>
        <td>${order.status || 'Chờ xác nhận'}</td>
      </tr>
    `;
  }).join('');
});
