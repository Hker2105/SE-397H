const API = 'http://127.0.0.1:3000/api';
const khachHang = JSON.parse(localStorage.getItem('khachHang'));

if (!khachHang) {
    alert('Vui lòng đăng nhập trước!');
    window.location.href = '/Owner/login.html';
}

async function loadThongTin() {
    try {
        const res = await fetch(`${API}/khachhangs/${khachHang.MaKhachHang}`);
        const json = await res.json();
        const data = json.data;

        document.getElementById('HoTen').value = data.HoTen || '';
        document.getElementById('SoDienThoai').value = data.SoDienThoai || '';
        document.getElementById('Email').value = data.Email || '';

        if (data.GioiTinh) {
            const radios = document.querySelectorAll('input[name="gender"]');
            radios.forEach(radio => {
                if (radio.value === data.GioiTinh) radio.checked = true;
            });
        }

        const diaChi = (data.DiaChi || '').split(',').map(s => s.trim());
        document.getElementById('DiaChi1').value = diaChi[0] || '';
        document.getElementById('DiaChi2').value = diaChi[1] || '';
        document.getElementById('DiaChi3').value = diaChi[2] || '';

    } catch (err) {
        console.error('Lỗi load thông tin:', err);
    }
}

document.querySelector('.btn-update').addEventListener('click', async function() {
    const HoTen = document.getElementById('HoTen').value.trim();
    const SoDienThoai = document.getElementById('SoDienThoai').value.trim();
    const Email = document.getElementById('Email').value.trim();
    const GioiTinh = document.querySelector('input[name="gender"]:checked')?.value || '';

    const d1 = document.getElementById('DiaChi1').value.trim();
    const d2 = document.getElementById('DiaChi2').value.trim();
    const d3 = document.getElementById('DiaChi3').value.trim();
    const DiaChi = [d1, d2, d3].filter(d => d !== '').join(', ');

    if (!HoTen || !Email) {
        alert('Họ tên và email không được để trống!');
        return;
    }

    try {
        const res = await fetch(`${API}/khachhangs/${khachHang.MaKhachHang}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ HoTen, SoDienThoai, Email, GioiTinh, DiaChi })
        });

        const json = await res.json();

        if (res.ok) {
            const updated = { ...khachHang, HoTen, SoDienThoai, Email, GioiTinh, DiaChi };
            localStorage.setItem('khachHang', JSON.stringify(updated));
            alert('Cập nhật thông tin thành công!');
        } else {
            alert('Lỗi: ' + json.message);
        }
    } catch (err) {
        alert('Lỗi kết nối server!');
        console.error(err);
    }
});

loadThongTin();