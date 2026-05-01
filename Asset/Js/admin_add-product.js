const API = 'http://127.0.0.1:3000/api';

async function loadOptions() {
    const dmRes = await fetch(`${API}/danhmucs`);
    const dmJson = await dmRes.json();
    const dmSelect = document.getElementById('MaDM');
    (dmJson.data || []).forEach(item => {
        dmSelect.innerHTML += `<option value="${item.MaDM}">${item.TenDanhMuc}</option>`
    });

    const hangRes = await fetch(`${API}/hangsanxuats`);
    const hangJson = await hangRes.json();
    const hangSelect = document.getElementById('MaHang');
    (hangJson.data || []).forEach(item => {
        hangSelect.innerHTML += `<option value="${item.MaHang}">${item.TenHang}</option>`
    });

    const nccRes = await fetch(`${API}/nhacungcaps`);
    const nccJson = await nccRes.json();
    const nccSelect = document.getElementById('MaNCC');
    (nccJson.data || []).forEach(item => {
        nccSelect.innerHTML += `<option value="${item.MaNCC}">${item.TenNCC}</option>`
    });
}

async function getNextMaSP() {
    const res = await fetch(`${API}/sanphams?limit=100`);
    const json = await res.json();
    const data = json.data || [];
    if (data.length === 0) return 'SP0000001';
    const maxNum = data.reduce((max, item) => {
        const num = parseInt(item.MaSP.replace('SP', ''));
        return num > max ? num : max;
    }, 0);
    return 'SP' + String(maxNum + 1).padStart(7, '0');
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

document.getElementById('addProductForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const TenSP = document.getElementById('TenSP').value.trim();
    const MaDM = document.getElementById('MaDM').value;
    const MaHang = document.getElementById('MaHang').value;
    const MaNCC = document.getElementById('MaNCC').value;
    const Gia = parseInt(document.getElementById('Gia').value);
    const SoLuongTon = parseInt(document.getElementById('SoLuongTon').value);
    const MoTa = CKEDITOR.instances.editor.getData();
    const fileInput = document.getElementById('HinhAnh');

    if (!TenSP || !MaDM || !MaHang || !MaNCC || !Gia || !SoLuongTon) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    try {
        let HinhAnh = '';
        if (fileInput.files.length > 0) {
            HinhAnh = await uploadImage(fileInput.files[0]);
        }

        const MaSP = await getNextMaSP();
        const NgayThem = new Date().toISOString().split('T')[0];

        const res = await fetch(`${API}/sanphams`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                MaSP, TenSP, MaDM, MaHang, MaNCC,
                Gia, SoLuongTon, MoTa, HinhAnh,
                UuDaiSV: false,
                NgayThem
            })
        });

        const json = await res.json();

        if (res.ok) {
            alert('Thêm sản phẩm thành công! Mã: ' + MaSP);
            this.reset();
            CKEDITOR.instances.editor.setData('');
        } else {
            alert('Lỗi: ' + json.message);
        }
    } catch (err) {
        alert('Lỗi kết nối server!');
        console.error(err);
    }
});

loadOptions();