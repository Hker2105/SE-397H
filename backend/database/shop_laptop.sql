-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: mysql:3306
-- Thời gian đã tạo: Th4 23, 2026 lúc 05:26 AM
-- Phiên bản máy phục vụ: 9.6.0
-- Phiên bản PHP: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `shop_laptop`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danhgias`
--

CREATE TABLE `danhgias` (
  `MaDG` varchar(255) NOT NULL,
  `MaKhachHang` varchar(255) DEFAULT NULL,
  `MaSP` varchar(255) DEFAULT NULL,
  `NoiDung` text,
  `Diem` int DEFAULT NULL,
  `NgayDG` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danhmucs`
--

CREATE TABLE `danhmucs` (
  `MaDM` varchar(255) NOT NULL,
  `TenDanhMuc` varchar(255) DEFAULT NULL,
  `MoTa` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `danhmucs`
--

INSERT INTO `danhmucs` (`MaDM`, `TenDanhMuc`, `MoTa`, `createdAt`, `updatedAt`) VALUES
('DM0000001', 'Laptop Gaming', 'Các dòng laptop gaming hiệu năng cao', '2026-04-23 05:25:16', '2026-04-23 05:25:16'),
('DM0000002', 'Laptop Văn Phòng', 'Các dòng laptop văn phòng cao cấp', '2026-04-23 05:25:16', '2026-04-23 05:25:16'),
('DM0000003', 'Laptop Sinh Viên', 'Các dòng laptop phổ thông giá rẻ', '2026-04-23 05:25:16', '2026-04-23 05:25:16');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `donhangs`
--

CREATE TABLE `donhangs` (
  `MaDH` varchar(255) NOT NULL,
  `MaKhachHang` varchar(255) DEFAULT NULL,
  `MaVC` varchar(255) DEFAULT NULL,
  `SoLuong` int DEFAULT NULL,
  `DonGia` int DEFAULT NULL,
  `NgayDat` datetime DEFAULT NULL,
  `TongTien` int DEFAULT NULL,
  `TinhTrang` varchar(255) DEFAULT NULL,
  `GhiChu` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `giohangs`
--

CREATE TABLE `giohangs` (
  `MaGH` varchar(255) NOT NULL,
  `MaKhachHang` varchar(255) DEFAULT NULL,
  `MaSP` varchar(255) DEFAULT NULL,
  `NgayTao` datetime DEFAULT NULL,
  `SoLuong` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hangsanxuats`
--

CREATE TABLE `hangsanxuats` (
  `MaHang` varchar(255) NOT NULL,
  `TenHang` varchar(255) DEFAULT NULL,
  `MoTa` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khachhangs`
--

CREATE TABLE `khachhangs` (
  `MaKhachHang` varchar(255) NOT NULL,
  `HoTen` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `MatKhau` varchar(255) DEFAULT NULL,
  `SoDienThoai` varchar(255) DEFAULT NULL,
  `DiaChi` varchar(255) DEFAULT NULL,
  `LoaiTaiKhoan` varchar(255) DEFAULT NULL,
  `NgayTao` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lienhehotros`
--

CREATE TABLE `lienhehotros` (
  `MaLH` varchar(255) NOT NULL,
  `MaKhachHang` varchar(255) DEFAULT NULL,
  `TieuDe` varchar(255) DEFAULT NULL,
  `Noidung` text,
  `NgayGui` datetime DEFAULT NULL,
  `TrangThai` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhacungcaps`
--

CREATE TABLE `nhacungcaps` (
  `MaNCC` varchar(255) NOT NULL,
  `TenNCC` varchar(255) DEFAULT NULL,
  `SoDienThoai` varchar(255) DEFAULT NULL,
  `DiaChi` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanphams`
--

CREATE TABLE `sanphams` (
  `MaSP` varchar(255) NOT NULL,
  `TenSP` varchar(255) DEFAULT NULL,
  `MaDM` varchar(255) DEFAULT NULL,
  `MaHang` varchar(255) DEFAULT NULL,
  `MaNCC` varchar(255) DEFAULT NULL,
  `MoTa` text,
  `Gia` int DEFAULT NULL,
  `SoLuongTon` int DEFAULT NULL,
  `HinhAnh` text,
  `UuDaiSV` tinyint(1) DEFAULT NULL,
  `NgayThem` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20260418155747-create-khachhang.js'),
('20260418163150-create-danhmuc.js'),
('20260418164311-create-hangsanxuat.js'),
('20260419014129-create-nhacungcap.js'),
('20260419014522-create-voucher.js'),
('20260419020226-create-sanpham.js'),
('20260419032046-create-giohang.js'),
('20260419033618-create-donhang.js'),
('20260419075145-create-thanhtoan.js'),
('20260419075745-create-danhgia.js'),
('20260419080440-create-thucudoimoi.js'),
('20260419081418-create-lienhehotro.js'),
('20260419081939-create-thongke.js');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thanhtoans`
--

CREATE TABLE `thanhtoans` (
  `MaTT` varchar(255) NOT NULL,
  `MaDH` varchar(255) DEFAULT NULL,
  `HinhThuc` varchar(255) DEFAULT NULL,
  `NgayThanhToan` datetime DEFAULT NULL,
  `TrangThai` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thongkes`
--

CREATE TABLE `thongkes` (
  `MaTK` varchar(255) NOT NULL,
  `ThangNam` varchar(255) DEFAULT NULL,
  `MaSP` varchar(255) DEFAULT NULL,
  `TenSP` varchar(255) DEFAULT NULL,
  `SoLuongBan` int DEFAULT NULL,
  `GiaBan` int DEFAULT NULL,
  `TongTienSP` int DEFAULT NULL,
  `DoanhThuThang` int DEFAULT NULL,
  `ChiPhiThang` int DEFAULT NULL,
  `LoiNhuanThang` int DEFAULT NULL,
  `NgayThongKe` datetime DEFAULT NULL,
  `GhiChu` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thucudoimois`
--

CREATE TABLE `thucudoimois` (
  `MaThu` varchar(255) NOT NULL,
  `MaKhachHang` varchar(255) DEFAULT NULL,
  `TenSPCu` varchar(255) DEFAULT NULL,
  `MoTaTinhTrang` text,
  `GiaDinhGia` int DEFAULT NULL,
  `MaSP` varchar(255) DEFAULT NULL,
  `NgayGui` datetime DEFAULT NULL,
  `TrangThai` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vouchers`
--

CREATE TABLE `vouchers` (
  `MaVC` varchar(255) NOT NULL,
  `MaVoucher` varchar(255) DEFAULT NULL,
  `GiaTri` int DEFAULT NULL,
  `NgayBD` datetime DEFAULT NULL,
  `NgayKT` datetime DEFAULT NULL,
  `SoLuong` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `danhgias`
--
ALTER TABLE `danhgias`
  ADD PRIMARY KEY (`MaDG`),
  ADD KEY `MaKhachHang` (`MaKhachHang`),
  ADD KEY `MaSP` (`MaSP`);

--
-- Chỉ mục cho bảng `danhmucs`
--
ALTER TABLE `danhmucs`
  ADD PRIMARY KEY (`MaDM`),
  ADD UNIQUE KEY `TenDanhMuc` (`TenDanhMuc`);

--
-- Chỉ mục cho bảng `donhangs`
--
ALTER TABLE `donhangs`
  ADD PRIMARY KEY (`MaDH`),
  ADD KEY `MaKhachHang` (`MaKhachHang`),
  ADD KEY `MaVC` (`MaVC`);

--
-- Chỉ mục cho bảng `giohangs`
--
ALTER TABLE `giohangs`
  ADD PRIMARY KEY (`MaGH`),
  ADD KEY `MaKhachHang` (`MaKhachHang`),
  ADD KEY `MaSP` (`MaSP`);

--
-- Chỉ mục cho bảng `hangsanxuats`
--
ALTER TABLE `hangsanxuats`
  ADD PRIMARY KEY (`MaHang`);

--
-- Chỉ mục cho bảng `khachhangs`
--
ALTER TABLE `khachhangs`
  ADD PRIMARY KEY (`MaKhachHang`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Chỉ mục cho bảng `lienhehotros`
--
ALTER TABLE `lienhehotros`
  ADD PRIMARY KEY (`MaLH`),
  ADD KEY `MaKhachHang` (`MaKhachHang`);

--
-- Chỉ mục cho bảng `nhacungcaps`
--
ALTER TABLE `nhacungcaps`
  ADD PRIMARY KEY (`MaNCC`);

--
-- Chỉ mục cho bảng `sanphams`
--
ALTER TABLE `sanphams`
  ADD PRIMARY KEY (`MaSP`),
  ADD KEY `MaDM` (`MaDM`),
  ADD KEY `MaHang` (`MaHang`),
  ADD KEY `MaNCC` (`MaNCC`);

--
-- Chỉ mục cho bảng `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `thanhtoans`
--
ALTER TABLE `thanhtoans`
  ADD PRIMARY KEY (`MaTT`),
  ADD KEY `MaDH` (`MaDH`);

--
-- Chỉ mục cho bảng `thongkes`
--
ALTER TABLE `thongkes`
  ADD PRIMARY KEY (`MaTK`),
  ADD KEY `MaSP` (`MaSP`);

--
-- Chỉ mục cho bảng `thucudoimois`
--
ALTER TABLE `thucudoimois`
  ADD PRIMARY KEY (`MaThu`),
  ADD KEY `MaKhachHang` (`MaKhachHang`),
  ADD KEY `MaSP` (`MaSP`);

--
-- Chỉ mục cho bảng `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`MaVC`);

--
-- Ràng buộc đối với các bảng kết xuất
--

--
-- Ràng buộc cho bảng `danhgias`
--
ALTER TABLE `danhgias`
  ADD CONSTRAINT `danhgias_ibfk_1` FOREIGN KEY (`MaKhachHang`) REFERENCES `khachhangs` (`MaKhachHang`),
  ADD CONSTRAINT `danhgias_ibfk_2` FOREIGN KEY (`MaSP`) REFERENCES `sanphams` (`MaSP`);

--
-- Ràng buộc cho bảng `donhangs`
--
ALTER TABLE `donhangs`
  ADD CONSTRAINT `donhangs_ibfk_1` FOREIGN KEY (`MaKhachHang`) REFERENCES `khachhangs` (`MaKhachHang`),
  ADD CONSTRAINT `donhangs_ibfk_2` FOREIGN KEY (`MaVC`) REFERENCES `vouchers` (`MaVC`);

--
-- Ràng buộc cho bảng `giohangs`
--
ALTER TABLE `giohangs`
  ADD CONSTRAINT `giohangs_ibfk_1` FOREIGN KEY (`MaKhachHang`) REFERENCES `khachhangs` (`MaKhachHang`),
  ADD CONSTRAINT `giohangs_ibfk_2` FOREIGN KEY (`MaSP`) REFERENCES `sanphams` (`MaSP`);

--
-- Ràng buộc cho bảng `lienhehotros`
--
ALTER TABLE `lienhehotros`
  ADD CONSTRAINT `lienhehotros_ibfk_1` FOREIGN KEY (`MaKhachHang`) REFERENCES `khachhangs` (`MaKhachHang`);

--
-- Ràng buộc cho bảng `sanphams`
--
ALTER TABLE `sanphams`
  ADD CONSTRAINT `sanphams_ibfk_1` FOREIGN KEY (`MaDM`) REFERENCES `danhmucs` (`MaDM`),
  ADD CONSTRAINT `sanphams_ibfk_2` FOREIGN KEY (`MaHang`) REFERENCES `hangsanxuats` (`MaHang`),
  ADD CONSTRAINT `sanphams_ibfk_3` FOREIGN KEY (`MaNCC`) REFERENCES `nhacungcaps` (`MaNCC`);

--
-- Ràng buộc cho bảng `thanhtoans`
--
ALTER TABLE `thanhtoans`
  ADD CONSTRAINT `thanhtoans_ibfk_1` FOREIGN KEY (`MaDH`) REFERENCES `donhangs` (`MaDH`);

--
-- Ràng buộc cho bảng `thongkes`
--
ALTER TABLE `thongkes`
  ADD CONSTRAINT `thongkes_ibfk_1` FOREIGN KEY (`MaSP`) REFERENCES `sanphams` (`MaSP`);

--
-- Ràng buộc cho bảng `thucudoimois`
--
ALTER TABLE `thucudoimois`
  ADD CONSTRAINT `thucudoimois_ibfk_1` FOREIGN KEY (`MaKhachHang`) REFERENCES `khachhangs` (`MaKhachHang`),
  ADD CONSTRAINT `thucudoimois_ibfk_2` FOREIGN KEY (`MaSP`) REFERENCES `sanphams` (`MaSP`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
