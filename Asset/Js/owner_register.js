const API = 'http://localhost:3000/api';

async function getNextMaKhachHang() {
    const res = await fetch(`${API}/khachhangs?limit=100`);
    const json = await res.json();
    const data = json.data || [];
    if (data.length === 0) return 'KH0000001';
    const maxNum = data.reduce((max, item) => {
        const num = parseInt(item.MaKhachHang.replace('KH', ''));
        return num > max ? num : max;
    }, 0);
    return 'KH' + String(maxNum + 1).padStart(7, '0');
}

document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const HoTen = document.querySelector('input[name="fullname"]').value.trim();
    const SoDienThoai = document.querySelector('input[name="phone"]').value.trim();
    const Email = document.querySelector('input[name="email"]').value.trim();
    const GioiTinh = document.querySelector('input[name="gender"]:checked')?.value || '';
    const MatKhau = document.querySelector('input[name="password"]').value;
    const repassword = document.querySelector('input[name="repassword"]').value;

    // Gộp địa chỉ
    const a1 = document.querySelector('input[name="address1"]').value.trim();
    const a2 = document.querySelector('input[name="address2"]').value.trim();
    const a3 = document.querySelector('input[name="address3"]').value.trim();
    const DiaChi = [a1, a2, a3].filter(a => a !== '').join(', ');

    // Validate
    if (!HoTen || !Email || !MatKhau) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }

    if (MatKhau !== repassword) {
        alert('Mật khẩu nhập lại không khớp!');
        return;
    }

    if (MatKhau.length < 6) {
        alert('Mật khẩu phải có ít nhất 6 ký tự!');
        return;
    }

    try {
        const checkRes = await fetch(`${API}/khachhangs?limit=100`);
        const checkJson = await checkRes.json();
        const existed = (checkJson.data || []).find(item => 
            item.Email.toLowerCase() === Email.toLowerCase()
        );

        if (existed) {
            alert('Email này đã được đăng ký!');
            return;
        }

        const MaKhachHang = await getNextMaKhachHang();
        const NgayTao = new Date().toISOString().split('T')[0];

        const res = await fetch(`${API}/khachhangs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                MaKhachHang,
                HoTen,
                Email,
                MatKhau,
                SoDienThoai,
                DiaChi,
                GioiTinh,
                LoaiTaiKhoan: 'KhachHang',
                NgayTao
            })
        });

        const json = await res.json();

        if (res.ok) {
            alert('Đăng ký thành công!');
            window.location.href = '/Owner/login.html';
        } else {
            alert('Lỗi: ' + json.message);
        }
    } catch (err) {
        alert('Lỗi kết nối server!');
        console.error(err);
    }
});

const Password = document.getElementById("password");
const Password2 = document.getElementById("password2");

const eye = document.getElementById("eye");
const eye2 = document.getElementById("eye2");

function togglePassword(input, icon) {
    if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

eye.onclick = () => togglePassword(Password, eye);
eye2.onclick = () => togglePassword(Password2, eye2);