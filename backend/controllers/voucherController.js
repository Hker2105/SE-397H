import { Sequelize } from "sequelize"
const {Op} = Sequelize;
import db from "../models"
import insertVoucherRequest from "../dtos/requests/voucher/insertVoucherRequests"
import updateVoucherRequest from "../dtos/requests/voucher/updateVoucherRequests"

export async function getVouchers(req, res){
    try {
        const {search = '', page = 1} = req.query;
        const pageSize = 10;
        const offset = (page - 1) * pageSize;
        let whereClause = {};
        if (search.trim() !== '') {
            whereClause = {
                [Op.or]: [
                    {MaVoucher: {[Op.like]: `%${search}%`}}
                ]
            }
        }
        const [vouchers, totalVouchers] = await Promise.all([
            db.VOUCHER.findAll({
                where: whereClause,
                limit: pageSize,
                offset: offset
            }),
            db.VOUCHER.count({ where: whereClause })
        ]);
        res.status(200).json({
            message: 'Lấy danh sách voucher thành công',
            data: vouchers,
            currentPage: parseInt(page, 10),
            totalPages: Math.ceil(totalVouchers / pageSize),
            totalVouchers
        });
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function getVoucherById(req, res){
    try {
        const { id } = req.params;
        const voucher = await db.VOUCHER.findByPk(id);
        if(!voucher) {
            return res.status(404).json({ message: 'Không tìm thấy voucher này' })
        }
        res.status(200).json({
            message: 'Lấy thông tin voucher thành công',
            data: voucher
        });
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function insertVoucher(req, res){
    try {
        const { error } = insertVoucherRequest.validate(req.body)
        if(error) {
            return res.status(400).json({
                message: 'Dữ liệu không hợp lệ',
                error: error.details[0].message
            })
        }

        const data = Array.isArray(req.body) ? req.body : [req.body]
        
        for (const item of data) {
            const { MaVC, MaVoucher, GiaTri, NgayBD, NgayKT, SoLuong } = item
            const ngayBDFormatted = new Date(NgayBD).toISOString().split('T')[0]
            const ngayKTFormatted = new Date(NgayKT).toISOString().split('T')[0]
            await db.sequelize.query(
                `INSERT INTO vouchers (MaVC, MaVoucher, GiaTri, NgayBD, NgayKT, SoLuong, createdAt, updatedAt) 
                 VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
                {
                    replacements: [MaVC, MaVoucher, GiaTri, ngayBDFormatted, ngayKTFormatted, SoLuong],
                    type: db.Sequelize.QueryTypes.INSERT
                }
            )
        }

        res.status(201).json({
            message: 'Thêm mới voucher thành công'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Xảy ra lỗi khi thêm voucher',
            error: error.message
        })
    }
}

export async function deleteVoucher(req, res){
    try {
        const { id } = req.params;
        const deleted = await db.VOUCHER.destroy({ where: { MaVC: id } });
        if(deleted) {
            return res.status(200).json({ message: 'Xoá voucher thành công' })
        } else {
            return res.status(404).json({ message: 'Voucher không tìm thấy' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function updateVoucher(req, res){
    try {
        const { error } = updateVoucherRequest.validate(req.body)
        if(error) {
            return res.status(400).json({
                message: 'Dữ liệu không hợp lệ',
                error: error.details[0].message
            })
        }
        const id = req.params.id
        const updated = await db.VOUCHER.update(req.body, { where: { MaVC: id } });
        if(updated[0] > 0) {
            return res.status(200).json({ message: 'Update voucher thành công' })
        } else {
            return res.status(404).json({ message: 'Voucher không tìm thấy' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}