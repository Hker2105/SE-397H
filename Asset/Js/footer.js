document.addEventListener('DOMContentLoaded', async () => {
  const footerHost = document.getElementById('footer');
  if (!footerHost) return;

  try {
    const res = await fetch('/Frontend/footer.html');
    const html = await res.text();
    footerHost.innerHTML = html;
  } catch (error) {
    console.error('Không thể tải footer:', error);
  }
});
