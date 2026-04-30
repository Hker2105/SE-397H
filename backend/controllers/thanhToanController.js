import { Sequelize, where } from "sequelize";
const {Op} = Sequelize;
import db from "../models";
export async function getThanhToans(req, res){
    try {
        const {page = 1, limit} = req.query;
        const pageSize = limit ? parseInt(limit) : 10;
        const offset = (page - 1) * pageSize;
        const thanhToans = await db.THANHTOAN.findAll({ limit: pageSize, offset });
        res.status(200).json({
            message: 'Lấy danh sách thanh toán thành công',
            data: thanhToans
        });
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function getThanhToanById(req, res){
     try {
        const { id } = req.params;
        const thanhToan = await db.THANHTOAN.findByPk(id);
        if(!thanhToan) {
            return res.status(404).json({ message: 'Không tìm thấy thanh toán này' })
        }
        res.status(200).json({
            message: 'Lấy thông tin thanh toán thành công',
            data: thanhToan
        });
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function insertThanhToan(req, res){
    try {
        const data = Array.isArray(req.body) ? req.body : [req.body]
        
        for (const item of data) {
            const { MaTT, MaDH, HinhThuc, NgayThanhToan, TrangThai} = item
            
            await db.sequelize.query(
                `INSERT INTO donhangs (MaTT, MaDH, HinhThuc, NgayThanhToan, createdAt, updatedAt) 
                VALUES (?, ?, ?, ?, NOW(), NOW())`,
                {
                    replacements: [MaTT, MaDH, HinhThuc, NgayThanhToan, TrangThai],
                    type: db.Sequelize.QueryTypes.INSERT
                }
            )
        }

        res.status(201).json({
            message: 'Thêm mới thanh toán thành công'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Xảy ra lỗi khi thêm thanh toán',
            error: error.message
        })
    }
}

