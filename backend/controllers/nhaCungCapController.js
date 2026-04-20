import { Sequelize } from "../models"
import db from "../models"
export async function getNhaCungCaps(req, res){
    res.status(200).json({
        message: 'Lấy danh sách nhà cung cấp thành công'
    })
}

export async function getNhaCungCapById(req, res){
    res.status(200).json({
        message: 'Lấy thông tin nhà cung cấp thành công'
    })
}

export async function insertNhaCungCap(req, res){
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

export async function deleteNhaCungCap(req, res){
    res.status(200).json({
        message: 'Xoá nhà cung cấp thành công'
    })
}

export async function updateNhaCungCap(req, res){
    res.status(200).json({
        message: 'Update nhà cung cấp thành công'
    })
}