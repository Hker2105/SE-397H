(function () {
  const FOOTER_SELECTOR = '#footer';
  const FOOTER_TEMPLATE = '/Frontend/footer.html';

  function normalizeFooterLinks(root) {
    const nav = root.querySelector('.footer-nav');
    if (!nav) return;

    const links = nav.querySelectorAll('a');
    const mapping = [
      { href: '/index.html', text: 'Trang chủ' },
      { href: '/index.html#products', text: 'Sản phẩm' },
      { href: '/Owner/cart.html', text: 'Giỏ hàng' },
      { href: 'https://facebook.com', text: 'Liên hệ facebook', target: '_blank' },
    ];

    links.forEach((link, idx) => {
      const item = mapping[idx];
      if (!item) return;
      link.setAttribute('href', item.href);
      if (item.target) link.setAttribute('target', item.target);
      link.innerHTML = `<i class="fa fa-angle-right"></i> ${item.text}`;
    });
  }

  function wireFeedbackForm(root) {
    const form = root.querySelector('.footer-feedback form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = form.querySelectorAll('input');
      const name = inputs[0]?.value?.trim();
      const feedback = inputs[1]?.value?.trim();

      if (!name || !feedback) {
        alert('Vui lòng nhập đầy đủ thông tin góp ý.');
        return;
      }

      const list = JSON.parse(localStorage.getItem('feedbackList') || '[]');
      list.push({ name, feedback, createdAt: new Date().toISOString() });
      localStorage.setItem('feedbackList', JSON.stringify(list));

      alert('Cảm ơn bạn đã góp ý cho G5 Laptop ❤️');
      form.reset();
    });
  }

  function fixPaymentsImage(root) {
    const paymentsImg = root.querySelector('.footer-bottom img');
    if (!paymentsImg) return;

    if ((paymentsImg.getAttribute('src') || '').includes('img/payments.png')) {
      paymentsImg.setAttribute('src', '/Asset/img/QRbank.jpg');
      paymentsImg.setAttribute('alt', 'Phương thức thanh toán');
    }
  }

  async function loadFooter() {
    const host = document.querySelector(FOOTER_SELECTOR);
    if (!host) return;

    try {
      const res = await fetch(FOOTER_TEMPLATE);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      host.innerHTML = await res.text();

      normalizeFooterLinks(host);
      wireFeedbackForm(host);
      fixPaymentsImage(host);
    } catch (error) {
      console.error('Không thể tải footer:', error);
    }
  }

  document.addEventListener('DOMContentLoaded', loadFooter);
})();
