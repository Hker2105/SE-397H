const API = 'http://127.0.0.1:3000/api';

// Tạo mã captcha ngẫu nhiên
function generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
}

let currentCaptcha = generateCaptcha();

// Hiện captcha lên nút
document.querySelector('.login-captcha-btn').textContent = currentCaptcha;

// Click vào nút captcha để tạo mã mới
document.querySelector('.login-captcha-btn').addEventListener('click', function() {
    currentCaptcha = generateCaptcha();
    this.textContent = currentCaptcha;
});

// Xử lý đăng nhập
document.querySelector('.login-btn').addEventListener('click', async function() {
    const email = document.querySelectorAll('.login-input-group input')[0].value.trim();
    const matKhau = document.querySelectorAll('.login-input-group input')[1].value.trim();
    const captchaInput = document.querySelector('.login-captcha-group input').value.trim().toUpperCase();

    if (!email || !matKhau) {
        alert('Vui lòng nhập email và mật khẩu!');
        return;
    }

    // Kiểm tra captcha
    if (captchaInput !== currentCaptcha) {
        alert('Mã xác nhận không đúng!');
        currentCaptcha = generateCaptcha();
        document.querySelector('.login-captcha-btn').textContent = currentCaptcha;
        document.querySelector('.login-captcha-group input').value = '';
        return;
    }

    try {
        const res = await fetch(`${API}/khachhangs?limit=100`);
        const json = await res.json();
        const data = json.data || [];

        // Tìm khách hàng theo email
        const khachHang = data.find(item => 
            item.Email.toLowerCase() === email.toLowerCase()
        );

        if (!khachHang) {
            alert('Email không tồn tại!');
            return;
        }

        // Kiểm tra mật khẩu bằng API verify
        const loginRes = await fetch(`${API}/khachhangs/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email: email, MatKhau: matKhau })
        });

        const loginJson = await loginRes.json();

        if (!loginRes.ok) {
            alert('Mật khẩu không đúng!');
            return;
        }

        // Lưu thông tin vào localStorage
        localStorage.setItem('khachHang', JSON.stringify(loginJson.data));

        // Phân quyền
        if (khachHang.LoaiTaiKhoan === 'Admin') {
            window.location.href = '/Admin/category.html';
        } else {
            window.location.href = '/Owner/index.html';
        }

    } catch (err) {
        alert('Lỗi kết nối server!');
        console.error(err);
    }
});

const Password = document.getElementById("password");

const eye = document.getElementById("eye");

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