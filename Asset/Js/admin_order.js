const API = 'http://127.0.0.1:3000/api';
let allData = [];
let khachHangMap = {};
let sanPhamMap = {};

async function loadKhachHang() {
    const res = await fetch(`${API}/khachhangs?limit=100`);
    const json = await res.json();
    (json.data || []).forEach(item => {
        khachHangMap[item.MaKhachHang] = item;
    });
}

async function loadSanPham() {
    const res = await fetch(`${API}/sanphams?limit=100`);
    const json = await res.json();
    (json.data || []).forEach(item => {
        sanPhamMap[item.MaSP] = item;
    });
}

async function loadDonHang() {
    try {
        await loadKhachHang();
        await loadSanPham();
        const res = await fetch(`${API}/donhangs?limit=100`);
        const json = await res.json();
        allData = json.data || [];
        renderTable(allData);
        updateFooter(allData.length, allData.length);
    } catch (err) {
        console.error('Lỗi load đơn hàng:', err);
    }
}

function renderTable(data) {
    const tbody = document.getElementById('order-body');
    if (!tbody) return;
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="11" style="text-align:center">Không có dữ liệu</td></tr>';
        return;
    }
    tbody.innerHTML = data.map((item, i) => {
        const kh = khachHangMap[item.MaKhachHang] || {};
        const sp = sanPhamMap[item.MaSP] || {};
        const thaoTac = item.TinhTrang === 'Chờ xác nhận'
            ? `<b><a href="#" onclick="xacNhanDonHang('${item.MaDH}')" style="color:green">Xác nhận</a></b>`
            : `<b><a href="#" onclick="deleteDonHang('${item.MaDH}')" style="color:#000">Delete</a></b>`;
        return `
        <tr>
            <td>${i + 1}</td>
            <td>${kh.HoTen || item.MaKhachHang}</td>
            <td>${sp.TenSP || item.MaSP || ''}</td>
            <td>${item.DonGia ? item.DonGia.toLocaleString('vi-VN') + ' VND' : ''}</td>
            <td>
                <img src="http://127.0.0.1:3000/uploads/${sp.HinhAnh || ''}" 
                     style="width:50px; height:50px; object-fit:cover;"
                     onerror="this.src='/Asset/img/no-image.png'">
            </td>
            <td>${item.NgayDat ? item.NgayDat.split('T')[0] : ''}</td>
            <td>${kh.DiaChi || ''}</td>
            <td>${kh.SoDienThoai || ''}</td>
            <td>${item.GhiChu || ''}</td>
            <td>${item.TinhTrang}</td>
            <td>${thaoTac}</td>
        </tr>
        `
    }).join('');
    updateFooter(data.length, allData.length);
}

function updateFooter(shown, total) {
    const footer = document.querySelector('.table-footer');
    if (footer) footer.textContent = `Showing 1 to ${shown} of ${total} entries`;
}

async function xacNhanDonHang(id) {
    if (!confirm('Xác nhận đơn hàng này?')) return;
    try {
        const res = await fetch(`${API}/donhangs/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ TinhTrang: 'Đang giao' })
        });
        const json = await res.json();
        if (res.ok) {
            alert('Xác nhận đơn hàng thành công!');
            loadDonHang(); 
        } else {
            alert('Lỗi: ' + json.message);
        }
    } catch (err) {
        alert('Xác nhận thất bại!');
    }
}

async function deleteDonHang(id) {
    if (!confirm('Bạn có chắc muốn xoá đơn hàng này?')) return;
    try {
        const res = await fetch(`${API}/donhangs/${id}`, { method: 'DELETE' });
        const json = await res.json();
        alert(json.message);
        loadDonHang();
    } catch (err) {
        alert('Xoá thất bại!');
    }
}

const selectFilter = document.getElementById('filterSelect');
if (selectFilter) {
    selectFilter.addEventListener('change', function() {
        const map = {
            'Đơn chờ xét duyệt': 'Chờ xác nhận',
            'Đơn đang giao': 'Đang giao',
            'Đơn đã thanh toán': 'Đã giao',
            'Đơn đã huỷ': 'Đã hủy'
        };
        const tinhTrang = map[this.value];
        if (tinhTrang) {
            const filtered = allData.filter(item => item.TinhTrang === tinhTrang);
            renderTable(filtered);
            updateFooter(filtered.length, allData.length);
        } else {
            renderTable(allData);
            updateFooter(allData.length, allData.length);
        }
    });
}

const searchInput = document.querySelector('.controls input');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const keyword = this.value.toLowerCase();
        const filtered = allData.filter(item => {
            const kh = khachHangMap[item.MaKhachHang] || {};
            const sp = sanPhamMap[item.MaSP] || {};
            return (kh.HoTen && kh.HoTen.toLowerCase().includes(keyword)) ||
                   (sp.TenSP && sp.TenSP.toLowerCase().includes(keyword)) ||
                   item.TinhTrang.toLowerCase().includes(keyword) ||
                   (item.GhiChu && item.GhiChu.toLowerCase().includes(keyword));
        });
        renderTable(filtered);
    });
}

if (document.getElementById('order-body')) {
    loadDonHang();
}