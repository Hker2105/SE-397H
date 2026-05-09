const SUPPORT_API = 'http://127.0.0.1:3000/api';

document.addEventListener('DOMContentLoaded', async () => {
  const footerHost = document.getElementById('footer');
  if (!footerHost) return;

  try {
    const res = await fetch('/Frontend/footer.html');
    const html = await res.text();
    footerHost.innerHTML = html;
    initSupportChatBubble();
  } catch (error) {
    console.error('Không thể tải footer:', error);
  }
});

function readSupportUser() {
  try {
    return JSON.parse(localStorage.getItem('khachHang') || 'null');
  } catch {
    return null;
  }
}

function buildSupportMessageId() {
  return `LH${Date.now()}`;
}

function savePendingSupportMessage(payload) {
  try {
    const pending = JSON.parse(localStorage.getItem('pendingSupportMessages') || '[]');
    pending.unshift(payload);
    localStorage.setItem('pendingSupportMessages', JSON.stringify(pending.slice(0, 20)));
  } catch (_) {}
}

function escapeSupportHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function initSupportChatBubble() {
  if (document.querySelector('.support-chat')) return;

  const currentUser = readSupportUser();
  const customerName = currentUser?.HoTen || currentUser?.TenKhachHang || 'Quý khách';
  const customerEmail = currentUser?.Email || '';
  const safeCustomerName = escapeSupportHtml(customerName);
  const safeCustomerEmail = escapeSupportHtml(customerEmail);

  const wrapper = document.createElement('div');
  wrapper.className = 'support-chat';
  wrapper.innerHTML = `
    <button type="button" class="support-chat-toggle" aria-label="Mở hộp chat hỗ trợ">
      <i class="fa-solid fa-comments"></i>
      <span class="support-chat-pulse"></span>
    </button>

    <section class="support-chat-panel" aria-live="polite">
      <div class="support-chat-header">
        <div class="support-chat-avatar"><i class="fa-solid fa-headset"></i></div>
        <div>
          <h3>G5 hỗ trợ khách hàng</h3>
          <p>Thường phản hồi trong vài phút</p>
        </div>
        <button type="button" class="support-chat-close" aria-label="Đóng hộp chat">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="support-chat-body">
        <div class="support-message support-message-admin">
          Xin chào ${safeCustomerName}! G5 LAPTOP có thể hỗ trợ gì cho bạn hôm nay?
        </div>
        <div class="support-chat-quick">
          <button type="button" data-topic="Tư vấn sản phẩm">Tư vấn sản phẩm</button>
          <button type="button" data-topic="Theo dõi đơn hàng">Theo dõi đơn hàng</button>
          <button type="button" data-topic="Đổi trả / bảo hành">Đổi trả / bảo hành</button>
        </div>
      </div>

      <form class="support-chat-form">
        <input type="text" name="subject" placeholder="Tiêu đề cần hỗ trợ" maxlength="120" required>
        <textarea name="message" rows="3" placeholder="Nhập nội dung tin nhắn..." maxlength="1000" required></textarea>
        <div class="support-chat-actions">
          <span class="support-chat-note">${safeCustomerEmail || 'Đăng nhập để shop nhận diện tài khoản nhanh hơn'}</span>
          <button type="submit">Gửi <i class="fa-solid fa-paper-plane"></i></button>
        </div>
      </form>
    </section>
  `;

  document.body.appendChild(wrapper);

  const toggle = wrapper.querySelector('.support-chat-toggle');
  const close = wrapper.querySelector('.support-chat-close');
  const panel = wrapper.querySelector('.support-chat-panel');
  const form = wrapper.querySelector('.support-chat-form');
  const subjectInput = form.querySelector('input[name="subject"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  const body = wrapper.querySelector('.support-chat-body');

  const openChat = () => {
    wrapper.classList.add('open');
    toggle.setAttribute('aria-label', 'Đóng hộp chat hỗ trợ');
    setTimeout(() => messageInput.focus(), 100);
  };

  const closeChat = () => {
    wrapper.classList.remove('open');
    toggle.setAttribute('aria-label', 'Mở hộp chat hỗ trợ');
  };

  toggle.addEventListener('click', () => {
    if (wrapper.classList.contains('open')) closeChat();
    else openChat();
  });

  close.addEventListener('click', closeChat);

  wrapper.querySelectorAll('[data-topic]').forEach((button) => {
    button.addEventListener('click', () => {
      subjectInput.value = button.dataset.topic;
      openChat();
      messageInput.focus();
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();
    if (!subject || !message) return;

    const payload = {
      MaLH: buildSupportMessageId(),
      MaKhachHang: currentUser?.MaKhachHang || null,
      TieuDe: subject,
      NoiDung: `${message}${customerEmail ? `\n\nEmail khách hàng: ${customerEmail}` : ''}`,
      NgayGui: new Date().toISOString(),
      TrangThai: 'Chưa trả lời',
    };

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = 'Đang gửi...';

    try {
      const res = await fetch(`${SUPPORT_API}/lienhehotros`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      body.insertAdjacentHTML('beforeend', `
        <div class="support-message support-message-user">${escapeSupportHtml(message)}</div>
        <div class="support-message support-message-admin">Cảm ơn bạn! Shop đã nhận tin nhắn và sẽ phản hồi sớm nhất.</div>
      `);
      form.reset();
    } catch (error) {
      savePendingSupportMessage(payload);
      body.insertAdjacentHTML('beforeend', `
        <div class="support-message support-message-user">${escapeSupportHtml(message)}</div>
        <div class="support-message support-message-admin warning">Chưa kết nối được máy chủ. Tin nhắn đã được lưu tạm trên trình duyệt.</div>
      `);
      form.reset();
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Gửi <i class="fa-solid fa-paper-plane"></i>';
      body.scrollTop = body.scrollHeight;
    }
  });
}
