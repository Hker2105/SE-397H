const API = 'http://localhost:3000/api';
let allData = [];

// ========== XEM DANH MỤC ==========
async function loadDanhMuc() {
    try {
        const res = await fetch(`${API}/danhmucs`);
        const json = await res.json();
        allData = json.data || [];
        renderTable(allData);
        updateFooter(allData.length, allData.length);
    } catch (err) {
        console.error('Lỗi load danh mục:', err);
    }
}

function renderTable(data) {
    const tbody = document.getElementById('category-body');
    if (!tbody) return;
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center">Không có dữ liệu</td></tr>';
        return;
    }
    tbody.innerHTML = data.map((item, i) => `
        <tr>
            <td>${i + 1}</td>
            <td>${item.TenDanhMuc}</td>
            <td>Mở</td>
            <td>
                <b><a href="#" onclick="deleteDanhMuc('${item.MaDM}')" style="color:#000">Delete</a></b>
            </td>
        </tr>
    `).join('');
    updateFooter(data.length, allData.length);
}

function updateFooter(shown, total) {
    const footer = document.querySelector('.table-footer');
    if (footer) footer.textContent = `Showing 1 to ${shown} of ${total} entries`;
}

const searchInput = document.querySelector('.controls input');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const keyword = this.value.toLowerCase();
        const filtered = allData.filter(item => item.TenDanhMuc.toLowerCase().includes(keyword));
        renderTable(filtered);
    });
}

const selectEntries = document.querySelector('.controls select');
if (selectEntries) {
    selectEntries.addEventListener('change', function() {
        const limit = parseInt(this.value);
        renderTable(allData.slice(0, limit));
    });
}

async function deleteDanhMuc(id) {
    if (!confirm('Bạn có chắc muốn xoá danh mục này?')) return;
    try {
        const res = await fetch(`${API}/danhmucs/${id}`, { method: 'DELETE' });
        const json = await res.json();
        alert(json.message);
        loadDanhMuc();
    } catch (err) {
        alert('Xoá thất bại!');
    }
}

// ========== THÊM DANH MỤC ==========
async function getNextMaDM() {
    const res = await fetch(`${API}/danhmucs`);
    const json = await res.json();
    const data = json.data || [];
    if (data.length === 0) return 'DM0000001';
    const maxNum = data.reduce((max, item) => {
        const num = parseInt(item.MaDM.replace('DM', ''));
        return num > max ? num : max;
    }, 0);
    return 'DM' + String(maxNum + 1).padStart(7, '0');
}

const categoryForm = document.querySelector('.category-form');
if (categoryForm) {
    categoryForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const TenDanhMuc = document.getElementById('tenDanhMuc').value.trim();
        const MoTa = document.getElementById('moTa').value.trim();

        if (!TenDanhMuc) {
            alert('Vui lòng nhập tên danh mục!');
            return;
        }

        try {
            const checkRes = await fetch(`${API}/danhmucs`);
            const checkJson = await checkRes.json();
            const existed = checkJson.data.find(item =>
                item.TenDanhMuc.toLowerCase() === TenDanhMuc.toLowerCase()
            );

            if (existed) {
                alert('Danh mục "' + TenDanhMuc + '" đã tồn tại!');
                return;
            }

            const MaDM = await getNextMaDM();

            const res = await fetch(`${API}/danhmucs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ MaDM, TenDanhMuc, MoTa })
            });

            const json = await res.json();

            if (res.ok) {
                alert(`Thêm danh mục thành công! Mã: ${MaDM}`);
                this.reset();
            } else {
                alert('Lỗi: ' + json.message);
            }
        } catch (err) {
            alert('Lỗi kết nối server!');
            console.error(err);
        }
    });
}

if (document.getElementById('category-body')) {
    loadDanhMuc();
}