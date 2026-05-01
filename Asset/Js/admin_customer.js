const API = 'http://127.0.0.1:3000/api';
let allData = [];

async function loadKhachHang() {
    try {
        const res = await fetch(`${API}/khachhangs?limit=100`);
        const json = await res.json();
        allData = json.data || [];
        const limit = parseInt(document.getElementById('entriesSelect').value) || 10;
        renderTable(allData.slice(0, limit));
        updateFooter(Math.min(limit, allData.length), allData.length);
    } catch (err) {
        console.error('Lỗi load khách hàng:', err);
    }
}

function renderTable(data) {
    const tbody = document.getElementById('customer-body');
    if (!tbody) return;
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align:center">Không có dữ liệu</td></tr>';
        return;
    }
    tbody.innerHTML = data.map((item, i) => `
        <tr>
            <td>${i + 1}</td>
            <td>${item.MaKhachHang}</td>
            <td>Mở</td>
            <td>${item.HoTen}</td>
            <td>${item.GioiTinh || ''}</td>
            <td>${item.SoDienThoai || ''}</td>
            <td>${item.Email}</td>
            <td>${item.DiaChi || ''}</td>
            <td>${item.LoaiTaiKhoan}</td>
            <td>
                <b><a href="#" onclick="deleteKhachHang('${item.MaKhachHang}')" style="color:#000">Delete</a></b>
            </td>
        </tr>
    `).join('');
    updateFooter(data.length, allData.length);
}

function updateFooter(shown, total) {
    const footer = document.querySelector('.table-footer');
    if (footer) footer.textContent = `Showing 1 to ${shown} of ${total} entries`;
}

const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const keyword = this.value.toLowerCase();
        const limit = parseInt(document.getElementById('entriesSelect').value) || 10;
        const filtered = allData.filter(item =>
            item.HoTen.toLowerCase().includes(keyword) ||
            item.Email.toLowerCase().includes(keyword) ||
            (item.SoDienThoai && item.SoDienThoai.includes(keyword))
        );
        renderTable(filtered.slice(0, limit));
        updateFooter(Math.min(limit, filtered.length), filtered.length);
    });
}

const selectEntries = document.getElementById('entriesSelect');
if (selectEntries) {
    selectEntries.addEventListener('change', function() {
        const limit = parseInt(this.value);
        renderTable(allData.slice(0, limit));
        updateFooter(Math.min(limit, allData.length), allData.length);
    });
}

async function deleteKhachHang(id) {
    if (!confirm('Bạn có chắc muốn xoá tài khoản này?')) return;
    try {
        const res = await fetch(`${API}/khachhangs/${id}`, { method: 'DELETE' });
        const json = await res.json();
        alert(json.message);
        loadKhachHang();
    } catch (err) {
        alert('Xoá thất bại!');
    }
}

if (document.getElementById('customer-body')) {
    loadKhachHang();
}