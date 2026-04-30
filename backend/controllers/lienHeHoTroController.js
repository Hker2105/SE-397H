import { Sequelize, where } from "sequelize";
const {Op} = Sequelize;
import db from "../models";
export async function getLienHeHoTros(req, res){
    try {
        const {page = 1, limit} = req.query;
        const pageSize = limit ? parseInt(limit) : 10;
        const offset = (page - 1) * pageSize;
        const lienHeHoTros = await db.LIENHEHOTRO.findAll({ limit: pageSize, offset });
        res.status(200).json({
            message: 'Lấy danh sách liên hệ thành công',
            data: lienHeHoTros
        });
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function getLienHeHoTroById(req, res){
     try {
        const { id } = req.params;
        const lienHeHoTro = await db.LIENHEHOTRO.findByPk(id);
        if(!lienHeHoTro) {
            return res.status(404).json({ message: 'Không tìm thấy liên hệ này' })
        }
        res.status(200).json({
            message: 'Lấy thông tin liên hệ thành công',
            data: lienHeHoTro
        });
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function insertLienHeHoTro(req, res){
    try {
        const data = Array.isArray(req.body) ? req.body : [req.body]
        
        for (const item of data) {
            const { MaLH, MaKhachHang, TieuDe, NoiDung, NgayGui, TrangThai} = item
            
            await db.sequelize.query(
                `INSERT INTO lienhehotros (MaLH, MaKhachHang, TieuDe, NoiDung, NgayGui, TrangThai, createdAt, updatedAt) 
                VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
                {
                    replacements: [MaLH, MaKhachHang, TieuDe, NoiDung, NgayGui, TrangThai],
                    type: db.Sequelize.QueryTypes.INSERT
                }
            )
        }

        res.status(201).json({
            message: 'Thêm mới liên hệ thành công'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Xảy ra lỗi khi thêm liên hệ',
            error: error.message
        })
    }
}

export async function deleteLienHeHoTro(req, res){
       try {
        const { id } = req.params;
        const deleted = await db.LIENHEHOTRO.destroy({ where: { MaLH: id } });
        if(deleted) {
            return res.status(200).json({ message: 'Xoá liên hệ thành công' })
        } else {
            return res.status(404).json({ message: 'Liên hệ không tìm thấy' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}
