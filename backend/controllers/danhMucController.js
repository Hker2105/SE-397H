import { Sequelize } from "../models"
import db from "../models"

export async function getDanhMucs(req, res){
    res.status(200).json({
        message: 'Lấy danh sách danh mục thành công'
    })
}

export async function getDanhMucById(req, res){
    res.status(200).json({
        message: 'Lấy thông tin danh mục thành công'
    })
}

export async function insertDanhMuc(req, res){
    try {
            // console.log(JSON.stringify(req.body))
            const danhMuc = await db.DANHMUC.create(req.body)
            res.status(201).json({
                message: 'Thêm mới danh mục thành công',
                data: danhMuc
            })
        } catch (error) {
            res.status(500).json({
                message: 'Xảy ra lỗi khi thêm danh mục',
                error: error.message
            })
        }
}

export async function deleteDanhMuc(req, res){
    res.status(200).json({
        message: 'Xoá danh mục thành công'
    })
}

export async function updateDanhMuc(req, res){
    res.status(200).json({
        message: 'Update danh mục thành công'
    })
}