import { Sequelize, where } from "sequelize";
const {Op} = Sequelize;
import db from "../models";
export async function getDanhGias(req, res){
    try {
        const {page = 1, limit} = req.query;
        const pageSize = limit ? parseInt(limit) : 10;
        const offset = (page - 1) * pageSize;
        const danhGias = await db.DANHGIA.findAll({ limit: pageSize, offset });
        res.status(200).json({
            message: 'Lấy danh sách đánh giá thành công',
            data: danhGias
        });
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function getDanhGiaById(req, res){
     try {
        const { id } = req.params;
        const danhGia = await db.DANHGIA.findByPk(id);
        if(!danhGia) {
            return res.status(404).json({ message: 'Không tìm thấy đánh giá này' })
        }
        res.status(200).json({
            message: 'Lấy thông tin đánh giá thành công',
            data: danhGia
        });
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function insertDanhGia(req, res){
    try {
        const data = Array.isArray(req.body) ? req.body : [req.body]
        
        for (const item of data) {
            const {MaDG, MaKhachHang, MaSP, NoiDung, Diem, NgayDG} = item
            
            await db.sequelize.query(
                `INSERT INTO lienhehotros (MaDG, MaKhachHang, MaSP, NoiDung, Diem, NgayDG, createdAt, updatedAt) 
                VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
                {
                    replacements: [MaDG, MaKhachHang, MaSP, NoiDung, Diem, NgayDG],
                    type: db.Sequelize.QueryTypes.INSERT
                }
            )
        }

        res.status(201).json({
            message: 'Thêm mới đánh giá thành công'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Xảy ra lỗi khi thêm đánh giá',
            error: error.message
        })
    }
}

export async function deleteDanhGia(req, res){
       try {
        const { id } = req.params;
        const deleted = await db.DANHGIA.destroy({ where: { MaDG: id } });
        if(deleted) {
            return res.status(200).json({ message: 'Xoá đánh giá thành công' })
        } else {
            return res.status(404).json({ message: 'Đánh giá không tìm thấy' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}
