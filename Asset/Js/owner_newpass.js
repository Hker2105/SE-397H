const API = 'http://127.0.0.1:3000/api';

const resetKhachHang = JSON.parse(localStorage.getItem('resetKhachHang'));

document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    if (window.location.pathname.includes('quenmatkhau.html')) {
        const contact = document.getElementById('contact').value.trim();

        if (!contact) {
            alert('Vui lòng nhập email hoặc số điện thoại!');
            return;
        }

        try {
            const res = await fetch(`${API}/khachhangs?limit=100`);
            const json = await res.json();
            const data = json.data || [];

            const khachHang = data.find(item =>
                item.Email.toLowerCase() === contact.toLowerCase() ||
                item.SoDienThoai === contact
            );

            if (!khachHang) {
                const input = document.getElementById('contact');
                input.style.border = '2px solid red';

                let errorMsg = document.getElementById('error-msg');
                if (!errorMsg) {
                    errorMsg = document.createElement('p');
                    errorMsg.id = 'error-msg';
                    errorMsg.style.color = 'red';
                    errorMsg.style.fontSize = '13px';
                    errorMsg.style.marginTop = '5px';
                    input.parentNode.appendChild(errorMsg);
                }

                errorMsg.textContent = 'Email hoặc số điện thoại không tồn tại!';
                return;
            }

            localStorage.setItem('resetKhachHang', JSON.stringify({
                MaKhachHang: khachHang.MaKhachHang,
                Email: khachHang.Email
            }));

            window.location.href = '/Owner/taomatkhaumoi.html';

        } catch (err) {
            alert('Lỗi kết nối server!');
            console.error(err);
        }
    }

    if (window.location.pathname.includes('taomatkhaumoi.html')) {

        if (!resetKhachHang) {
            alert('Phiên làm việc hết hạn! Vui lòng thử lại.');
            window.location.href = '/Owner/quenmatkhau.html';
            return;
        }

        const newPassword = document.getElementById('new-password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();

        if (!newPassword || !confirmPassword) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('Mật khẩu nhập lại không khớp!');
            return;
        }

        if (newPassword.length < 6) {
            alert('Mật khẩu phải có ít nhất 6 ký tự!');
            return;
        }

        try {
            const res = await fetch(`${API}/khachhangs/${resetKhachHang.MaKhachHang}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    MatKhau: newPassword
                })
            });

            const json = await res.json();

            if (res.ok) {
                alert('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
                localStorage.removeItem('resetKhachHang');
                window.location.href = '/Owner/login.html';
            } else {
                alert('Lỗi: ' + json.message);
            }

        } catch (err) {
            alert('Lỗi kết nối server!');
            console.error(err);
        }
    }
});
const newPassword = document.getElementById("new-password");
const confirmPassword = document.getElementById("confirm-password");

const eyeNew = document.getElementById("eye-new");
const eyeConfirm = document.getElementById("eye-confirm");

function togglePassword(input, icon) {
    if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

eyeNew.onclick = () => togglePassword(newPassword, eyeNew);
eyeConfirm.onclick = () => togglePassword(confirmPassword, eyeConfirm);