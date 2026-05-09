import { Sequelize, where } from "sequelize";
const {Op} = Sequelize;
import db from "../models";
import insertDonHangRequest from '../dtos/requests/donHang/insertDonHangRequests';
export async function getDonHangs(req, res){
    try {
        const {page = 1, limit, maKhachHang, MaKhachHang} = req.query;
        const pageSize = limit ? parseInt(limit) : 10;
        const currentPage = parseInt(page, 10);
        const offset = (currentPage - 1) * pageSize;
        const customerId = maKhachHang || MaKhachHang;
        const whereClause = customerId ? { MaKhachHang: customerId } : {};

        const [donHangs, totalDonHangs] = await Promise.all([
            db.DONHANG.findAll({ where: whereClause, limit: pageSize, offset }),
            db.DONHANG.count({ where: whereClause })
        ]);

        res.status(200).json({
            message: 'Lấy danh sách đơn hàng thành công',
            data: donHangs,
            currentPage,
            totalPages: Math.ceil(totalDonHangs / pageSize),
            totalDonHangs
        });
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function getDonHangById(req, res){
     try {
        const { id } = req.params;
        const donHang = await db.DONHANG.findByPk(id);
        if(!donHang) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng này' })
        }
        res.status(200).json({
            message: 'Lấy thông tin đơn hàng thành công',
            data: donHang
        });
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function insertDonHang(req, res){
    try {
        const data = Array.isArray(req.body) ? req.body : [req.body]
        
        for (const item of data) {
            const { MaDH, MaKhachHang, MaVC, SoLuong, DonGia, NgayDat, TongTien, TinhTrang, GhiChu } = item
            const ngayDatFormatted = new Date(NgayDat).toISOString().split('T')[0]
            const maVCValue = MaVC && MaVC.trim() !== '' ? MaVC : null 
            
            await db.sequelize.query(
                `INSERT INTO donhangs (MaDH, MaKhachHang, MaVC, SoLuong, DonGia, NgayDat, TongTien, TinhTrang, GhiChu, createdAt, updatedAt) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
                {
                    replacements: [MaDH, MaKhachHang, maVCValue, SoLuong, DonGia, ngayDatFormatted, TongTien, TinhTrang, GhiChu],
                    type: db.Sequelize.QueryTypes.INSERT
                }
            )
        }

        res.status(201).json({
            message: 'Thêm mới đơn hàng thành công'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Xảy ra lỗi khi thêm đơn hàng',
            error: error.message
        })
    }
}

export async function deleteDonHang(req, res){
       try {
        const { id } = req.params;
        const deleted = await db.DONHANG.destroy({ where: { MaDH: id } });
        if(deleted) {
            return res.status(200).json({ message: 'Xoá đơn hàng thành công' })
        } else {
            return res.status(404).json({ message: 'Đơn hàng không tìm thấy' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function updateDonHang(req, res){
    try {
        const { id } = req.params;
        const updated = await db.DONHANG.update(req.body, { where: { MaDH: id } });
        if(updated[0] > 0) {
            return res.status(200).json({ message: 'Update đơn hàng thành công' })
        } else {
            return res.status(404).json({ message: 'Đơn hàng không tìm thấy' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}