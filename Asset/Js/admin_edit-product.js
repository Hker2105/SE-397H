const API = 'http://localhost:3000/api';

// Lấy id từ URL
const urlParams = new URLSearchParams(window.location.search);
const MaSP = urlParams.get('id');

async function loadOptions(selectedDM, selectedHang, selectedNCC) {
    // Load danh mục
    const dmRes = await fetch(`${API}/danhmucs`);
    const dmJson = await dmRes.json();
    const dmSelect = document.getElementById('MaDM');
    (dmJson.data || []).forEach(item => {
        dmSelect.innerHTML += `<option value="${item.MaDM}" ${item.MaDM === selectedDM ? 'selected' : ''}>${item.TenDanhMuc}</option>`
    });

    // Load hãng sản xuất
    const hangRes = await fetch(`${API}/hangsanxuats`);
    const hangJson = await hangRes.json();
    const hangSelect = document.getElementById('MaHang');
    (hangJson.data || []).forEach(item => {
        hangSelect.innerHTML += `<option value="${item.MaHang}" ${item.MaHang === selectedHang ? 'selected' : ''}>${item.TenHang}</option>`
    });

    // Load nhà cung cấp
    const nccRes = await fetch(`${API}/nhacungcaps`);
    const nccJson = await nccRes.json();
    const nccSelect = document.getElementById('MaNCC');
    (nccJson.data || []).forEach(item => {
        nccSelect.innerHTML += `<option value="${item.MaNCC}" ${item.MaNCC === selectedNCC ? 'selected' : ''}>${item.TenNCC}</option>`
    });
}

async function loadSanPham() {
    try {
        const res = await fetch(`${API}/sanphams/${MaSP}`);
        const json = await res.json();
        const sp = json.data;

        // Điền data vào form
        document.getElementById('MaSP').value = sp.MaSP;
        document.getElementById('TenSP').value = sp.TenSP;
        document.getElementById('Gia').value = sp.Gia;
        document.getElementById('SoLuongTon').value = sp.SoLuongTon;

        // Hiện ảnh hiện tại
        const img = document.getElementById('currentImage');
        img.src = `http://localhost:3000/uploads/${sp.HinhAnh}`;
        img.onerror = () => img.src = '/Asset/img/no-image.png';

        // Load options và chọn đúng giá trị
        await loadOptions(sp.MaDM, sp.MaHang, sp.MaNCC);

        // Set mô tả vào CKEditor
        CKEDITOR.instances.editor.setData(sp.MoTa || '');

    } catch (err) {
        console.error('Lỗi load sản phẩm:', err);
        alert('Không tìm thấy sản phẩm!');
    }
}

async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${API}/images/uploads`, {
        method: 'POST',
        body: formData
    });
    const json = await res.json();
    return json.files[0];
}

document.getElementById('editProductForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log('submit clicked') 
    console.log('MaSP:', MaSP)

    const TenSP = document.getElementById('TenSP').value.trim();
    const MaDM = document.getElementById('MaDM').value;
    const MaHang = document.getElementById('MaHang').value;
    const MaNCC = document.getElementById('MaNCC').value;
    const Gia = parseInt(document.getElementById('Gia').value);
    const SoLuongTon = parseInt(document.getElementById('SoLuongTon').value);
    const MoTa = CKEDITOR.instances.editor.getData();
    const fileInput = document.getElementById('HinhAnh');

    console.log('body:', {TenSP, MaDM, MaHang, MaNCC, Gia, SoLuongTon, MoTa})

    if (!TenSP || !MaDM || !MaHang || !MaNCC || !Gia || !SoLuongTon) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    try {
        let HinhAnh = undefined;
        if (fileInput.files.length > 0) {
            HinhAnh = await uploadImage(fileInput.files[0]);
        }

        const body = { TenSP, MaDM, MaHang, MaNCC, Gia, SoLuongTon, MoTa }
        if (HinhAnh) body.HinhAnh = HinhAnh;

        const res = await fetch(`${API}/sanphams/${MaSP}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const json = await res.json();
        console.log('response:', json)

        if (res.ok) {
            alert('Cập nhật sản phẩm thành công!');
            window.location.href = '/Admin/product_management.html';
        } else {
            alert('Lỗi: ' + json.message);
        }
    } catch (err) {
        alert('Lỗi kết nối server!');
        console.error(err);
    }
});

// Load data khi trang sẵn sàng
window.addEventListener('load', () => {
    if (MaSP) {
        loadSanPham();
    } else {
        alert('Không tìm thấy mã sản phẩm!');
        window.location.href = '/Admin/product_management.html';
    }
});