const API = 'http://127.0.0.1:3000/api';
let allMessages = [];
let khachHangMap = {};
let sanPhamMap = {};
let currentKH = null;

async function loadData() {
    const [khRes, spRes, lhRes] = await Promise.all([
        fetch(`${API}/khachhangs?limit=100`),
        fetch(`${API}/sanphams?limit=100`),
        fetch(`${API}/lienhehotros?limit=100`)
    ]);

    const khJson = await khRes.json();
    const spJson = await spRes.json();
    const lhJson = await lhRes.json();

    (khJson.data || []).forEach(item => khachHangMap[item.MaKhachHang] = item);
    (spJson.data || []).forEach(item => sanPhamMap[item.MaSP] = item);
    allMessages = lhJson.data || [];

    renderList(allMessages);
}

function getInitials(name) {
    return (name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function renderList(data) {
    const container = document.getElementById('inbox-list-items');
    if (!data.length) {
        container.innerHTML = '<p style="padding:15px; color:#aaa; font-size:14px;">Không có tin nhắn</p>';
        return;
    }

    const grouped = {};
    data.forEach(item => {
        if (!grouped[item.MaKhachHang]) grouped[item.MaKhachHang] = [];
        grouped[item.MaKhachHang].push(item);
    });

    container.innerHTML = Object.entries(grouped).map(([maKH, msgs]) => {
        const kh = khachHangMap[maKH] || {};
        const last = msgs[msgs.length - 1];
        const unread = msgs.filter(m => m.TrangThai === 'Chưa trả lời').length;
        const initials = getInitials(kh.HoTen);
        const time = last.NgayGui ? last.NgayGui.split('T')[0] : '';

        return `
        <div class="inbox-item ${currentKH === maKH ? 'active' : ''}" onclick="openChat('${maKH}')">
            <div class="inbox-avatar">${initials}</div>
            <div class="inbox-item-info">
                <div class="inbox-item-name">${kh.HoTen || maKH}</div>
                <div class="inbox-item-preview">${last.NoiDung || last.TieuDe || ''}</div>
            </div>
            <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px;">
                <span class="inbox-item-time">${time}</span>
                ${unread > 0 ? `<span class="inbox-badge">${unread}</span>` : ''}
            </div>
        </div>`;
    }).join('');
}

function openChat(maKH) {
    currentKH = maKH;
    const kh = khachHangMap[maKH] || {};
    const msgs = allMessages.filter(m => m.MaKhachHang === maKH);
    const lastMsg = msgs[msgs.length - 1];
    const initials = getInitials(kh.HoTen);

    document.getElementById('inbox-chat').innerHTML = `
        <div class="chat-header">
            <div class="chat-header-name">${kh.HoTen || maKH}</div>
            <div class="chat-header-product">${lastMsg?.TieuDe || ''}</div>
            <div class="chat-header-seen">Last seen: just now</div>
        </div>

        <div class="chat-messages" id="chat-messages">
            ${msgs.map(msg => `
                <div class="chat-msg customer">
                    <div class="chat-msg-avatar">${initials}</div>
                    <div>
                        <strong style="font-size:13px;">${kh.HoTen || maKH}</strong>
                        <div>${msg.NoiDung || ''}</div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="chat-quick-replies">
            <button class="quick-btn" onclick="quickReply('Cảm ơn review!')">Cảm ơn review!</button>
            <button class="quick-btn" onclick="quickReply('Sẽ kiểm tra')">Sẽ kiểm tra</button>
            <button class="quick-btn" onclick="quickReply('Đã sửa lỗi')">Đã sửa lỗi</button>
            <button class="quick-btn" onclick="quickReply('Sản phẩm khác?')">Sản phẩm khác?</button>
            <button class="quick-btn" onclick="quickReply('Xem đánh giá gốc')">Xem đánh giá gốc</button>
        </div>

        <div class="chat-input-area">
            <input type="text" id="chat-input" placeholder="Nhập tin nhắn phản hồi...">
            <button class="btn-send" onclick="sendReply()">Gửi</button>
            <button class="btn-suggest">Chọn sản phẩm gợi ý</button>
        </div>
    `;

    const chatMessages = document.getElementById('chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;

    document.querySelectorAll('.inbox-item').forEach(el => el.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

function quickReply(text) {
    document.getElementById('chat-input').value = text;
}

function sendReply() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML += `
        <div class="chat-msg admin">
            <strong style="display:block; font-size:12px; margin-bottom:4px;">Admin:</strong>
            ${text}
        </div>
    `;
    chatMessages.scrollTop = chatMessages.scrollHeight;
    input.value = '';
}

function filterInbox(type, el) {
    document.querySelectorAll('.inbox-filter a').forEach(a => a.classList.remove('active'));
    el.classList.add('active');

    if (type === 'all') {
        renderList(allMessages);
    } else if (type === 'chua') {
        renderList(allMessages.filter(m => m.TrangThai === 'Chưa trả lời'));
    } else {
        renderList(allMessages.filter(m => m.TrangThai === 'Đã trả lời'));
    }
}

document.getElementById('inboxSearch').addEventListener('input', function() {
    const keyword = this.value.toLowerCase();
    const filtered = allMessages.filter(item => {
        const kh = khachHangMap[item.MaKhachHang] || {};
        return (kh.HoTen && kh.HoTen.toLowerCase().includes(keyword)) ||
               (item.NoiDung && item.NoiDung.toLowerCase().includes(keyword)) ||
               (item.TieuDe && item.TieuDe.toLowerCase().includes(keyword));
    });
    renderList(filtered);
});

loadData();