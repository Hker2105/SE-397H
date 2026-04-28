const API = 'http://localhost:3000/api';
let allData = [];
let khachHangMap = {};

async function loadKhachHang() {
    const res = await fetch(`${API}/khachhangs?limit=100`);
    const json = await res.json();
    (json.data || []).forEach(item => {
        khachHangMap[item.MaKhachHang] = item;
    });
}

async function loadDonHang() {
    try {
        await loadKhachHang();
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
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center">Không có dữ liệu</td></tr>';
        return;
    }
    tbody.innerHTML = data.map((item, i) => {
        const kh = khachHangMap[item.MaKhachHang] || {};
        return `
        <tr>
            <td>${i + 1}</td>
            <td>${kh.HoTen || item.MaKhachHang}</td>
            <td>${item.NgayDat ? item.NgayDat.split('T')[0] : ''}</td>
            <td>${kh.DiaChi || ''}</td>
            <td>${kh.SoDienThoai || ''}</td>
            <td>${item.GhiChu || ''}</td>
            <td>${item.TinhTrang}</td>
            <td>
                <b><a href="#" onclick="deleteDonHang('${item.MaDH}')" style="color:#000">Delete</a></b>
            </td>
        </tr>
        `
    }).join('');
    updateFooter(data.length, allData.length);
}

function updateFooter(shown, total) {
    const footer = document.querySelector('.table-footer');
    if (footer) footer.textContent = `Showing 1 to ${shown} of ${total} entries`;
}

// Filter theo tình trạng
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

// Search
const searchInput = document.querySelector('.controls input');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const keyword = this.value.toLowerCase();
        const filtered = allData.filter(item => {
            const kh = khachHangMap[item.MaKhachHang] || {};
            return (kh.HoTen && kh.HoTen.toLowerCase().includes(keyword)) ||
                   item.TinhTrang.toLowerCase().includes(keyword) ||
                   (item.GhiChu && item.GhiChu.toLowerCase().includes(keyword));
        });
        renderTable(filtered);
    });
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

if (document.getElementById('order-body')) {
    loadDonHang();
}