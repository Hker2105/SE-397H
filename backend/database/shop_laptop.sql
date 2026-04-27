-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: mysql:3306
-- Thời gian đã tạo: Th4 27, 2026 lúc 09:03 AM
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
('DM0000003', 'Laptop Sinh Viên', 'Các dòng laptop phổ thông giá rẻ', '2026-04-23 05:25:16', '2026-04-23 05:25:16'),
('DM0000004', 'Laptop Đồ Họa', 'Các dòng laptop chuyên đồ họa', '2026-04-23 05:43:06', '2026-04-23 05:43:06'),
('DM0000005', 'Laptop Mỏng Nhẹ', 'Các dòng laptop ultrabook mỏng nhẹ', '2026-04-23 05:43:06', '2026-04-23 05:43:06'),
('DM0000006', 'Laptop 2 Trong 1', 'Các dòng laptop có thể gập màn hình', '2026-04-23 05:43:06', '2026-04-23 05:43:06');

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

--
-- Đang đổ dữ liệu cho bảng `donhangs`
--

INSERT INTO `donhangs` (`MaDH`, `MaKhachHang`, `MaVC`, `SoLuong`, `DonGia`, `NgayDat`, `TongTien`, `TinhTrang`, `GhiChu`, `createdAt`, `updatedAt`) VALUES
('DH0000001', 'KH0000001', 'VC0000001', 1, 52990000, '2026-01-15 00:00:00', 52940000, 'Đã giao', '', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000002', 'KH0000002', NULL, 2, 45990000, '2026-01-20 00:00:00', 91980000, 'Đã giao', 'Giao nhanh', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000003', 'KH0000003', 'VC0000002', 1, 12990000, '2026-01-25 00:00:00', 12890000, 'Đã giao', '', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000004', 'KH0000004', NULL, 1, 49990000, '2026-02-01 00:00:00', 49990000, 'Đã giao', 'Gọi trước khi giao', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000005', 'KH0000005', 'VC0000003', 1, 38990000, '2026-02-05 00:00:00', 38790000, 'Đã giao', '', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000006', 'KH0000006', NULL, 1, 42990000, '2026-02-10 00:00:00', 42990000, 'Đã giao', '', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000007', 'KH0000007', 'VC0000004', 1, 89990000, '2026-02-15 00:00:00', 89490000, 'Đã giao', 'Hàng dễ vỡ', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000008', 'KH0000008', NULL, 1, 32990000, '2026-02-20 00:00:00', 32990000, 'Đã giao', '', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000009', 'KH0000009', 'VC0000005', 2, 16990000, '2026-02-25 00:00:00', 33680000, 'Đã giao', '', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000010', 'KH0000010', NULL, 1, 28990000, '2026-03-01 00:00:00', 28990000, 'Đã giao', '', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000011', 'KH0000011', 'VC0000006', 1, 14990000, '2026-03-05 00:00:00', 14840000, 'Đã giao', '', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000012', 'KH0000012', NULL, 1, 32990000, '2026-03-10 00:00:00', 32990000, 'Đang giao', '', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000013', 'KH0000013', 'VC0000007', 1, 9990000, '2026-03-12 00:00:00', 8990000, 'Đang giao', '', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000014', 'KH0000014', NULL, 1, 22990000, '2026-03-15 00:00:00', 22990000, 'Đang giao', 'Giao buổi sáng', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000015', 'KH0000015', 'VC0000008', 1, 18990000, '2026-03-18 00:00:00', 18960000, 'Đang giao', '', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000016', 'KH0000016', NULL, 2, 52990000, '2026-03-20 00:00:00', 105980000, 'Chờ xác nhận', '', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000017', 'KH0000017', 'VC0000009', 1, 45990000, '2026-03-22 00:00:00', 45490000, 'Chờ xác nhận', '', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000018', 'KH0000018', NULL, 1, 12990000, '2026-03-25 00:00:00', 12990000, 'Chờ xác nhận', 'Giao cuối tuần', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000019', 'KH0000019', 'VC0000010', 1, 49990000, '2026-03-28 00:00:00', 47990000, 'Chờ xác nhận', '', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000020', 'KH0000020', NULL, 1, 38990000, '2026-04-01 00:00:00', 38990000, 'Chờ xác nhận', '', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000021', 'KH0000001', 'VC0000001', 1, 42990000, '2026-04-05 00:00:00', 42940000, 'Đã hủy', 'Hủy do hết hàng', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000022', 'KH0000002', NULL, 1, 89990000, '2026-04-08 00:00:00', 89990000, 'Đã hủy', 'Khách hủy', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000023', 'KH0000003', 'VC0000002', 1, 32990000, '2026-04-10 00:00:00', 32890000, 'Đang xử lý', '', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000024', 'KH0000004', NULL, 1, 16990000, '2026-04-12 00:00:00', 16990000, 'Đang xử lý', '', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000025', 'KH0000005', 'VC0000003', 1, 28990000, '2026-04-14 00:00:00', 28790000, 'Đang xử lý', '', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000026', 'KH0000006', NULL, 2, 14990000, '2026-04-16 00:00:00', 29980000, 'Đang xử lý', '', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000027', 'KH0000007', 'VC0000004', 1, 22990000, '2026-04-18 00:00:00', 22490000, 'Đang xử lý', '', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000028', 'KH0000008', NULL, 1, 18990000, '2026-04-20 00:00:00', 18990000, 'Chờ xác nhận', 'Giao giờ hành chính', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000029', 'KH0000009', 'VC0000005', 1, 9990000, '2026-04-22 00:00:00', 9690000, 'Chờ xác nhận', '', '2026-04-26 10:00:03', '2026-04-26 10:00:03'),
('DH0000030', 'KH0000010', NULL, 1, 52990000, '2026-04-25 00:00:00', 52990000, 'Chờ xác nhận', '', '2026-04-26 10:00:03', '2026-04-26 10:00:03');

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

