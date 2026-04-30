import { Sequelize, where } from "sequelize";
const {Op} = Sequelize;
import db from "../models";
export async function getGioHangs(req, res){
    try {
        const {page = 1, limit} = req.query;
        const pageSize = limit ? parseInt(limit) : 10;
        const offset = (page - 1) * pageSize;
        const gioHangs = await db.GIOHANG.findAll({ limit: pageSize, offset });
        res.status(200).json({
            message: 'Lấy danh sách giỏ hàng thành công',
            data: gioHangs
        });
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function getGioHangById(req, res){
     try {
        const { id } = req.params;
        const gioHang = await db.GIOHANG.findByPk(id);
        if(!gioHang) {
            return res.status(404).json({ message: 'Không tìm thấy giỏ hàng này' })
        }
        res.status(200).json({
            message: 'Lấy thông tin giỏ hàng thành công',
            data: gioHang
        });
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function insertGioHang(req, res){
    try {
        const data = Array.isArray(req.body) ? req.body : [req.body]
        
        for (const item of data) {
            const { MaGH, MaKhachHang, MaSP, NgayTao, SoLuong} = item
            
            await db.sequelize.query(
                `INSERT INTO giohangs (MaGH, MaKhachHang, MaSP, NgayTao, SoLuong, createdAt, updatedAt) 
                VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
                {
                    replacements: [MaGH, MaKhachHang, MaSP, NgayTao, SoLuong],
                    type: db.Sequelize.QueryTypes.INSERT
                }
            )
        }

        res.status(201).json({
            message: 'Thêm mới giỏ hàng thành công'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Xảy ra lỗi khi thêm giỏ hàng',
            error: error.message
        })
    }
}

export async function deleteGioHang(req, res){
       try {
        const { id } = req.params;
        const deleted = await db.GIOHANG.destroy({ where: { MaGH: id } });
        if(deleted) {
            return res.status(200).json({ message: 'Xoá giỏ hàng thành công' })
        } else {
            return res.status(404).json({ message: 'Giỏ hàng không tìm thấy' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function updateGioHang(req, res){
    try {
        const { id } = req.params;
        const updated = await db.GIOHANG.update(req.body, { where: { MaGH: id } });
        if(updated[0] > 0) {
            return res.status(200).json({ message: 'Update giỏ hàng thành công' })
        } else {
            return res.status(404).json({ message: 'Giỏ hàng không tìm thấy' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}