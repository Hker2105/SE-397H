const API = 'http://localhost:3000/api';

const khachHang = JSON.parse(localStorage.getItem('khachHang'));

if (!khachHang) {
    alert('Vui lòng đăng nhập trước!');
    window.location.href = '/Owner/login.html';
}

document.querySelector('form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const oldPassword = document.getElementById('old-password').value.trim();
    const newPassword = document.getElementById('new-password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    document.getElementById('old-password').style.border = '1px solid #dcdfe3';

    if (!oldPassword || !newPassword || !confirmPassword) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    if (newPassword !== confirmPassword) {
        alert('Mật khẩu mới nhập lại không khớp!');
        return;
    }

    if (newPassword.length < 6) {
        alert('Mật khẩu mới phải có ít nhất 6 ký tự!');
        return;
    }

    try {
        const verifyRes = await fetch(`${API}/khachhangs/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Email: khachHang.Email,
                MatKhau: oldPassword
            })
        });

        if (!verifyRes.ok) {
            const input = document.getElementById('old-password');
            input.style.border = '2px solid red';
            input.style.boxShadow = '0 0 6px rgba(255,0,0,0.4)';

            let errorMsg = document.getElementById('error-msg');
            if (!errorMsg) {
                errorMsg = document.createElement('p');
                errorMsg.id = 'error-msg';
                errorMsg.style.color = 'red';
                errorMsg.style.fontSize = '13px';
                errorMsg.style.marginTop = '5px';
                document.getElementById('old-password').parentNode.appendChild(errorMsg);
            }
            errorMsg.textContent = 'Mật khẩu cũ không đúng!';
            return;
        }

        const updateRes = await fetch(`${API}/khachhangs/${khachHang.MaKhachHang}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ MatKhau: newPassword })
        });

        const updateJson = await updateRes.json();

        if (updateRes.ok) {
            alert('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
            localStorage.removeItem('khachHang');
            window.location.href = '/Owner/login.html';
        } else {
            alert('Lỗi: ' + updateJson.message);
        }
    } catch (err) {
        alert('Lỗi kết nối server!');
        console.error(err);
    }
});

const oldPassword = document.getElementById("old-password");
const newPassword = document.getElementById("new-password");
const confirmPassword = document.getElementById("confirm-password");

const eyeOld = document.getElementById("eye-old");
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

eyeOld.onclick = () => togglePassword(oldPassword, eyeOld);
eyeNew.onclick = () => togglePassword(newPassword, eyeNew);
eyeConfirm.onclick = () => togglePassword(confirmPassword, eyeConfirm);