--
-- Đang đổ dữ liệu cho bảng `hangsanxuats`
--

INSERT INTO `hangsanxuats` (`MaHang`, `TenHang`, `MoTa`, `createdAt`, `updatedAt`) VALUES
('MH0000001', 'ASUS', 'Hãng công nghệ ASUS - Đài Loan', '2026-04-23 05:35:28', '2026-04-23 05:35:28'),
('MH0000002', 'Dell', 'Hãng công nghệ Dell - Mỹ', '2026-04-23 05:35:28', '2026-04-23 05:35:28'),
('MH0000003', 'Acer', 'Hãng công nghệ Acer - Đài Loan', '2026-04-23 05:35:28', '2026-04-23 05:35:28'),
('MH0000004', 'Apple', 'Hãng công nghệ Apple Inc. - Mỹ', '2026-04-23 05:44:13', '2026-04-23 05:44:13'),
('MH0000005', 'Lenovo', 'Hãng công nghệ Lenovo - Trung Quốc', '2026-04-23 05:44:13', '2026-04-23 05:44:13'),
('MH0000006', 'HP', 'Hãng công nghệ HP - Mỹ', '2026-04-23 05:44:13', '2026-04-23 05:44:13'),
('MH0000007', 'MSI', 'Hãng công nghệ MSI - Đài Loan', '2026-04-23 05:44:13', '2026-04-23 05:44:13'),
('MH0000008', 'Samsung', 'Hãng công nghệ Samsung - Hàn Quốc', '2026-04-23 05:44:13', '2026-04-23 05:44:13');

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

--
-- Đang đổ dữ liệu cho bảng `khachhangs`
--

