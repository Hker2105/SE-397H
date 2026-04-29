-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: mysql:3306
-- Thời gian đã tạo: Th4 29, 2026 lúc 10:43 AM
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
('DM001', 'Laptop Gaming', 'Danh mục chuyên dành cho các dòng laptop gaming hiệu năng cao, card đồ họa mạnh và thiết kế hầm hố.', '2026-04-28 11:17:19', '2026-04-28 11:17:19'),
('DM002', 'Laptop Văn Phòng', 'Danh mục laptop phục vụ học tập, làm việc văn phòng, pin tốt và giá hợp lý.', '2026-04-28 11:17:19', '2026-04-28 11:17:19'),
('DM003', 'Laptop Doanh Nhân', 'Laptop cao cấp dành cho doanh nhân với thiết kế sang trọng, bảo mật cao và độ bền tốt.', '2026-04-28 11:17:19', '2026-04-28 11:17:19'),
('DM004', 'Laptop Đồ Họa', 'Laptop cấu hình mạnh, màn hình chuẩn màu dành cho thiết kế và dựng phim.', '2026-04-28 11:17:19', '2026-04-28 11:17:19'),
('DM005', 'MacBook', 'Dòng laptop cao cấp của Apple chạy macOS với hiệu năng mạnh và pin lâu.', '2026-04-28 11:17:19', '2026-04-28 11:17:19');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `donhangs`
--

