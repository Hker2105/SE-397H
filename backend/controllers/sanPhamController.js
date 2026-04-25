import { Sequelize, where } from "sequelize"
const {Op} = Sequelize;
import db from "../models"
import insertsanPhamRequest from '../dtos/requests/sanPham/insertsanPhamRequests'

export async function getsanPham(req, res){
    //const sanPhams = await db.SANPHAM.findAll()
    const {search ='', page = 1} = req.query;
    const pageSize = 10;
    const offset = (page - 1) * pageSize;
    let whereClause = {};
    if (search.trim() !== '') {
        whereClause = {
            [Op.or]: [
                {TenSP: {[Op.like]: `%${search}%`}},
                {MoTa: {[Op.like]: `%${search}%`}}
            ]              
        }
    }
    const [sanPhams, totalsanPhams] = await Promise.all([
        db.SANPHAM.findAll({
            where: whereClause,
            limit: pageSize,
            offset: offset
        }),
        db.SANPHAM.count({
            where: whereClause
        })
    ]);
    res.status(200).json({
        message: 'Lấy danh sách sản phẩm thành công',
        data: sanPhams,
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(totalsanPhams / pageSize),
        totalsanPhams
    });
}

export async function getsanPhamById(req, res){
    const {id} = req.params
    const sanPham = await db.SANPHAM.findByPk(id)

    if(!sanPham) {
        return res.status(400).json({
            message: 'Không tìm thấy sản phẩm'
        });
    }
    res.status(200).json({
        message: 'Lấy thông tin sản phẩm thành công',
        data: sanPham
    })
}

export async function insertsanPham(req, res){
    // const {error} = insertsanPhamRequest.validate(req.body)
    // if(error) {
    //     res.status(400).json({
    //         message: 'Xảy ra lỗi khi thêm sản phẩm',
    //         error: error.details[0]?.message 
    //     });
    // }
    // console.log(JSON.stringify(req.body))
    try {
        const data = Array.isArray(req.body) ? req.body : [req.body]
        
        for (const item of data) {
            const { MaSP, TenSP, MaDM, MaHang, MaNCC, MoTa, Gia, SoLuongTon, HinhAnh, UuDaiSV, NgayThem } = item
            await db.sequelize.query(
                `INSERT INTO sanphams (MaSP, TenSP, MaDM, MaHang, MaNCC, MoTa, Gia, SoLuongTon, HinhAnh, UuDaiSV, NgayThem, createdAt, updatedAt) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
                {
                    replacements: [MaSP, TenSP, MaDM, MaHang, MaNCC, MoTa, Gia, SoLuongTon, HinhAnh, UuDaiSV, NgayThem],
                    type: db.Sequelize.QueryTypes.INSERT
                }
            )
        }

        res.status(201).json({
            message: 'Thêm mới sản phẩm thành công'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Xảy ra lỗi khi thêm sản phẩm',
            error: error.message
        })
    }
}

export async function deletesanPham(req, res){
    const { id } = req.params;
        const deleted = await db.SANPHAM.destroy({ where: { id } });
        if(deleted) {
           return res.status(200).json({ message: 'Xoá Sản phẩm thành công' })
        } else {
            return res.status(404).json({
                message: 'Sản phẩm không tìm thấy'
            })
        }
}

export async function updatesanPham(req, res){
    const { id } = req.params;
        const updatedsanPham = await db.SANPHAM.destroy({ where: { id } });
        if(updatedsanPham[0] > 0) {
           return res.status(200).json({ message: 'Update Sản phẩm thành công' })
        } else {
            return res.status(404).json({
                message: 'Sản phẩm không tìm thấy'
            })
        }
}