INSERT INTO `khachhangs` (`MaKhachHang`, `HoTen`, `Email`, `MatKhau`, `SoDienThoai`, `DiaChi`, `LoaiTaiKhoan`, `NgayTao`, `createdAt`, `updatedAt`) VALUES
('KH0000001', 'Nguyễn Văn An', 'nguyenvanan@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$LjwGFgmEEfIs9PFfZPmkGw$dhqJQqq8B1YFTcdt8Bx1iFeGLIYleATdLY07GjljdyQ', '0901234567', '123 Lê Duẩn, Đà Nẵng', 'KhachHang', '2026-01-10 00:00:00', '2026-04-26 09:41:32', '2026-04-26 09:41:32'),
('KH0000002', 'Trần Thị Bích', 'trантhibich@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$OTbwbmdZiexsUofRLZmWiw$1t0/GnV/Y6OlePOK70IckfjzqzVscy1NsRl/5WJ3cAQ', '0912345678', '45 Nguyễn Văn Linh, Đà Nẵng', 'KhachHang', '2026-01-15 00:00:00', '2026-04-26 09:42:21', '2026-04-26 09:42:21'),
('KH0000003', 'Lê Hoàng Cường', 'lehoangcuong@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$ytXhiorepNLW/Qu+qvPAcQ$toT5lLNVB1zyaxlW5E+PcxxQAoW5+0RPbCvEt57NyRk', '0923456789', '67 Trần Phú, Hội An', 'KhachHang', '2026-01-20 00:00:00', '2026-04-26 09:42:21', '2026-04-26 09:42:21'),
('KH0000004', 'Phạm Thị Dung', 'phamthidung@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$eW6KM+bL47zCrP0mhTHMtQ$0TOr694N1vQAEbxyPWf3M2QrA74+M9mUt9pPoUvRZ88', '0934567890', '89 Hùng Vương, Đà Nẵng', 'KhachHang', '2026-01-25 00:00:00', '2026-04-26 09:42:22', '2026-04-26 09:42:22'),
('KH0000005', 'Hoàng Văn Em', 'hoangvanem@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$XmjHlu5RKUKXgAGFC7O8SA$h1NpouWq8m/hUqrGWW1mhwFX2t4VABmJHKoz8geMtLg', '0945678901', '12 Điện Biên Phủ, Đà Nẵng', 'KhachHang', '2026-02-01 00:00:00', '2026-04-26 09:42:22', '2026-04-26 09:42:22'),
('KH0000006', 'Võ Thị Phương', 'vothiphuong@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$HfJfMEMX868g0tEtaFDVXA$91976YwbcsU61/BsJFOd0BgnDF61R8J+6WRKUoKtznU', '0956789012', '34 Phan Chu Trinh, Đà Nẵng', 'KhachHang', '2026-02-05 00:00:00', '2026-04-26 09:42:22', '2026-04-26 09:42:22'),
('KH0000007', 'Đặng Văn Giang', 'dangvangiang@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$HmFyYLWzaB1gk+2KIwsksA$Tw42+jl6LIjbsp7jWEKI2ohnMOqbuuCKg5LpXiCsImQ', '0967890123', '56 Lý Thường Kiệt, Huế', 'KhachHang', '2026-02-10 00:00:00', '2026-04-26 09:42:22', '2026-04-26 09:42:22'),
('KH0000008', 'Bùi Thị Hoa', 'buithihoa@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$hnrZOF0Y6RhNerzFUdJv8A$alphBlKoSjCN8hWP6RT8G2k4UnJqZ8yq/vdE110IV9Q', '0978901234', '78 Nguyễn Huệ, TP.HCM', 'KhachHang', '2026-02-15 00:00:00', '2026-04-26 09:42:22', '2026-04-26 09:42:22'),
('KH0000009', 'Ngô Văn Hùng', 'ngovanhung@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$mvwQEszJ5OlYshYKQiRlCg$pV7zehSGA9ih65whflCCQSSsav8dxJvPE1DlHe7yP+U', '0989012345', '90 Trần Hưng Đạo, Hà Nội', 'KhachHang', '2026-02-20 00:00:00', '2026-04-26 09:42:22', '2026-04-26 09:42:22'),
('KH0000010', 'Đinh Thị Kim', 'dinhthikim@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$iguQkjiAYWGLdHlnM83j0Q$SHwkq5M0/kVK5L41zYwJ1LwSQ4ObhpMkP9A9GyFlCNQ', '0990123456', '11 Lê Lợi, Đà Nẵng', 'KhachHang', '2026-02-25 00:00:00', '2026-04-26 09:42:22', '2026-04-26 09:42:22'),
('KH0000011', 'Trương Văn Long', 'truongvanlong@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$+qcUIj3b3N1/pbvMbUp9JQ$Jf6UbHSCR3fP3zr5HXxKtpPPSeu3OKqEBcX3cqV2HWY', '0901111111', '22 Hoàng Diệu, Đà Nẵng', 'KhachHang', '2026-03-01 00:00:00', '2026-04-26 09:42:22', '2026-04-26 09:42:22'),
('KH0000012', 'Lý Thị Mai', 'lythimai@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$wbbZ+CTfmrAt0mKumUJLxw$KqFLa0AtFVc7kWiekreM6CyAfuEea3bqzVPi2Apzo4k', '0902222222', '33 Pasteur, TP.HCM', 'KhachHang', '2026-03-05 00:00:00', '2026-04-26 09:42:22', '2026-04-26 09:42:22'),
('KH0000013', 'Phan Văn Nam', 'phanvannam@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$F0qLBuQyEaJX58CcsWFVAA$98FoBn3s+Oy84bzYdJIl8e4C5AL3zFzD4y68MemhuiQ', '0903333333', '44 Bạch Đằng, Đà Nẵng', 'KhachHang', '2026-03-10 00:00:00', '2026-04-26 09:42:22', '2026-04-26 09:42:22'),
('KH0000014', 'Dương Thị Oanh', 'duongthioanh@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$bBUB7vLRGMsXnc1lCVxWQQ$NnfYNFokSvj1JqH7b/e/5K8yrOFtLeP31I7YGSZPUW8', '0904444444', '55 Ngô Quyền, Hà Nội', 'KhachHang', '2026-03-15 00:00:00', '2026-04-26 09:42:22', '2026-04-26 09:42:22'),
('KH0000015', 'Vũ Văn Phúc', 'vuvanphuc@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$ULNijfXRowqjh/WD1qoI9g$x1KJypTdTd1t8dgnjKE3OqnLCBLoIV3f8eMNTRbQKwA', '0905555555', '66 Trần Quốc Toản, Đà Nẵng', 'KhachHang', '2026-03-20 00:00:00', '2026-04-26 09:42:22', '2026-04-26 09:42:22'),
('KH0000016', 'Mai Thị Quỳnh', 'maithiquynh@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$JbuD4h+NUGjyDg13R8dUrQ$+fJb3iK/WI7HtjYKck6DzTXVSjJVWOlbd772PaJWrwA', '0906666666', '77 Phan Đình Phùng, Đà Nẵng', 'KhachHang', '2026-03-25 00:00:00', '2026-04-26 09:42:22', '2026-04-26 09:42:22'),
('KH0000017', 'Cao Văn Sơn', 'caovanson@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$cmgMFlDcukyITcOcv52FGg$owbf9xXt0gZWYPswcBXMi6asCEKJxVs6saU6+d77PMM', '0907777777', '88 Nguyễn Tri Phương, Đà Nẵng', 'KhachHang', '2026-04-01 00:00:00', '2026-04-26 09:42:22', '2026-04-26 09:42:22'),
('KH0000018', 'Lê Thị Thu', 'lethithu@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$9kJl2Qh00WXQCffq1JYspA$xowtkcFz6Ema8bysNfl+F8FOAcwb7zon/fQVI9wXqA8', '0908888888', '99 Võ Thị Sáu, TP.HCM', 'KhachHang', '2026-04-05 00:00:00', '2026-04-26 09:42:22', '2026-04-26 09:42:22'),
('KH0000019', 'Trần Văn Uy', 'tranvanuy@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$L2IJesVZcfwgusZJua9gfg$Svn8ZwWzVpc6N9I9/xdrIo5orKtr9FdbtUukq0p2mcI', '0909999999', '100 Lê Hồng Phong, Đà Nẵng', 'KhachHang', '2026-04-10 00:00:00', '2026-04-26 09:42:22', '2026-04-26 09:42:22'),
('KH0000020', 'Nguyễn Thị Vân', 'nguyenthivan@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$Z3M036Prd2Bk2oZPwEW2Hg$VW6n3E3BLBMTFPqR1lw4WqbuJ4AiMx8Bsapw0fuMyic', '0910000000', '111 Đinh Tiên Hoàng, Đà Nẵng', 'KhachHang', '2026-04-15 00:00:00', '2026-04-26 09:42:22', '2026-04-26 09:42:22');

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