CREATE TABLE `donhangs` (
  `MaDH` varchar(255) NOT NULL,
  `MaKhachHang` varchar(255) DEFAULT NULL,
  `MaVC` varchar(255) DEFAULT NULL,
  `MaSP` varchar(255) DEFAULT NULL,
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

INSERT INTO `donhangs` (`MaDH`, `MaKhachHang`, `MaVC`, `MaSP`, `SoLuong`, `DonGia`, `NgayDat`, `TongTien`, `TinhTrang`, `GhiChu`, `createdAt`, `updatedAt`) VALUES
('DH0000001', 'KH0000001', 'VC0000001', 'SP005', 1, 52990000, '2026-01-15 00:00:00', 52940000, 'Đã giao', '', '2026-04-28 20:26:57', '2026-04-28 20:26:57'),
('DH0000002', 'KH0000002', NULL, 'SP004', 2, 45990000, '2026-01-20 00:00:00', 91980000, 'Đã giao', 'Giao nhanh', '2026-04-28 20:26:57', '2026-04-28 20:26:57'),
('DH0000003', 'KH0000003', 'VC0000002', 'SP002', 1, 12990000, '2026-01-25 00:00:00', 12890000, 'Đã giao', '', '2026-04-28 20:26:57', '2026-04-28 20:26:57'),
('DH0000004', 'KH0000004', NULL, 'SP005', 1, 49990000, '2026-02-01 00:00:00', 49990000, 'Đã giao', 'Gọi trước khi giao', '2026-04-28 20:26:57', '2026-04-28 20:26:57'),
('DH0000005', 'KH0000005', 'VC0000003', 'SP003', 1, 38990000, '2026-02-05 00:00:00', 38790000, 'Đã giao', '', '2026-04-28 20:26:57', '2026-04-28 20:26:57'),
('DH0000006', 'KH0000006', NULL, 'SP007', 1, 42990000, '2026-02-10 00:00:00', 42990000, 'Đã giao', '', '2026-04-28 20:26:57', '2026-04-28 20:26:57'),
('DH0000007', 'KH0000007', 'VC0000004', 'SP008', 1, 89990000, '2026-02-15 00:00:00', 89490000, 'Đã giao', 'Hàng dễ vỡ', '2026-04-28 20:26:57', '2026-04-28 20:26:57'),
('DH0000008', 'KH0000008', NULL, 'SP009', 1, 32990000, '2026-02-20 00:00:00', 32990000, 'Đã giao', '', '2026-04-28 20:26:57', '2026-04-28 20:26:57'),
('DH0000009', 'KH0000009', 'VC0000005', 'SP010', 2, 16990000, '2026-02-25 00:00:00', 33680000, 'Đã giao', '', '2026-04-28 20:26:57', '2026-04-28 20:26:57'),
('DH0000010', 'KH0000010', NULL, 'SP011', 1, 28990000, '2026-03-01 00:00:00', 28990000, 'Đã giao', '', '2026-04-28 20:26:57', '2026-04-28 20:26:57'),
('DH0000011', 'KH0000011', 'VC0000006', 'SP006', 1, 14990000, '2026-03-05 00:00:00', 14840000, 'Đã giao', '', '2026-04-28 20:26:57', '2026-04-28 20:26:57'),
('DH0000012', 'KH0000012', NULL, 'SP009', 1, 32990000, '2026-03-10 00:00:00', 32990000, 'Đang giao', '', '2026-04-28 20:26:57', '2026-04-28 20:26:57'),
('DH0000013', 'KH0000013', 'VC0000007', 'SP013', 1, 9990000, '2026-03-12 00:00:00', 8990000, 'Đang giao', '', '2026-04-28 20:26:57', '2026-04-28 20:26:57'),
('DH0000014', 'KH0000014', NULL, 'SP014', 1, 22990000, '2026-03-15 00:00:00', 22990000, 'Đang giao', 'Giao buổi sáng', '2026-04-28 20:26:57', '2026-04-28 20:26:57'),
('DH0000015', 'KH0000015', 'VC0000008', 'SP015', 1, 18990000, '2026-03-18 00:00:00', 18960000, 'Đang giao', '', '2026-04-28 20:26:57', '2026-04-28 20:26:57'),
('DH0000016', 'KH0000016', NULL, 'SP001', 2, 52990000, '2026-03-20 00:00:00', 105980000, 'Chờ xác nhận', '', '2026-04-28 20:26:57', '2026-04-28 20:26:57'),
('DH0000017', 'KH0000017', 'VC0000009', 'SP004', 1, 45990000, '2026-03-22 00:00:00', 45490000, 'Chờ xác nhận', '', '2026-04-28 20:26:57', '2026-04-28 20:26:57'),
('DH0000018', 'KH0000018', NULL, 'SP002', 1, 12990000, '2026-03-25 00:00:00', 12990000, 'Chờ xác nhận', 'Giao cuối tuần', '2026-04-28 20:26:57', '2026-04-28 20:26:57');

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
('H001', 'ASUS', 'Laptop gaming và văn phòng.', '2026-04-28 19:55:37', '2026-04-28 19:55:37'),
('H002', 'Acer', 'Laptop giá tốt, đa dạng mẫu.', '2026-04-28 19:55:37', '2026-04-28 19:55:37'),
('H003', 'Lenovo', 'Laptop doanh nhân và gaming.', '2026-04-28 19:55:37', '2026-04-28 19:55:37'),
('H004', 'Dell', 'Laptop bền, ổn định.', '2026-04-28 19:55:37', '2026-04-28 19:55:37'),
('H005', 'Apple', 'MacBook cao cấp.', '2026-04-28 19:55:37', '2026-04-28 19:55:37'),
('H006', 'HP', 'Laptop văn phòng cao cấp.', '2026-04-28 19:55:37', '2026-04-28 19:55:37'),
('H007', 'MSI', 'Laptop gaming mạnh.', '2026-04-28 19:55:37', '2026-04-28 19:55:37'),
('H008', 'Samsung', 'Laptop mỏng nhẹ.', '2026-04-28 19:55:37', '2026-04-28 19:55:37');

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
  `GioiTinh` varchar(255) DEFAULT NULL,
  `LoaiTaiKhoan` varchar(255) DEFAULT NULL,
  `NgayTao` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `khachhangs`
--

INSERT INTO `khachhangs` (`MaKhachHang`, `HoTen`, `Email`, `MatKhau`, `SoDienThoai`, `DiaChi`, `GioiTinh`, `LoaiTaiKhoan`, `NgayTao`, `createdAt`, `updatedAt`) VALUES
('KH0000001', 'Nguyễn Văn An', 'nguyenvanan@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$DC6UPm2pXCJhXtygwvvajg$rldSuI9jfV7u3SVzTFPmTws9LuGcf7CMb7tQ0yHhjGA', '0901234567', '123 Lê Duẩn, Đà Nẵng', 'Nam\r\n', 'KhachHang', '2026-01-10 00:00:00', '2026-04-28 10:59:13', '2026-04-28 10:59:13'),
('KH0000002', 'Trần Thị Bích', 'tranthib@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$JBz9+GUjtW7lkrNB44JziA$GOi8BcBx53DR4umGrEWs5/7uxd3hhiZoeruo1oifR7I', '0912345678', '45 Nguyễn Văn Linh, Đà Nẵng', 'Nữ', 'KhachHang', '2026-01-15 00:00:00', '2026-04-28 10:59:13', '2026-04-28 10:59:13'),
('KH0000003', 'Lê Hoàng Cường', 'lehoangcuong@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$ZwmTF+GDH4/Jcj9HsehYrA$rLcqTdLmB8zVmKnVp+JETbWsVEH1tgSDBY4jYcNbOCc', '0923456789', '67 Trần Phú, Hội An', 'Nam', 'KhachHang', '2026-01-20 00:00:00', '2026-04-28 10:59:13', '2026-04-28 10:59:13'),
('KH0000004', 'Phạm Thị Dung', 'phamthidung@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$0F1jaM+kfPfpK3J/vaDLpA$ariUIF6blkHXZE/ZgKVfc1No5uAYvfTnqVAAh4S12u4', '0934567890', '89 Hùng Vương, Đà Nẵng', 'Nữ', 'KhachHang', '2026-01-25 00:00:00', '2026-04-28 10:59:13', '2026-04-28 10:59:13'),
('KH0000005', 'Hoàng Văn Em', 'hoangvanem@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$qjzE2qw/ybAlcWCnU0yx/w$7ZCjexXWuQC0wwDsVrRZ7995oS4Il/rEBdicah2zAHw', '0945678901', '12 Điện Biên Phủ, Đà Nẵng', 'Nam', 'KhachHang', '2026-02-01 00:00:00', '2026-04-28 10:59:13', '2026-04-28 10:59:13'),
('KH0000006', 'Võ Thị Phương', 'vothiphuong@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$KzpU3AzLb2vz4FGiG0Z7zg$4+isTELMdpm2ewBRgkSZPQK1yBxGdOy5dTZo2IRzvp8', '0956789012', '34 Phan Chu Trinh, Đà Nẵng', 'Nữ', 'KhachHang', '2026-02-05 00:00:00', '2026-04-28 10:59:13', '2026-04-28 10:59:13'),
('KH0000007', 'Đặng Văn Giang', 'dangvangiang@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$fDPOK9wKQIeNK5jeG7KEAA$iyINm9zRrBnj2GKcHValq2/ypElZq6qUrrstBR6A5Kk', '0967890123', '56 Lý Thường Kiệt, Huế', 'Nam\r\n', 'KhachHang', '2026-02-10 00:00:00', '2026-04-28 10:59:13', '2026-04-28 10:59:13'),
('KH0000008', 'Bùi Thị Hoa', 'buithihoa@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$lxQ+a0+1aI+HSPgMqcIQUg$5CWFmN0c1H8V9NtqC0gtxIhyQ3f9BarJT9ytHCnRNA8', '0978901234', '78 Nguyễn Huệ, TP.HCM', 'Nữ', 'KhachHang', '2026-02-15 00:00:00', '2026-04-28 10:59:13', '2026-04-28 10:59:13'),
('KH0000009', 'Ngô Văn Hùng', 'ngovanhung@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$FqnTv0fCO8TWoOMuFWwF0g$pRGi8ndZthtvccq3vAdcGNjhFkRpzciiFlxWW5ytJD0', '0989012345', '90 Trần Hưng Đạo, Hà Nội', 'Nam', 'KhachHang', '2026-02-20 00:00:00', '2026-04-28 10:59:13', '2026-04-28 10:59:13'),
('KH0000010', 'Đinh Thị Kim', 'dinhthikim@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$YXKOB14A9JEYpg/xfxnWaw$ex69mdeH9a32/VWQYIKxtoIB6HhaO6MBpRI98wrF2Zw', '0990123456', '11 Lê Lợi, Đà Nẵng', 'Nữ', 'KhachHang', '2026-02-25 00:00:00', '2026-04-28 10:59:13', '2026-04-28 10:59:13'),
('KH0000011', 'Trương Văn Long', 'truongvanlong@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$36UDNrj02hX1zteACFJvtA$UMhmUh9lR5dToOosENntUfg+IgwCM201iEXATJOxdyY', '0901111111', '22 Hoàng Diệu, Đà Nẵng', 'Nam', 'KhachHang', '2026-03-01 00:00:00', '2026-04-28 10:59:13', '2026-04-28 10:59:13'),
('KH0000012', 'Lý Thị Mai', 'lythimai@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$wYQP6tNODHxcyVMmWdYRuQ$WBDzX+yBNTjVofjrrSAW/JQsz8J0NwjgmbFdnV30A94', '0902222222', '33 Pasteur, TP.HCM', 'Nữ', 'KhachHang', '2026-03-05 00:00:00', '2026-04-28 10:59:13', '2026-04-28 10:59:13'),
('KH0000013', 'Phan Văn Nam', 'phanvannam@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$1FJNmwEGFhoazUSOk74+bQ$QG0aMV1JA04zdcO1oA4GlrV1OHVXNcdkZVKyYdItGNs', '0903333333', '44 Bạch Đằng, Đà Nẵng', 'Nam', 'KhachHang', '2026-03-10 00:00:00', '2026-04-28 10:59:13', '2026-04-28 10:59:13'),
('KH0000014', 'Dương Thị Oanh', 'duongthioanh@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$LIVW5KRlXMhcFtHTBD9fdw$OpKVXcl/C+y5QWAEY43qquQTzYsulgSFfvzeK/qyDY4', '0904444444', '55 Ngô Quyền, Hà Nội', 'Nữ', 'KhachHang', '2026-03-15 00:00:00', '2026-04-28 10:59:13', '2026-04-28 10:59:13'),
('KH0000015', 'Vũ Văn Phúc', 'vuvanphuc@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$K25IvgJn1sVhr+aAMbAhjw$7X00ZU29OJVKXv89wIDi0sbyWrvxD5JwT0luurRimzY', '0905555555', '66 Trần Quốc Toản, Đà Nẵng', 'Nam', 'KhachHang', '2026-03-20 00:00:00', '2026-04-28 10:59:13', '2026-04-28 10:59:13'),
('KH0000016', 'Mai Thị Quỳnh', 'maithiquynh@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$U9yrdmd7jxrVKGw9kTC3GQ$s/5A9ji2ccmt4JJQDQLJzbo79eSwiGvXufaisjGSthk', '0906666666', '77 Phan Đình Phùng, Đà Nẵng', 'Nữ', 'KhachHang', '2026-03-25 00:00:00', '2026-04-28 10:59:13', '2026-04-28 10:59:13'),
('KH0000017', 'Cao Văn Sơn', 'caovanson@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$fxLayIbUNAZUQDWMFDe6eQ$fzzZ0N+8tQLvjqkluhufr+cXqO1riwRcnRb0olmq89E', '0907777777', '88 Nguyễn Tri Phương, Đà Nẵng', 'Nam', 'KhachHang', '2026-04-01 00:00:00', '2026-04-28 10:59:14', '2026-04-28 10:59:14'),
('KH0000018', 'Lê Thị Thu', 'lethithu@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$AbPTK20f+z4gr9jJnFYVzg$xWXk6ru9JZka2LTS1G1M0HXr4XdXPflOdyGEoBImxM0', '0908888888', '99 Võ Thị Sáu, TP.HCM', 'Nữ', 'KhachHang', '2026-04-05 00:00:00', '2026-04-28 10:59:14', '2026-04-28 10:59:14'),
('KH0000019', 'Nguyễn Trường Quốc', 'quoc93346@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$tqFTsK26K2LNqXefUljXGg$DTsZ1jmN9Rlq5gZnKNsgiU7Fphne8FHRjpPc8s+kFls', '0877335286', '78A Phan Văn Trị, TP.Đà Nẵng', 'Nam', 'Admin', '2026-04-06 00:00:00', '2026-04-29 04:29:57', '2026-04-29 04:29:57');

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
('NCC001', 'Công ty Laptop Việt', '0901111111', '123 Nguyễn Văn Linh, Hải Châu, Đà Nẵng', 'laptopviet@gmail.com', '2026-04-28 11:28:35', '2026-04-28 11:28:35'),
('NCC002', 'Tech World', '0902222222', '45 Trần Duy Hưng, Cầu Giấy, Hà Nội', 'techworld@gmail.com', '2026-04-28 11:28:35', '2026-04-28 11:28:35'),
('NCC003', 'Hoàng Hà PC', '0903333333', '78 Nguyễn Thị Minh Khai, Quận 1, TP.HCM', 'hoanghapc@gmail.com', '2026-04-28 11:28:35', '2026-04-28 11:28:35'),
('NCC004', 'Future Tech', '0904444444', '22 Nguyễn Văn Cừ, Ninh Kiều, Cần Thơ', 'futuretech@gmail.com', '2026-04-28 11:28:35', '2026-04-28 11:28:35'),
('NCC005', 'Mega Store', '0905555555', '66 Lạch Tray, Ngô Quyền, Hải Phòng', 'megastore@gmail.com', '2026-04-28 11:28:35', '2026-04-28 11:28:35');

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
('SP001', 'ASUS ROG Strix G16 2024', 'DM001', 'H001', 'NCC001', 'ASUS ROG Strix G16 2024 là mẫu laptop gaming cao cấp được trang bị bộ vi xử lý Intel thế hệ mới kết hợp cùng card đồ họa rời mạnh mẽ, mang lại hiệu năng vượt trội cho các tựa game AAA và tác vụ nặng. Máy sở hữu màn hình kích thước lớn với tần số quét cao, hình ảnh mượt mà và màu sắc sống động. Hệ thống tản nhiệt tiên tiến giúp duy trì hiệu suất ổn định trong thời gian dài, phù hợp cho game thủ chuyên nghiệp, streamer và người dùng sáng tạo nội dung.', 38990000, 12, 'asus-rog-strix-g16-2024.jpg', 1, '2026-04-01 00:00:00', '2026-04-28 19:59:42', '2026-04-28 19:59:42'),
('SP002', 'Acer Aspire 5 A515', 'DM002', 'H002', 'NCC002', '<p>Acer Aspire 5 A515 l&agrave; d&ograve;ng laptop văn ph&ograve;ng phổ th&ocirc;ng được thiết kế hiện đại, chắc chắn v&agrave; dễ d&agrave;ng mang theo khi di chuyển. Thiết bị đ&aacute;p ứng tốt nhu cầu học tập, l&agrave;m việc văn ph&ograve;ng, xử l&yacute; t&agrave;i liệu, lướt web v&agrave; giải tr&iacute; hằng ng&agrave;y. M&aacute;y c&oacute; b&agrave;n ph&iacute;m thoải m&aacute;i, m&agrave;n h&igrave;nh sắc n&eacute;t c&ugrave;ng thời lượng pin ổn định, ph&ugrave; hợp cho sinh vi&ecirc;n v&agrave; nh&acirc;n vi&ecirc;n văn ph&ograve;ng cần một chiếc laptop bền bỉ với mức gi&aacute; hợp l&yacute;.</p>\n', 14990000, 18, 'acer-aspire-5-a515.jpg', 1, '2026-04-02 00:00:00', '2026-04-28 19:59:42', '2026-04-29 10:06:59'),
('SP003', 'Lenovo ThinkPad X1 Carbon', 'DM003', 'H003', 'NCC003', 'Lenovo ThinkPad X1 Carbon là mẫu laptop doanh nhân cao cấp nổi tiếng với độ bền đạt chuẩn quân đội, thiết kế siêu nhẹ và bàn phím gõ tốt hàng đầu thị trường. Máy được tích hợp các tính năng bảo mật hiện đại như cảm biến vân tay, camera bảo mật và chip mã hóa dữ liệu. Thời lượng pin dài cùng hiệu năng mạnh mẽ giúp sản phẩm trở thành lựa chọn lý tưởng cho người thường xuyên di chuyển và làm việc chuyên nghiệp.', 42990000, 8, 'lenovo-thinkpad-x1-carbon.jpg', 0, '2026-04-03 00:00:00', '2026-04-28 19:59:42', '2026-04-28 19:59:42'),
('SP004', 'Dell XPS 15 9530', 'DM004', 'H004', 'NCC001', 'Dell XPS 15 9530 là mẫu laptop cao cấp dành cho người dùng sáng tạo nội dung với thiết kế sang trọng và viền màn hình siêu mỏng đặc trưng. Máy sở hữu màn hình độ phân giải cao, màu sắc chính xác, phù hợp cho chỉnh sửa ảnh, dựng video và thiết kế đồ họa chuyên nghiệp. Cấu hình mạnh mẽ cùng hệ thống âm thanh chất lượng cao mang đến trải nghiệm làm việc và giải trí toàn diện.', 45990000, 7, 'dell-xps-15-9530.jpg', 0, '2026-04-04 00:00:00', '2026-04-28 19:59:42', '2026-04-28 19:59:42'),
('SP005', 'MacBook Pro 14 M3 Pro', 'DM005', 'H005', 'NCC004', 'MacBook Pro 14 M3 Pro là dòng laptop chuyên nghiệp của Apple với chip M3 Pro mạnh mẽ, tối ưu hiệu suất và tiết kiệm điện năng vượt trội. Máy có màn hình Liquid Retina XDR hiển thị cực kỳ sắc nét, độ sáng cao và màu sắc chuẩn xác. Thời lượng pin ấn tượng, hệ điều hành macOS mượt mà cùng khả năng xử lý tác vụ nặng giúp đây là lựa chọn lý tưởng cho lập trình viên, designer và editor chuyên nghiệp.', 52990000, 10, 'macbook-pro-14-m3-pro.jpg', 0, '2026-04-05 00:00:00', '2026-04-28 19:59:42', '2026-04-28 19:59:42'),
('SP006', 'Acer Swift 3 SF314', 'DM002', 'H002', 'NCC005', 'Acer Swift 3 SF314 là mẫu laptop mỏng nhẹ được thiết kế dành cho sinh viên và nhân viên văn phòng thường xuyên di chuyển. Máy có ngoại hình thanh lịch, trọng lượng nhẹ và chất liệu bền bỉ giúp dễ dàng mang theo mỗi ngày. Hiệu năng ổn định đáp ứng tốt các nhu cầu làm việc văn phòng, học online, chỉnh sửa tài liệu và giải trí cơ bản. Thời lượng pin tốt cùng khả năng khởi động nhanh giúp nâng cao hiệu quả sử dụng.', 17990000, 18, 'acer-swift-3-sf314.jpg', 1, '2026-04-06 00:00:00', '2026-04-28 19:59:42', '2026-04-28 19:59:42'),
('SP007', 'HP Spectre x360 14', 'DM003', 'H006', 'NCC002', 'HP Spectre x360 14 là dòng laptop cao cấp 2 trong 1 với khả năng xoay gập 360 độ linh hoạt, cho phép sử dụng như laptop truyền thống hoặc máy tính bảng. Máy sở hữu màn hình cảm ứng sắc nét, thiết kế sang trọng cùng chất liệu cao cấp. Hiệu năng mạnh mẽ và pin tốt giúp thiết bị phù hợp cho công việc sáng tạo, ghi chú, thuyết trình và nhu cầu giải trí hiện đại.', 39990000, 9, 'hp-spectre-x360-14.jpg', 0, '2026-04-07 00:00:00', '2026-04-28 19:59:42', '2026-04-28 19:59:42'),
('SP008', 'MSI Titan GT77', 'DM001', 'H007', 'NCC003', 'MSI Titan GT77 là một trong những mẫu laptop gaming mạnh nhất thị trường với cấu hình cực khủng, bộ xử lý cao cấp và card đồ họa hàng đầu. Máy được trang bị màn hình lớn chất lượng cao, bàn phím cơ cao cấp và hệ thống tản nhiệt hiện đại. Đây là lựa chọn hoàn hảo cho game thủ chuyên nghiệp, streamer hoặc người dùng cần hiệu năng tối đa để xử lý công việc nặng.', 79990000, 5, 'msi-titan-gt77.jpg', 0, '2026-04-08 00:00:00', '2026-04-28 19:59:42', '2026-04-28 19:59:42'),
('SP009', 'Samsung Galaxy Book3 Pro', 'DM003', 'H008', 'NCC004', 'Samsung Galaxy Book3 Pro là mẫu laptop cao cấp nổi bật với màn hình AMOLED rực rỡ, hiển thị màu sắc sống động và độ tương phản cao. Máy có thiết kế siêu mỏng nhẹ, sang trọng và dễ dàng mang theo khi di chuyển. Thiết bị đồng bộ tốt với hệ sinh thái Samsung Galaxy, giúp chia sẻ dữ liệu nhanh chóng và nâng cao trải nghiệm làm việc đa thiết bị.', 32990000, 11, 'samsung-galaxy-book3-pro.jpg', 1, '2026-04-09 00:00:00', '2026-04-28 19:59:42', '2026-04-28 19:59:42'),
('SP010', 'Lenovo IdeaPad Gaming 3', 'DM001', 'H003', 'NCC005', 'Lenovo IdeaPad Gaming 3 là mẫu laptop gaming tầm trung có mức giá hợp lý nhưng vẫn sở hữu hiệu năng tốt cho nhu cầu chơi game phổ biến và làm việc đa nhiệm. Máy có thiết kế trẻ trung, bàn phím LED đẹp mắt và hệ thống tản nhiệt ổn định. Đây là lựa chọn phù hợp cho sinh viên kỹ thuật, game thủ mới bắt đầu hoặc người cần cấu hình mạnh trong tầm giá vừa phải.', 23990000, 15, 'lenovo-ideapad-gaming-3.jpg', 1, '2026-04-10 00:00:00', '2026-04-28 19:59:42', '2026-04-28 19:59:42'),
('SP011', 'HP EliteBook 840 G10', 'DM003', 'H006', 'NCC001', 'HP EliteBook 840 G10 là mẫu laptop doanh nghiệp cao cấp được thiết kế hướng đến môi trường làm việc chuyên nghiệp với độ bền cao và tính bảo mật mạnh mẽ. Máy được trang bị cảm biến vân tay, camera bảo mật và nhiều tính năng hỗ trợ họp trực tuyến. Hiệu năng ổn định, bàn phím thoải mái cùng thời lượng pin dài giúp sản phẩm phù hợp cho quản lý, nhân viên văn phòng và doanh nhân.', 35990000, 10, 'hp-elitebook-840-g10.jpg', 0, '2026-04-11 00:00:00', '2026-04-28 19:59:42', '2026-04-28 19:59:42'),
('SP012', 'MacBook Air 15 M2', 'DM005', 'H005', 'NCC002', 'MacBook Air 15 M2 là mẫu laptop mỏng nhẹ cao cấp của Apple với màn hình lớn 15 inch mang đến không gian làm việc rộng rãi hơn. Chip Apple M2 cho hiệu năng mạnh mẽ, hoạt động mát mẻ và tiết kiệm pin vượt trội. Thiết bị phù hợp cho học tập, làm việc văn phòng, chỉnh sửa nội dung cơ bản và người dùng cần một chiếc máy đẹp, bền và ổn định lâu dài.', 34990000, 14, 'macbook-air-15-m2.jpg', 1, '2026-04-12 00:00:00', '2026-04-28 19:59:42', '2026-04-28 19:59:42'),
('SP013', 'Dell Inspiron 15 3520', 'DM002', 'H004', 'NCC003', 'Dell Inspiron 15 3520 là mẫu laptop phổ thông có màn hình lớn, thiết kế chắc chắn và hiệu năng ổn định trong tầm giá. Máy đáp ứng tốt các nhu cầu học tập, làm việc văn phòng, xem phim và sử dụng hằng ngày. Bàn phím dễ gõ, thời lượng pin khá cùng thương hiệu uy tín giúp sản phẩm được nhiều người dùng lựa chọn.', 16990000, 22, 'dell-inspiron-15-3520.jpg', 1, '2026-04-13 00:00:00', '2026-04-28 19:59:42', '2026-04-28 19:59:42'),
('SP014', 'ASUS Zenbook 14 UX425', 'DM003', 'H001', 'NCC004', 'ASUS Zenbook 14 UX425 là mẫu ultrabook cao cấp với thiết kế kim loại nguyên khối sang trọng, trọng lượng nhẹ và độ hoàn thiện cao. Máy có thời lượng pin ấn tượng, hiệu năng tốt cho công việc văn phòng và khả năng di động tuyệt vời. Đây là lựa chọn phù hợp cho doanh nhân, nhân viên văn phòng và người dùng yêu thích sự tinh tế.', 27990000, 13, 'asus-zenbook-14-ux425.jpg', 1, '2026-04-14 00:00:00', '2026-04-28 19:59:42', '2026-04-28 19:59:42'),
('SP015', 'MSI Modern 15 B12M', 'DM002', 'H007', 'NCC005', 'MSI Modern 15 B12M là mẫu laptop văn phòng hiện đại với thiết kế trẻ trung, màn hình lớn và cấu hình khá trong phân khúc tầm trung. Máy xử lý tốt các nhu cầu làm việc văn phòng, học online, chỉnh sửa tài liệu và giải trí nhẹ nhàng. Sản phẩm phù hợp cho sinh viên, nhân viên văn phòng và người dùng cần laptop ổn định với giá hợp lý.', 18990000, 17, 'msi-modern-15-b12m.jpg', 1, '2026-04-15 00:00:00', '2026-04-28 19:59:42', '2026-04-28 19:59:42'),
('SP016', 'ASUS VivoBook 15 X1502', 'DM002', 'H001', 'NCC001', 'ASUS VivoBook 15 X1502 là mẫu laptop phổ thông với thiết kế hiện đại, màn hình Full HD 15.6 inch sắc nét và hiệu năng ổn định phục vụ tốt nhu cầu học tập, làm việc văn phòng hàng ngày. Máy được trang bị bộ vi xử lý Intel thế hệ mới, RAM đủ dùng cho đa nhiệm và ổ SSD giúp khởi động nhanh. Thiết kế mỏng nhẹ, bàn phím thoải mái cùng thời lượng pin ổn định giúp người dùng làm việc liên tục cả ngày mà không lo hết pin. Đây là lựa chọn lý tưởng cho sinh viên và nhân viên văn phòng tìm kiếm một chiếc laptop đáng tin cậy với mức giá phải chăng.', 13990000, 25, 'asus-vivobook-15-x1502.jpg', 1, '2026-04-16 00:00:00', '2026-04-29 03:49:11', '2026-04-29 03:49:11'),
('SP017', 'Acer Nitro 5 AN515', 'DM001', 'H002', 'NCC002', 'Acer Nitro 5 AN515 là dòng laptop gaming tầm trung được đông đảo game thủ ưa chuộng nhờ hiệu năng mạnh mẽ với mức giá hợp lý. Máy được trang bị CPU và GPU đủ mạnh để xử lý các tựa game phổ biến ở cài đặt cao, màn hình tần số quét cao mang lại hình ảnh mượt mà và phản hồi nhanh. Hệ thống tản nhiệt kép hiệu quả giúp máy duy trì hiệu suất ổn định trong các phiên chơi game dài. Bàn phím LED đỏ đặc trưng, cổng kết nối đa dạng và thiết kế gaming trẻ trung tạo nên sức hút riêng cho sản phẩm này.', 22990000, 16, 'acer-nitro-5-an515.jpg', 1, '2026-04-17 00:00:00', '2026-04-29 03:49:11', '2026-04-29 03:49:11'),
('SP018', 'Lenovo Yoga 7i 14', 'DM004', 'H003', 'NCC003', 'Lenovo Yoga 7i 14 là dòng laptop 2 trong 1 cao cấp với khả năng xoay gập 360 độ linh hoạt, cho phép sử dụng ở nhiều chế độ khác nhau như laptop, lều, giá đỡ và máy tính bảng. Màn hình cảm ứng IPS sắc nét với độ phân giải cao tái hiện màu sắc chính xác và góc nhìn rộng. Chip Intel Core thế hệ mới mang lại hiệu năng mạnh mẽ trong khi vẫn tiết kiệm điện năng đáng kể. Thiết kế kim loại sang trọng, bàn phím có đèn nền và thời lượng pin tốt giúp sản phẩm phù hợp cho người dùng sáng tạo và chuyên nghiệp.', 29990000, 11, 'lenovo-yoga-7i-14.jpg', 0, '2026-04-18 00:00:00', '2026-04-29 03:49:11', '2026-04-29 03:49:11'),
('SP019', 'Dell G15 Gaming 5530', 'DM001', 'H004', 'NCC004', 'Dell G15 Gaming 5530 là laptop gaming với thiết kế chắc chắn và hiệu năng vượt trội trong phân khúc tầm trung. Máy được trang bị bộ vi xử lý Intel Core thế hệ 13 kết hợp card đồ họa NVIDIA GeForce RTX mạnh mẽ, cho phép chạy mượt các tựa game AAA phổ biến. Màn hình 15.6 inch Full HD với tần số quét 165Hz mang lại hình ảnh cực kỳ mượt mà. Hệ thống tản nhiệt Alienware-inspired giúp kiểm soát nhiệt độ hiệu quả. Bàn phím có đèn nền RGB 4 vùng độc lập giúp cá nhân hóa trải nghiệm gaming.', 28990000, 14, 'dell-g15-gaming-5530.jpg', 0, '2026-04-19 00:00:00', '2026-04-29 03:49:11', '2026-04-29 03:49:11'),
('SP020', 'Apple MacBook Pro 16 M3 Max', 'DM005', 'H005', 'NCC005', 'MacBook Pro 16 M3 Max là đỉnh cao của dòng MacBook Pro với chip Apple M3 Max sở hữu CPU 16 nhân và GPU lên đến 40 nhân, mang lại hiệu năng xử lý và đồ họa vượt trội so với bất kỳ laptop nào trên thị trường. Màn hình Liquid Retina XDR 16 inch với độ sáng cực cao, ProMotion 120Hz và hỗ trợ HDR giúp hiển thị nội dung sáng tạo một cách hoàn hảo. Thời lượng pin lên đến 22 giờ làm việc liên tục là con số ấn tượng cho một laptop chuyên nghiệp. Hệ thống loa 6 lớp và micro array chất lượng cao giúp trải nghiệm âm thanh và gọi video tuyệt vời.', 89990000, 6, 'macbook-pro-16-m3-max.jpg', 0, '2026-04-20 00:00:00', '2026-04-29 03:49:11', '2026-04-29 03:49:11'),
('SP021', 'HP Pavilion 15', 'DM002', 'H006', 'NCC001', 'HP Pavilion 15 là mẫu laptop phổ thông được thiết kế hướng đến người dùng phổ thông với nhu cầu học tập, làm việc văn phòng và giải trí hàng ngày. Màn hình Full HD 15.6 inch cho hình ảnh sắc nét, màu sắc trung thực phù hợp xem phim và làm việc với tài liệu. Cấu hình Intel Core thế hệ mới cùng RAM đủ dùng đảm bảo khả năng đa nhiệm tốt. Thiết kế hiện đại với viền màn hình mỏng, bàn phím thoải mái và loa âm thanh tốt tạo nên trải nghiệm sử dụng dễ chịu mỗi ngày.', 15990000, 20, 'hp-pavilion-15.jpg', 1, '2026-04-21 00:00:00', '2026-04-29 03:49:11', '2026-04-29 03:49:11'),
('SP022', 'MSI GF63 Thin', 'DM001', 'H007', 'NCC002', 'MSI GF63 Thin là laptop gaming mỏng nhẹ với thiết kế thanh lịch, khác biệt so với các laptop gaming thông thường. Dù có ngoại hình gọn nhẹ nhưng máy vẫn sở hữu hiệu năng gaming đáng nể với CPU Intel Core và GPU NVIDIA GeForce đủ mạnh cho các tựa game phổ biến. Màn hình IPS Full HD 144Hz mang lại hình ảnh mượt mà và sắc nét. Bàn phím có đèn nền đỏ đặc trưng của MSI Gaming, cổng kết nối đầy đủ và thời lượng pin ổn định cho việc sử dụng hàng ngày.', 20990000, 18, 'msi-gf63-thin.jpg', 1, '2026-04-22 00:00:00', '2026-04-29 03:49:11', '2026-04-29 03:49:11'),
('SP023', 'Samsung Galaxy Book2 360', 'DM004', 'H008', 'NCC003', 'Samsung Galaxy Book2 360 là laptop 2 trong 1 cao cấp nổi bật với màn hình AMOLED cảm ứng 13.3 inch rực rỡ, hiển thị màu sắc sống động và độ tương phản cực cao. Khả năng xoay gập 360 độ giúp sử dụng linh hoạt trong nhiều tình huống khác nhau. Hỗ trợ bút S Pen tích hợp giúp ghi chú, phác thảo và ký tài liệu trực tiếp trên màn hình. Máy tích hợp tốt với hệ sinh thái Samsung Galaxy, cho phép chia sẻ màn hình, file và thông báo liền mạch giữa các thiết bị Samsung.', 26990000, 9, 'samsung-galaxy-book2-360.jpg', 0, '2026-04-23 00:00:00', '2026-04-29 03:49:11', '2026-04-29 03:49:11'),
('SP024', 'ASUS ROG Zephyrus G14', 'DM001', 'H001', 'NCC004', 'ASUS ROG Zephyrus G14 là laptop gaming cao cấp nhỏ gọn nhất trong dòng ROG, được trang bị chip AMD Ryzen 9 mạnh mẽ kết hợp GPU NVIDIA GeForce RTX cao cấp. Màn hình 14 inch QHD với tần số quét 165Hz cho hình ảnh cực kỳ sắc nét và mượt mà. Thiết kế AniMe Matrix LED độc đáo ở nắp máy cho phép hiển thị animation và thông tin tùy chỉnh. Hệ thống tản nhiệt ROG Intelligent Cooling hiệu quả giúp duy trì nhiệt độ thấp ngay cả khi tải nặng, trong khi thời lượng pin vẫn ấn tượng cho một gaming laptop.', 44990000, 8, 'asus-rog-zephyrus-g14.jpg', 0, '2026-04-24 00:00:00', '2026-04-29 03:49:11', '2026-04-29 03:49:11'),
('SP025', 'Acer Predator Helios 300', 'DM001', 'H002', 'NCC005', 'Acer Predator Helios 300 là laptop gaming hiệu năng cao được thiết kế riêng cho game thủ nghiêm túc. Máy được trang bị bộ vi xử lý Intel Core i7 thế hệ mới kết hợp card đồ họa NVIDIA GeForce RTX mạnh mẽ, đảm bảo chạy mượt mọi tựa game AAA ở cài đặt ultra. Màn hình IPS Full HD 144Hz hay QHD 165Hz cho hình ảnh cực kỳ mượt mà. Hệ thống tản nhiệt AeroBlade 3D Fan và ống dẫn nhiệt kép giúp kiểm soát nhiệt độ tốt. Bàn phím có đèn nền RGB theo từng phím và thiết kế gaming mạnh mẽ tạo nên đẳng cấp riêng.', 35990000, 10, 'acer-predator-helios-300.jpg', 0, '2026-04-25 00:00:00', '2026-04-29 03:49:11', '2026-04-29 03:49:11'),
('SP026', 'Lenovo Legion 5 Pro', 'DM001', 'H003', 'NCC001', 'Lenovo Legion 5 Pro là laptop gaming cao cấp nổi bật với màn hình QHD 16 inch tần số quét 165Hz cho trải nghiệm hình ảnh cực kỳ ấn tượng. Máy được trang bị AMD Ryzen 7 hay Intel Core i7 thế hệ mới kết hợp GPU NVIDIA GeForce RTX mạnh mẽ. Hệ thống tản nhiệt Legion Coldfront với 4 quạt và nhiều ống dẫn nhiệt giúp duy trì hiệu suất cao liên tục. Bàn phím TrueStrike có đèn nền RGB per-key và độ nảy phím tốt, cổng kết nối đầy đủ bao gồm USB-C, HDMI 2.1 và nhiều cổng USB-A tiện lợi.', 41990000, 7, 'lenovo-legion-5-pro.jpg', 0, '2026-04-26 00:00:00', '2026-04-29 03:49:11', '2026-04-29 03:49:11'),
('SP027', 'Dell Latitude 5540', 'DM003', 'H004', 'NCC002', 'Dell Latitude 5540 là laptop doanh nghiệp cao cấp được xây dựng với tiêu chuẩn bảo mật và độ bền vượt trội. Máy đạt chứng nhận MIL-STD-810H về khả năng chịu đựng trong điều kiện khắc nghiệt. Tích hợp nhiều lớp bảo mật như TPM 2.0, camera bảo mật, cảm biến vân tay và tùy chọn đầu đọc thẻ thông minh. Bộ vi xử lý Intel Core vPro thế hệ 13 cho phép quản lý từ xa và bảo mật phần cứng cấp doanh nghiệp. Màn hình IPS chống chói, bàn phím kháng nước và pin dung lượng lớn giúp làm việc hiệu quả cả ngày.', 33990000, 12, 'dell-latitude-5540.jpg', 0, '2026-04-27 00:00:00', '2026-04-29 03:49:11', '2026-04-29 03:49:11'),
('SP028', 'HP Envy x360 15', 'DM004', 'H006', 'NCC003', 'HP Envy x360 15 là laptop 2 trong 1 cao cấp với màn hình cảm ứng OLED 15.6 inch tuyệt đẹp, hiển thị màu sắc cực kỳ sống động với độ tương phản vô cực. Khả năng xoay gập 360 độ linh hoạt cho phép sử dụng ở nhiều tư thế khác nhau. Máy được trang bị AMD Ryzen hay Intel Core thế hệ mới với hiệu năng mạnh mẽ. Hỗ trợ bút cảm ứng MPP 2.0 để ghi chú và sáng tạo trực tiếp trên màn hình. Thiết kế kim loại cao cấp, loa Bang & Olufsen chất lượng cao và thời lượng pin ấn tượng hoàn thiện trải nghiệm cao cấp.', 31990000, 11, 'hp-envy-x360-15.jpg', 0, '2026-04-28 00:00:00', '2026-04-29 03:49:11', '2026-04-29 03:49:11'),
('SP029', 'MSI Prestige 14 Evo', 'DM003', 'H007', 'NCC004', 'MSI Prestige 14 Evo là laptop doanh nhân siêu mỏng nhẹ đạt chứng nhận Intel Evo Platform, đảm bảo hiệu năng mạnh mẽ, kết nối nhanh và trải nghiệm người dùng tối ưu. Máy có trọng lượng chỉ khoảng 1.29kg và độ mỏng ấn tượng, dễ dàng mang theo khi di chuyển. Màn hình 14 inch với màu sắc chính xác đạt 100% sRGB phù hợp cho công việc sáng tạo. Hỗ trợ sạc nhanh USB-C, kết nối Thunderbolt 4 và Wi-Fi 6E tốc độ cao. Bàn phím thoải mái, cảm biến vân tay tích hợp và pin lâu giúp làm việc hiệu quả suốt ngày dài.', 25990000, 13, 'msi-prestige-14-evo.jpg', 0, '2026-04-29 00:00:00', '2026-04-29 03:49:11', '2026-04-29 03:49:11'),
('SP030', 'ASUS ExpertBook B9', 'DM003', 'H001', 'NCC005', 'ASUS ExpertBook B9 là laptop doanh nghiệp siêu nhẹ hàng đầu thế giới với trọng lượng chỉ khoảng 880g, thuộc hàng nhẹ nhất trong phân khúc laptop 14 inch. Máy đạt chứng nhận độ bền MIL-STD-810H với khả năng chịu đựng va đập, nhiệt độ cực đoan và độ ẩm cao. Tích hợp bảo mật doanh nghiệp toàn diện gồm TPM 2.0, camera IR nhận diện khuôn mặt, cảm biến vân tay và khe khóa Kensington. Thời lượng pin lên đến 16 giờ cùng hỗ trợ sạc nhanh USB-C giúp làm việc liên tục khi di chuyển. Màn hình chống chói, bàn phím kháng nước và cổng kết nối đa dạng hoàn thiện laptop doanh nghiệp đỉnh cao này.', 48990000, 6, 'asus-expertbook-b9.jpg', 0, '2026-04-29 00:00:00', '2026-04-29 03:49:11', '2026-04-29 03:49:11');

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
('VC0000001', 'SUMMER2026', 50000, '2026-05-01 00:00:00', '2026-05-31 00:00:00', 100, '2026-04-28 20:18:56', '2026-04-28 20:18:56'),
('VC0000002', 'WELCOME10', 100000, '2026-04-01 00:00:00', '2026-06-30 00:00:00', 50, '2026-04-28 20:18:56', '2026-04-28 20:18:56'),
('VC0000003', 'STUDENT20', 200000, '2026-04-15 00:00:00', '2026-07-15 00:00:00', 200, '2026-04-28 20:18:56', '2026-04-28 20:18:56'),
('VC0000004', 'FLASH50', 500000, '2026-04-20 00:00:00', '2026-04-30 00:00:00', 20, '2026-04-28 20:18:56', '2026-04-28 20:18:56'),
('VC0000005', 'BIRTHDAY30', 300000, '2026-04-26 00:00:00', '2026-05-26 00:00:00', 30, '2026-04-28 20:18:56', '2026-04-28 20:18:56'),
('VC0000006', 'NEWUSER15', 150000, '2026-04-01 00:00:00', '2026-12-31 00:00:00', 500, '2026-04-28 20:18:56', '2026-04-28 20:18:56'),
('VC0000007', 'GAMING100', 1000000, '2026-05-01 00:00:00', '2026-05-15 00:00:00', 10, '2026-04-28 20:18:56', '2026-04-28 20:18:56'),
('VC0000008', 'FREESHIP', 30000, '2026-04-26 00:00:00', '2026-06-26 00:00:00', 1000, '2026-04-28 20:18:56', '2026-04-28 20:18:56'),
('VC0000009', 'VIP500', 500000, '2026-04-26 00:00:00', '2026-07-26 00:00:00', 15, '2026-04-28 20:18:56', '2026-04-28 20:18:56'),
('VC0000010', 'ENDYEAR', 2000000, '2026-12-01 00:00:00', '2026-12-31 00:00:00', 5, '2026-04-28 20:18:56', '2026-04-28 20:18:56');

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
  ADD KEY `MaVC` (`MaVC`),
  ADD KEY `fk_donhang_sanpham` (`MaSP`);

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
  ADD CONSTRAINT `donhangs_ibfk_2` FOREIGN KEY (`MaVC`) REFERENCES `vouchers` (`MaVC`),
  ADD CONSTRAINT `fk_donhang_sanpham` FOREIGN KEY (`MaSP`) REFERENCES `sanphams` (`MaSP`) ON DELETE SET NULL ON UPDATE CASCADE;

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
