function getAdminCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('khachHang') || 'null');
    } catch {
        return null;
    }
}

function isAdminAccount(user) {
    return String(user?.LoaiTaiKhoan || '').toLowerCase() === 'admin';
}

function protectAdminPage() {
    if (!isAdminAccount(getAdminCurrentUser())) {
        alert('Chỉ tài khoản admin mới được truy cập trang quản trị.');
        window.location.href = '/Owner/login.html';
    }
}

function toggleMenu(e, element){
    e.preventDefault();

    const parent = element.parentElement;

    document.querySelectorAll(".has-sub").forEach(item => {
        if(item !== parent){
            item.classList.remove("active");
        }
    });

    parent.classList.toggle("active");
}

async function loadUnreadBadge() {
    try {
        const res = await fetch('http://127.0.0.1:3000/api/lienhehotros?limit=200&page=1');
        if (!res.ok) return;
        const json = await res.json();

        const unreadCount = (json.data || []).filter(
            item => item.TrangThai === 'Chưa trả lời'
        ).length;

        const badge = document.getElementById('inbox-unread-badge');
        if (!badge) return;

        if (unreadCount > 0) {
            badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    } catch (_) {}
}

document.addEventListener('DOMContentLoaded', () => {
    protectAdminPage();
    loadUnreadBadge();
});