--
-- Đang đổ dữ liệu cho bảng `nhacungcaps`
--

INSERT INTO `nhacungcaps` (`MaNCC`, `TenNCC`, `SoDienThoai`, `DiaChi`, `Email`, `createdAt`, `updatedAt`) VALUES
('NCC000001', 'FPT Shop', '1800599937', '261 Nguyễn Văn Linh, Đà Nẵng', 'hotro@fptshop.com.vn', '2026-04-23 05:34:14', '2026-04-23 05:34:14'),
('NCC000002', 'Thế Giới Di Động', '1800.1060', '364 Điện Biên Phủ, Đà Nẵng', 'cskh@thegioididong.com', '2026-04-23 05:34:14', '2026-04-23 05:34:14'),
('NCC000003', 'CellphoneS', '1800.2097', '200 Nguyễn Văn Linh, Đà Nẵng', 'cskh@cellphones.com.vn', '2026-04-23 05:34:14', '2026-04-23 05:34:14'),
('NCC000004', 'Phong Vũ', '1800545463', '194 Điện Biên Phủ, Đà Nẵng', 'cskh@phongvu.vn', '2026-04-23 05:43:56', '2026-04-23 05:43:56'),
('NCC000005', 'Laptop88', '0905123456', '102 Lê Duẩn, Đà Nẵng', 'cskh@laptop88.vn', '2026-04-23 05:43:56', '2026-04-23 05:43:56'),
('NCC000006', 'Viettel Store', '1800.8000', '255 Hùng Vương, Đà Nẵng', 'cskh@viettelstore.vn', '2026-04-23 05:43:56', '2026-04-23 05:43:56');

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

