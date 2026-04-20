import { Sequelize } from "../models"
import db from "../models"
export async function getHangSanXuats(req, res){
    res.status(200).json({
        message: 'Lấy danh sách hãng sản xuất thành công'
    })
}

export async function getHangSanXuatById(req, res){
    res.status(200).json({
        message: 'Lấy thông tin hãng sản xuất thành công'
    })
}

export async function insertHangSanXuat(req, res){
    try {
        // console.log(JSON.stringify(req.body))
        const nhaCungCap = await db.NHACUNGCAP.create(req.body)
        res.status(201).json({
            message: 'Thêm mới nhà cung cấp thành công',
            data: nhaCungCap
        })
    } catch (error) {
        res.status(500).json({
        message: 'Xảy ra lỗi khi thêm nhà cung cấp',
        error: error.message
        })
    }
}

export async function deleteHangSanXuat(req, res){
    res.status(200).json({
        message: 'Xoá hãng sản xuất thành công'
    })
}

export async function updateHangSanXuat(req, res){
    res.status(200).json({
        message: 'Update hãng sản xuất thành công'
    })
}