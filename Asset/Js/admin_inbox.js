const API = 'http://127.0.0.1:3000/api';

let allMessages = [];
let currentFilter = 'all';
let selectedId = null;
let searchTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
    loadInbox();
    bindSearch();
});

async function loadInbox() {
    showListLoading();
    try {
        const res = await fetch(`${API}/lienhehotros?limit=200&page=1`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        const messages = await enrichWithKhachHang(json.data || []);
        allMessages = messages;
        renderList(filtered(allMessages));
    } catch (err) {
        showListError(err.message);
    }
}

async function enrichWithKhachHang(lienHes) {
    const uniqueIds = [...new Set(lienHes.map(lh => lh.MaKhachHang).filter(Boolean))];

    const khachHangMap = {};
    await Promise.all(uniqueIds.map(async (id) => {
        try {
            const res = await fetch(`${API}/khachhangs/${id}`);
            if (res.ok) {
                const json = await res.json();
                khachHangMap[id] = json.data;
            }
        } catch (_) {}
    }));

    return lienHes.map(lh => ({
        ...lh,
        _khachHang: khachHangMap[lh.MaKhachHang] || null
    }));
}

function filtered(list) {
    const keyword = (document.getElementById('inboxSearch')?.value || '').toLowerCase().trim();

    return list.filter(item => {
        if (currentFilter === 'chua' && item.TrangThai !== 'Chưa trả lời') return false;
        if (currentFilter === 'da'   && item.TrangThai !== 'Đã trả lời')   return false;

        if (keyword) {
            const ten    = (item._khachHang?.HoTen || '').toLowerCase();
            const email  = (item._khachHang?.Email || '').toLowerCase();
            const tieuDe = (item.TieuDe || '').toLowerCase();
            if (!ten.includes(keyword) && !email.includes(keyword) && !tieuDe.includes(keyword)) return false;
        }

        return true;
    });
}

function bindSearch() {
    const input = document.getElementById('inboxSearch');
    if (!input) return;
    input.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => renderList(filtered(allMessages)), 250);
    });
}

function renderList(list) {
    const container = document.getElementById('inbox-list-items');
    if (!container) return;

    if (list.length === 0) {
        container.innerHTML = `
            <div style="padding:20px;text-align:center;color:#888;font-size:14px;">
                Không có tin nhắn nào
            </div>`;
        return;
    }

    const sorted = [...list].sort((a, b) => new Date(b.NgayGui) - new Date(a.NgayGui));

    container.innerHTML = sorted.map(item => {
        const kh       = item._khachHang;
        const name     = kh?.HoTen || item.MaKhachHang || 'Khách vãng lai';
        const preview  = truncate(item.TieuDe || '(Không có tiêu đề)', 40);
        const time     = formatDate(item.NgayGui);
        const isActive = item.MaLH === selectedId;
        const isUnread = item.TrangThai === 'Chưa trả lời';

        return `
        <div class="inbox-item ${isActive ? 'active' : ''}"
             onclick="selectMessage('${escAttr(item.MaLH)}')">
            <div class="inbox-avatar">${avatarInitials(name)}</div>
            <div class="inbox-item-info">
                <div class="inbox-item-name">${escHtml(name)}</div>
                <div class="inbox-item-preview">${escHtml(preview)}</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0;">
                <span class="inbox-item-time">${time}</span>
                ${isUnread ? `<span class="inbox-badge">!</span>` : ''}
            </div>
        </div>`;
    }).join('');
}

function selectMessage(maLH) {
    selectedId = maLH;

    document.querySelectorAll('.inbox-item').forEach(el => {
        const onclick = el.getAttribute('onclick') || '';
        el.classList.toggle('active', onclick.includes(`'${maLH}'`));
    });

    const item = allMessages.find(m => m.MaLH === maLH);
    if (item) renderChat(item);
}