--
-- Đang đổ dữ liệu cho bảng `sanphams`
--

INSERT INTO `sanphams` (`MaSP`, `TenSP`, `MaDM`, `MaHang`, `MaNCC`, `MoTa`, `Gia`, `SoLuongTon`, `HinhAnh`, `UuDaiSV`, `NgayThem`, `createdAt`, `updatedAt`) VALUES
('SP0000001', 'ASUS ROG Strix G16 2024', 'DM0000001', 'MH0000001', 'NCC000001', 'CPU Intel Core i9-14900HX, RAM 32GB, SSD 1TB, GPU RTX 4070, 16 inch 240Hz', 52990000, 30, 'asus-rog-strix-g16-2024.jpg', 0, '2026-04-20 00:00:00', '2026-04-23 05:39:21', '2026-04-23 05:39:21'),
('SP0000002', 'Dell XPS 15 9530', 'DM0000002', 'MH0000002', 'NCC000002', 'CPU Intel Core i7-13700H, RAM 16GB, SSD 512GB, màn hình OLED 15.6 inch 3.5K', 45990000, 20, 'dell-xps-15-9530.jpg', 1, '2026-04-20 00:00:00', '2026-04-23 05:39:21', '2026-04-23 05:39:21'),
('SP0000003', 'Acer Aspire 5 A515', 'DM0000003', 'MH0000003', 'NCC000003', 'CPU Intel Core i5-1235U, RAM 8GB, SSD 256GB, màn hình 15.6 inch FHD', 12990000, 50, 'acer-aspire-5-a515.jpg', 1, '2026-04-20 00:00:00', '2026-04-23 05:39:21', '2026-04-23 05:39:21'),
('SP0000004', 'MacBook Pro 14 M3 Pro', 'DM0000004', 'MH0000004', 'NCC000001', 'Chip M3 Pro, RAM 18GB, SSD 512GB, màn hình Liquid Retina XDR 14.2 inch', 49990000, 15, 'macbook-pro-14-m3-pro.jpg', 0, '2026-04-20 00:00:00', '2026-04-23 05:46:08', '2026-04-25 08:24:52'),
('SP0000005', 'Lenovo ThinkPad X1 Carbon', 'DM0000005', 'MH0000005', 'NCC000004', 'CPU Intel Core i7-1365U, RAM 16GB, SSD 512GB, màn hình 14 inch FHD IPS', 38990000, 25, 'lenovo-thinkpad-x1-carbon.jpg', 0, '2026-04-20 00:00:00', '2026-04-23 05:46:08', '2026-04-23 05:46:08'),
('SP0000006', 'HP Spectre x360 14', 'DM0000006', 'MH0000006', 'NCC000005', 'CPU Intel Core i7-1355U, RAM 16GB, SSD 1TB, màn hình OLED 14 inch 2.8K cảm ứng', 42990000, 18, 'hp-spectre-x360-14.jpg', 0, '2026-04-20 00:00:00', '2026-04-23 05:46:08', '2026-04-23 05:46:08'),
('SP0000007', 'MSI Titan GT77', 'DM0000001', 'MH0000007', 'NCC000002', 'CPU Intel Core i9-13980HX, RAM 64GB, SSD 2TB, GPU RTX 4090, màn hình 17.3 inch 4K', 89990000, 10, 'msi-titan-gt77.jpg', 0, '2026-04-20 00:00:00', '2026-04-23 05:46:08', '2026-04-23 05:46:08'),
('SP0000008', 'Samsung Galaxy Book3 Pro', 'DM0000005', 'MH0000008', 'NCC000006', 'CPU Intel Core i7-1360P, RAM 16GB, SSD 512GB, màn hình AMOLED 14 inch 3K', 32990000, 22, 'samsung-galaxy-book3-pro.jpg', 1, '2026-04-20 00:00:00', '2026-04-23 05:46:08', '2026-04-23 05:46:08'),
('SP0000009', 'Lenovo IdeaPad Gaming 3', 'DM0000001', 'MH0000005', 'NCC000003', 'CPU AMD Ryzen 5 7535H, RAM 8GB, SSD 512GB, GPU RTX 2050, màn hình 15.6 inch 144Hz', 16990000, 40, 'lenovo-ideapad-gaming-3.jpg', 1, '2026-04-20 00:00:00', '2026-04-23 05:46:08', '2026-04-23 05:46:08'),
('SP0000010', 'HP EliteBook 840 G10', 'DM0000002', 'MH0000006', 'NCC000004', 'CPU Intel Core i5-1345U, RAM 16GB, SSD 256GB, màn hình 14 inch FHD IPS', 28990000, 30, 'hp-elitebook-840-g10.jpg', 0, '2026-04-20 00:00:00', '2026-04-23 05:46:08', '2026-04-23 05:46:08'),
('SP0000011', 'Acer Swift 3 SF314', 'DM0000005', 'MH0000003', 'NCC000005', 'CPU Intel Core i5-1240P, RAM 8GB, SSD 512GB, màn hình 14 inch FHD IPS', 14990000, 35, 'acer-swift-3-sf314.jpg', 1, '2026-04-20 00:00:00', '2026-04-23 05:46:08', '2026-04-23 05:46:08'),
('SP0000012', 'MacBook Air 15 M2', 'DM0000005', 'MH0000004', 'NCC000001', 'Chip M2, RAM 8GB, SSD 256GB, màn hình Liquid Retina 15.3 inch', 32990000, 28, 'macbook-air-15-m2.jpg', 0, '2026-04-20 00:00:00', '2026-04-23 05:46:08', '2026-04-23 05:46:08'),
('SP0000013', 'Dell Inspiron 15 3520', 'DM0000003', 'MH0000002', 'NCC000006', 'CPU Intel Core i3-1215U, RAM 8GB, SSD 256GB, màn hình 15.6 inch FHD', 9990000, 60, 'dell-inspiron-15-3520.jpg', 1, '2026-04-20 00:00:00', '2026-04-23 05:46:08', '2026-04-23 05:46:08'),
('SP0000014', 'ASUS ZenBook 14 UX425', 'DM0000005', 'MH0000001', 'NCC000002', 'CPU Intel Core i5-1240P, RAM 16GB, SSD 512GB, màn hình 14 inch FHD OLED', 22990000, 25, 'asus-zenbook-14-ux425.jpg', 1, '2026-04-20 00:00:00', '2026-04-23 05:46:08', '2026-04-23 05:46:08'),
('SP0000015', 'MSI Modern 15 B12M', 'DM0000002', 'MH0000007', 'NCC000003', 'CPU Intel Core i7-1255U, RAM 16GB, SSD 512GB, màn hình 15.6 inch FHD IPS', 18990000, 20, 'msi-modern-15-b12m.jpg', 1, '2026-04-20 00:00:00', '2026-04-23 05:46:08', '2026-04-23 05:46:08');

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
-- Đang đổ dữ liệu cho bảng `vouchers`
--

