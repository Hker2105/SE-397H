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

async function loadDanhGia() {
    try {
        await loadKhachHang();
        await loadSanPham();
        const res = await fetch(`${API}/danhgias?limit=100`);
        const json = await res.json();
        allData = json.data || [];
        const limit = parseInt(document.getElementById('entriesSelect')?.value) || 10;
        renderTable(allData.slice(0, limit));
        updateFooter(Math.min(limit, allData.length), allData.length);
    } catch (err) {
        console.error('Lỗi load đánh giá:', err);
    }
}

function renderStars(diem) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= diem ? '⭐' : '☆';
    }
    return stars;
}

function renderTable(data) {
    const tbody = document.getElementById('customer-body');
    if (!tbody) return;
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center">Không có dữ liệu</td></tr>';
        return;
    }
    tbody.innerHTML = data.map((item, i) => {
        const kh = khachHangMap[item.MaKhachHang] || {};
        const sp = sanPhamMap[item.MaSP] || {};
        return `
        <tr>
            <td>${i + 1}</td>
            <td>${kh.HoTen || item.MaKhachHang}</td>
            <td>${sp.TenSP || item.MaSP || ''}</td>
            <td>
                <img src="http://127.0.0.1:3000/uploads/${sp.HinhAnh || ''}"
                     style="width:50px; height:50px; object-fit:cover;"
                     onerror="this.src='/Asset/img/no-image.png'">
            </td>
            <td>${renderStars(item.Diem)}</td>
            <td>${item.NoiDung || ''}</td>
            <td>${item.NgayDG ? item.NgayDG.split('T')[0] : ''}</td>
            <td>
                <b><a href="#" onclick="deleteDanhGia('${item.MaDG}')" style="color:#000">Delete</a></b>
            </td>
        </tr>
        `;
    }).join('');
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
        const limit = parseInt(document.getElementById('entriesSelect')?.value) || 10;
        const filtered = allData.filter(item => {
            const kh = khachHangMap[item.MaKhachHang] || {};
            const sp = sanPhamMap[item.MaSP] || {};
            return (kh.HoTen && kh.HoTen.toLowerCase().includes(keyword)) ||
                   (sp.TenSP && sp.TenSP.toLowerCase().includes(keyword)) ||
                   (item.NoiDung && item.NoiDung.toLowerCase().includes(keyword));
        });
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

async function deleteDanhGia(id) {
    if (!confirm('Bạn có chắc muốn xoá đánh giá này?')) return;
    try {
        const res = await fetch(`${API}/danhgias/${id}`, { method: 'DELETE' });
        const json = await res.json();
        alert(json.message);
        loadDanhGia();
    } catch (err) {
        alert('Xoá thất bại!');
    }
}

if (document.getElementById('customer-body')) {
    loadDanhGia();
}