const PRODUCTS = [
  {
    id: 1,
    name: 'ASUS TUF Gaming A15 R7-7735HS / RTX 4050',
    price: 25990000,
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=900',
  },
  {
    id: 2,
    name: 'MacBook Air M3 13 inch 16GB / 512GB',
    price: 34990000,
    category: 'Macbook',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=900',
  },
  {
    id: 3,
    name: 'Lenovo IdeaPad Slim 5 i5-13420H / 16GB',
    price: 17990000,
    category: 'Văn phòng',
    image: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=900',
  },
  {
    id: 4,
    name: 'MSI Creator M16 i7-13700H / RTX 4060',
    price: 32990000,
    category: 'Đồ họa',
    image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=900',
  },
  {
    id: 5,
    name: 'Acer Aspire 7 i5-12450H / RTX 3050',
    price: 18990000,
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=900',
  },
  {
    id: 6,
    name: 'Dell XPS 13 Plus i7 / 16GB / 1TB',
    price: 38990000,
    category: 'Cao cấp',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900',
  },
];

let selectedCategory = 'Tất cả';

function formatVnd(value) {
  return `${Number(value).toLocaleString('vi-VN')} VNĐ`;
}

function getCartItems() {
  return JSON.parse(localStorage.getItem('cartItems') || '[]');
}

function saveCartItems(items) {
  localStorage.setItem('cartItems', JSON.stringify(items));
}

function addToCart(product) {
  const items = getCartItems();
  const existing = items.find((item) => item.id === product.id);

  if (existing) existing.quantity += 1;
  else items.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });

  saveCartItems(items);
  if (typeof window.updateCartBadge === 'function') window.updateCartBadge();
  alert(`Đã thêm "${product.name}" vào giỏ hàng`);
}

function renderCategories() {
  const categories = ['Tất cả', ...new Set(PRODUCTS.map((p) => p.category))];
  const host = document.getElementById('categoryFilters');

  host.innerHTML = categories
    .map(
      (cat) =>
        `<button class="chip ${cat === selectedCategory ? 'active' : ''}" data-cat="${cat}">${cat}</button>`,
    )
    .join('');

  host.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      selectedCategory = chip.dataset.cat;
      renderCategories();
      renderProducts();
    });
  });
}

function renderProducts() {
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
  const grid = document.getElementById('productGrid');

  const filtered = PRODUCTS.filter((product) => {
    const matchCategory = selectedCategory === 'Tất cả' || product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchTerm);
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<p class="empty-state">Không có sản phẩm phù hợp.</p>';
    return;
  }

  grid.innerHTML = filtered
    .map(
      (product) => `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${formatVnd(product.price)}</p>
        <div class="product-actions">
          <button class="action-btn details" data-detail="${product.id}">Chi tiết</button>
          <button class="action-btn cart" data-cart="${product.id}">Thêm giỏ</button>
        </div>
      </article>
    `,
    )
    .join('');

  grid.querySelectorAll('[data-cart]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const product = PRODUCTS.find((p) => p.id === Number(btn.dataset.cart));
      if (product) addToCart(product);
    });
  });

  grid.querySelectorAll('[data-detail]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const product = PRODUCTS.find((p) => p.id === Number(btn.dataset.detail));
      if (!product) return;
      alert(`${product.name}\nDanh mục: ${product.category}\nGiá: ${formatVnd(product.price)}`);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', renderProducts);

  renderCategories();
  renderProducts();
});
