const API = 'http://localhost:3000/api';
let allData = [];
let danhMucMap = {}; 

async function loadDanhMuc() {
    const res = await fetch(`${API}/danhmucs`);
    const json = await res.json();
    (json.data || []).forEach(item => {
        danhMucMap[item.MaDM] = item.TenDanhMuc; 
    });
}

async function loadSanPham() {
    try {
        await loadDanhMuc(); 
        const res = await fetch(`${API}/sanphams?limit=100`);
        const json = await res.json();
        allData = json.data || [];
        const limit = parseInt(document.getElementById('entriesSelect').value) || 10;
        renderTable(allData.slice(0, limit));
        updateFooter(Math.min(limit, allData.length), allData.length);
    } catch (err) {
        console.error('Lỗi load sản phẩm:', err);
    }
}

function renderTable(data) {
    const tbody = document.getElementById('product-body');
    if (!tbody) return;
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center">Không có dữ liệu</td></tr>';
        return;
    }
    tbody.innerHTML = data.map((item, i) => `
        <tr>
            <td>${i + 1}</td>
            <td>${item.TenSP}</td>
            <td>${item.Gia.toLocaleString('vi-VN')} VND</td>
            <td>
                <img src="http://localhost:3000/uploads/${item.HinhAnh}" 
                     alt="${item.TenSP}" 
                     style="width:60px; height:60px; object-fit:cover;"
                     onerror="this.src='/Asset/img/no-image.png'">
            </td>
            <td>${danhMucMap[item.MaDM] || item.MaDM}</td>
            <td>${item.SoLuongTon}</td>
            <td>${item.MoTa || ''}</td>
            <td>
                <b><a href="/Admin/edit_product.html?id=${item.MaSP}" style="color:#000">Edit</a></b>
                ||
                <b><a href="#" onclick="deleteSanPham('${item.MaSP}')" style="color:#000">Delete</a></b>
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
        const filtered = allData.filter(item => {
            const tenDM = (danhMucMap[item.MaDM] || '').toLowerCase(); 
            return item.TenSP.toLowerCase().includes(keyword) ||
                   (item.MoTa && item.MoTa.toLowerCase().includes(keyword)) ||
                   tenDM.includes(keyword)
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

async function deleteSanPham(id) {
    if (!confirm('Bạn có chắc muốn xoá sản phẩm này?')) return;
    try {
        const res = await fetch(`${API}/sanphams/${id}`, { method: 'DELETE' });
        const json = await res.json();
        alert(json.message);
        loadSanPham();
    } catch (err) {
        alert('Xoá thất bại!');
    }
}

if (document.getElementById('product-body')) {
    loadSanPham();
}