function renderChat(item) {
    const chatEl = document.getElementById('inbox-chat');
    if (!chatEl) return;

    const kh      = item._khachHang;
    const name    = kh?.HoTen        || item.MaKhachHang || 'Khách vãng lai';
    const email   = kh?.Email        || '';
    const phone   = kh?.SoDienThoai  || '';
    const noiDung = item.NoiDung     || item.Noidung || '(Không có nội dung)';
    const isDone  = item.TrangThai   === 'Đã trả lời';

    chatEl.innerHTML = `
        <!-- Header -->
        <div class="chat-header">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                <div>
                    <div class="chat-header-name">${escHtml(name)}</div>
                    <div class="chat-header-product">
                        ${email ? `<i class="fa-solid fa-envelope"></i> ${escHtml(email)}` : ''}
                        ${phone ? `&nbsp;&nbsp;<i class="fa-solid fa-phone"></i> ${escHtml(phone)}` : ''}
                    </div>
                    <div class="chat-header-seen">
                        Ngày gửi: ${formatDateFull(item.NgayGui)}
                        &nbsp;|&nbsp; Mã: ${escHtml(item.MaLH)}
                        &nbsp;|&nbsp;
                        <span style="
                            display:inline-block;padding:1px 8px;border-radius:10px;font-size:12px;
                            background:${isDone ? '#d1e7dd' : '#fff3cd'};
                            color:${isDone ? '#0a5c36' : '#856404'};
                            font-weight:600;">
                            ${escHtml(item.TrangThai || 'Chưa trả lời')}
                        </span>
                    </div>
                </div>
                <button onclick="deleteMessage('${escAttr(item.MaLH)}')" style="
                    padding:6px 14px;border:1px solid #e74c3c;border-radius:4px;
                    background:transparent;color:#e74c3c;font-size:13px;cursor:pointer;">
                    <i class="fa-solid fa-trash"></i> Xoá
                </button>
            </div>
        </div>

        <!-- Nội dung -->
        <div class="chat-messages">
            <div class="chat-msg customer">
                <div class="chat-msg-avatar">${avatarInitials(name)}</div>
                <div>
                    <div style="font-weight:bold;font-size:13px;margin-bottom:6px;color:#2b4f6b;">
                        ${escHtml(item.TieuDe || '(Không có tiêu đề)')}
                    </div>
                    <div style="white-space:pre-wrap;word-break:break-word;line-height:1.6;">
                        ${escHtml(noiDung)}
                    </div>
                </div>
            </div>
        </div>

        <!-- Nút nhanh -->
        <div class="chat-quick-replies">
            ${!isDone ? `
            <button class="quick-btn" onclick="markDone('${escAttr(item.MaLH)}')">
                <i class="fa-solid fa-circle-check"></i> Đánh dấu đã trả lời
            </button>` : ''}
            ${email ? `
            <button class="quick-btn" onclick="copyEmail('${escAttr(email)}')">
                <i class="fa-solid fa-copy"></i> Copy email
            </button>` : ''}
        </div>

        <!-- Ô nhập ghi chú nội bộ -->
        <div class="chat-input-area">
            <input type="text" id="chat-reply-input"
                placeholder="Ghi chú nội bộ..."
                onkeydown="if(event.key==='Enter') handleSendNote('${escAttr(item.MaLH)}')">
            <button class="btn-suggest" onclick="markDone('${escAttr(item.MaLH)}')">
                <i class="fa-solid fa-check"></i> Đã xử lý
            </button>
            <button class="btn-send" onclick="handleSendNote('${escAttr(item.MaLH)}')">
                <i class="fa-solid fa-paper-plane"></i> Ghi
            </button>
        </div>
    `;
}

function markDone(maLH) {

    const item = allMessages.find(m => m.MaLH === maLH);
    if (item) {
        item.TrangThai = 'Đã trả lời';
        renderList(filtered(allMessages));
        renderChat(item);
        loadUnreadBadge();
    }
}

async function deleteMessage(maLH) {
    if (!confirm('Bạn có chắc muốn xoá liên hệ này không?')) return;
    try {
        const res = await fetch(`${API}/lienhehotros/${maLH}`, { method: 'DELETE' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        allMessages = allMessages.filter(m => m.MaLH !== maLH);
        selectedId = null;

        document.getElementById('inbox-chat').innerHTML = `
            <div style="display:flex;align-items:center;justify-content:center;
                        height:100%;color:#aaa;font-size:16px;">
                Chọn một cuộc trò chuyện để bắt đầu
            </div>`;

        renderList(filtered(allMessages));
    } catch (err) {
        alert('Xoá thất bại: ' + err.message);
    }
}

function handleSendNote(maLH) {
    const input = document.getElementById('chat-reply-input');
    if (!input || !input.value.trim()) return;

    const note = input.value.trim();
    input.value = '';

    const msgArea = document.querySelector('.chat-messages');
    if (msgArea) {
        const div = document.createElement('div');
        div.className = 'chat-msg admin';
        div.textContent = note;
        msgArea.appendChild(div);
        msgArea.scrollTop = msgArea.scrollHeight;
    }
}

function copyEmail(email) {
    if (!email) return;
    navigator.clipboard.writeText(email).then(() => {
        alert('Đã copy: ' + email);
    });
}

function filterInbox(type, el) {
    currentFilter = type;
    document.querySelectorAll('.inbox-filter a').forEach(a => a.classList.remove('active'));
    el?.classList.add('active');
    renderList(filtered(allMessages));
}

function showListLoading() {
    const container = document.getElementById('inbox-list-items');
    if (container) container.innerHTML = `
        <div style="padding:20px;text-align:center;color:#888;font-size:14px;">
            <i class="fa-solid fa-spinner fa-spin"></i> Đang tải...
        </div>`;
}

function showListError(msg) {
    const container = document.getElementById('inbox-list-items');
    if (container) container.innerHTML = `
        <div style="padding:20px;text-align:center;color:#e74c3c;font-size:14px;">
            <i class="fa-solid fa-circle-exclamation"></i> Lỗi: ${escHtml(msg)}<br>
            <button onclick="loadInbox()"
                style="margin-top:8px;cursor:pointer;padding:4px 12px;">
                Thử lại
            </button>
        </div>`;
}

function avatarInitials(name = '') {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return (name[0] || '?').toUpperCase();
}

function truncate(str, max) {
    return str.length > max ? str.slice(0, max) + '…' : str;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (d.toDateString() === new Date().toDateString()) {
        return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    }
    return d.toLocaleDateString('vi-VN');
}

function formatDateFull(dateStr) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString('vi-VN');
}

function escHtml(str = '') {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function escAttr(str = '') {
    return String(str).replace(/'/g, "\\'");
}