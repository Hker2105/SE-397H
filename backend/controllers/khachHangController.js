import { Sequelize, where } from "sequelize"
const {Op} = Sequelize;
import db from "../models"
import insertKhachHangRequest from "../dtos/requests/khachHang/insertkhachHangRequests";
import updatekhachHangRequest from "../dtos/requests/khachHang/updatekhachHangRequests";
import khachHangResponses from "../dtos/responese/khachHang/khachHangResponese";
import argon2 from 'argon2';

export async function getKhachHangs(req, res){
    try {
        const {search = '', page = 1, limit} = req.query;
        const pageSize = limit ? parseInt(limit) : 10;
        const offset = (page - 1) * pageSize;
        let whereClause = {};
        if (search.trim() !== '') {
            whereClause = {
                [Op.or]: [
                    {HoTen: {[Op.like]: `%${search}%`}},
                    {Email: {[Op.like]: `%${search}%`}}
                ]
            }
        }
        const [khachHangs, totalKhachHangs] = await Promise.all([
            db.KHACHHANG.findAll({
                where: whereClause,
                limit: pageSize,
                offset: offset,
                attributes: { exclude: ['MatKhau'] }
            }),
            db.KHACHHANG.count({ where: whereClause })
        ]);
        res.status(200).json({
            message: 'Lấy danh sách khách hàng thành công',
            data: khachHangs,
            currentPage: parseInt(page, 10),
            totalPages: Math.ceil(totalKhachHangs / pageSize),
            totalKhachHangs
        });
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function getKhachHangById(req, res){
    try {
        const { id } = req.params;
        const khachHang = await db.KHACHHANG.findByPk(id, {
            attributes: { exclude: ['MatKhau'] }
        });
        if(!khachHang) {
            return res.status(404).json({ message: 'Không tìm thấy khách hàng này' })
        }
        res.status(200).json({
            message: 'Lấy thông tin khách hàng thành công',
            data: khachHang
        });
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export const insertKhachHang = async (req, res) => {
    try {
        const data = Array.isArray(req.body) ? req.body : [req.body]
        
        for (const item of data) {
            const existingKhachHang = await db.KHACHHANG.findOne({where: {MaKhachHang: item.MaKhachHang}});
            if (existingKhachHang) {
                return res.status(409).json({
                    message: `Khách hàng ${item.MaKhachHang} đã tồn tại`
                });
            }

            const hashedPassword = await argon2.hash(item.MatKhau)
            const { MaKhachHang, HoTen, Email, SoDienThoai, DiaChi, LoaiTaiKhoan, NgayTao } = item
            const ngayTaoFormatted = new Date(NgayTao).toISOString().split('T')[0]

            await db.sequelize.query(
                `INSERT INTO khachhangs (MaKhachHang, HoTen, Email, MatKhau, SoDienThoai, DiaChi, LoaiTaiKhoan, NgayTao, createdAt, updatedAt) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
                {
                    replacements: [MaKhachHang, HoTen, Email, hashedPassword, SoDienThoai, DiaChi, LoaiTaiKhoan, ngayTaoFormatted],
                    type: db.Sequelize.QueryTypes.INSERT
                }
            )
        }

        return res.status(201).json({
            message: 'Thêm khách hàng thành công'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Xảy ra lỗi',
            error: error.message
        })
    }
}

export async function deleteKhachHang(req, res){
    try {
        const { id } = req.params;
        const deleted = await db.KHACHHANG.destroy({ where: { MaKhachHang: id } });
        if(deleted) {
            return res.status(200).json({ message: 'Xoá khách hàng thành công' })
        } else {
            return res.status(404).json({ message: 'Khách hàng không tìm thấy' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function updateKhachHang(req, res){
    try {
        const { error } = updatekhachHangRequest.validate(req.body)
        if(error) {
            return res.status(400).json({
                message: 'Dữ liệu không hợp lệ',
                error: error.details[0].message
            })
        }
        const id = req.params.id
        const updated = await db.KHACHHANG.update(req.body, { where: { MaKhachHang: id } });
        if(updated[0] > 0) {
            return res.status(200).json({ message: 'Update khách hàng thành công' })
        } else {
            return res.status(404).json({ message: 'Khách hàng không tìm thấy' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function loginKhachHang(req, res){
    try {
        const { Email, MatKhau } = req.body

        const khachHang = await db.KHACHHANG.findOne({ where: { Email } })
        if (!khachHang) {
            return res.status(401).json({ message: 'Email không tồn tại' })
        }

        const isValid = await argon2.verify(khachHang.MatKhau, MatKhau)
        if (!isValid) {
            return res.status(401).json({ message: 'Mật khẩu không đúng' })
        }

        const { MatKhau: _, ...data } = khachHang.toJSON()
        res.status(200).json({
            message: 'Đăng nhập thành công',
            data
        })
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}