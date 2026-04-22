-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: mysql:3306
-- Thời gian đã tạo: Th4 22, 2026 lúc 01:42 PM
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
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `sanphams`
--
ALTER TABLE `sanphams`
  ADD PRIMARY KEY (`MaSP`),
  ADD KEY `MaDM` (`MaDM`),
  ADD KEY `MaHang` (`MaHang`),
  ADD KEY `MaNCC` (`MaNCC`);

--
-- Ràng buộc đối với các bảng kết xuất
--

--
-- Ràng buộc cho bảng `sanphams`
--
ALTER TABLE `sanphams`
  ADD CONSTRAINT `sanphams_ibfk_1` FOREIGN KEY (`MaDM`) REFERENCES `danhmucs` (`MaDM`),
  ADD CONSTRAINT `sanphams_ibfk_2` FOREIGN KEY (`MaHang`) REFERENCES `hangsanxuats` (`MaHang`),
  ADD CONSTRAINT `sanphams_ibfk_3` FOREIGN KEY (`MaNCC`) REFERENCES `nhacungcaps` (`MaNCC`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
