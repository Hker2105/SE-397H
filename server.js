const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs/promises');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const CUSTOMERS_FILE = path.join(DATA_DIR, 'khachhangs.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(CUSTOMERS_FILE);
  } catch {
    await fs.writeFile(CUSTOMERS_FILE, '[]', 'utf8');
  }
}

async function readCustomers() {
  await ensureDataFile();
  const raw = await fs.readFile(CUSTOMERS_FILE, 'utf8');
  return JSON.parse(raw);
}

async function writeCustomers(customers) {
  await fs.writeFile(CUSTOMERS_FILE, JSON.stringify(customers, null, 2), 'utf8');
}

app.get('/api/khachhangs', async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 50;
    const customers = await readCustomers();
    return res.json({ data: customers.slice(0, limit) });
  } catch (error) {
    return res.status(500).json({ message: 'Không thể lấy danh sách khách hàng.' });
  }
});

app.post('/api/khachhangs', async (req, res) => {
  try {
    const body = req.body || {};
    if (!body.MaKhachHang || !body.Email || !body.MatKhau || !body.HoTen) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc.' });
    }

    const customers = await readCustomers();
    const duplicate = customers.find(
      (item) => item.Email.toLowerCase() === String(body.Email).toLowerCase(),
    );

    if (duplicate) {
      return res.status(409).json({ message: 'Email đã tồn tại.' });
    }

    const newCustomer = {
      MaKhachHang: body.MaKhachHang,
      HoTen: body.HoTen,
      Email: body.Email,
      MatKhau: body.MatKhau,
      SoDienThoai: body.SoDienThoai || '',
      DiaChi: body.DiaChi || '',
      GioiTinh: body.GioiTinh || '',
      LoaiTaiKhoan: body.LoaiTaiKhoan || 'KhachHang',
      NgayTao: body.NgayTao || new Date().toISOString().slice(0, 10),
    };

    customers.push(newCustomer);
    await writeCustomers(customers);
    return res.status(201).json({ message: 'Tạo tài khoản thành công.', data: newCustomer });
  } catch (error) {
    return res.status(500).json({ message: 'Không thể tạo khách hàng.' });
  }
});

app.post('/api/khachhangs/login', async (req, res) => {
  try {
    const { Email, MatKhau } = req.body || {};
    if (!Email || !MatKhau) {
      return res.status(400).json({ message: 'Thiếu email hoặc mật khẩu.' });
    }

    const customers = await readCustomers();
    const customer = customers.find(
      (item) => item.Email.toLowerCase() === String(Email).toLowerCase(),
    );

    if (!customer || customer.MatKhau !== MatKhau) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
    }

    return res.json({ message: 'Đăng nhập thành công.', data: customer });
  } catch (error) {
    return res.status(500).json({ message: 'Không thể đăng nhập.' });
  }
});

app.put('/api/khachhangs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body || {};
    const customers = await readCustomers();
    const idx = customers.findIndex((item) => item.MaKhachHang === id);

    if (idx < 0) {
      return res.status(404).json({ message: 'Không tìm thấy khách hàng.' });
    }

    customers[idx] = { ...customers[idx], ...payload, MaKhachHang: customers[idx].MaKhachHang };
    await writeCustomers(customers);
    return res.json({ message: 'Cập nhật thành công.', data: customers[idx] });
  } catch (error) {
    return res.status(500).json({ message: 'Không thể cập nhật khách hàng.' });
  }
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