INSERT INTO `vouchers` (`MaVC`, `MaVoucher`, `GiaTri`, `NgayBD`, `NgayKT`, `SoLuong`, `createdAt`, `updatedAt`) VALUES
('VC0000001', 'SUMMER2026', 50000, '2026-05-01 00:00:00', '2026-05-31 00:00:00', 100, '2026-04-26 09:52:24', '2026-04-26 09:52:24'),
('VC0000002', 'WELCOME10', 100000, '2026-04-01 00:00:00', '2026-06-30 00:00:00', 50, '2026-04-26 09:52:24', '2026-04-26 09:52:24'),
('VC0000003', 'STUDENT20', 200000, '2026-04-15 00:00:00', '2026-07-15 00:00:00', 200, '2026-04-26 09:52:24', '2026-04-26 09:52:24'),
('VC0000004', 'FLASH50', 500000, '2026-04-20 00:00:00', '2026-04-30 00:00:00', 20, '2026-04-26 09:52:24', '2026-04-26 09:52:24'),
('VC0000005', 'BIRTHDAY30', 300000, '2026-04-26 00:00:00', '2026-05-26 00:00:00', 30, '2026-04-26 09:52:24', '2026-04-26 09:52:24'),
('VC0000006', 'NEWUSER15', 150000, '2026-04-01 00:00:00', '2026-12-31 00:00:00', 500, '2026-04-26 09:52:24', '2026-04-26 09:52:24'),
('VC0000007', 'GAMING100', 1000000, '2026-05-01 00:00:00', '2026-05-15 00:00:00', 10, '2026-04-26 09:52:24', '2026-04-26 09:52:24'),
('VC0000008', 'FREESHIP', 30000, '2026-04-26 00:00:00', '2026-06-26 00:00:00', 1000, '2026-04-26 09:52:24', '2026-04-26 09:52:24'),
('VC0000009', 'VIP500', 500000, '2026-04-26 00:00:00', '2026-07-26 00:00:00', 15, '2026-04-26 09:52:24', '2026-04-26 09:52:24'),
('VC0000010', 'ENDYEAR', 2000000, '2026-12-01 00:00:00', '2026-12-31 00:00:00', 5, '2026-04-26 09:52:24', '2026-04-26 09:52:24');

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
