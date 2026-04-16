# G5 LAPTOP - Website bán laptop (Frontend + Backend)

Repo này gồm:
- **Frontend tĩnh**: HTML/CSS/JS ở root (`index.html`, `Owner/`, `Admin/`, `Asset/`, ...).
- **Backend API**: Node.js/Express ở `backend/`.

Từ bản cập nhật mới, backend đã serve luôn frontend nên bạn có thể mở toàn bộ web tại **http://localhost:5000**.

---

## 1) Yêu cầu môi trường
- Node.js >= 18
- MySQL >= 8.0

---

## 2) Cài đặt nhanh

```bash
# tại thư mục repo
cd backend
npm install
```

Tạo file env:

```bash
cp .env.example .env
```

Chỉnh lại thông tin DB/JWT trong `backend/.env`.

---

## 3) Tạo database schema

Schema đầy đủ nằm tại `backend/database/schema.sql`.

Cách import:

```bash
mysql -u root -p < backend/database/schema.sql
```

> Nếu MySQL không ở mặc định, thêm `-h` và `-P` tương ứng.

---

## 4) Chạy backend + frontend cùng lúc

```bash
cd backend
npm start
```

Mở trình duyệt:
- Home: `http://localhost:5000/`
- Login owner: `http://localhost:5000/Owner/login.html`
- Admin products: `http://localhost:5000/Admin/product_management.html`

API vẫn ở namespace `/api/*`, ví dụ:
- `POST /api/auth/login`
- `GET /api/san-pham`

---

## 5) Scripts

Trong `backend/package.json`:
- `npm start`: chạy production mode (`node server.js`)
- `npm run dev`: chạy với nodemon

---

## 6) Ghi chú
- File `.env` và `node_modules` đã được ignore bằng `.gitignore`.
- Upload ảnh sản phẩm sẽ nằm trong thư mục `uploads/`.
