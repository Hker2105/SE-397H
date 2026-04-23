// import { Sequelize } from "../models"
// import db from "../models"
const db = require('../models')

export async function getDanhMucs(req, res){
    const danhMucs = await db.DANHMUC.findAll();
    res.status(200).json({
        message: 'Lấy danh sách danh mục thành công',
        data: danhMucs
    });
}

export async function getDanhMucById(req, res){
     const {id} = req.params.id;
        const danhMucs = await db.DANHMUC.findById(id);
    
        if(!danhMucs) {
            return res.status(404).json({
                message: 'Không tìm thấy nhà cung cấp này'
            })
        }
    res.status(200).json({
        message: 'Lấy thông tin danh mục thành công',
        data: danhMucs
    });
}

export async function insertDanhMuc(req, res){
            // console.log(JSON.stringify(req.body))
            try {
        const data = Array.isArray(req.body) ? req.body : [req.body]
        
        for (const item of data) {
            const { MaDM, TenDanhMuc, MoTa } = item
            await db.sequelize.query(
                `INSERT INTO danhmucs (MaDM, TenDanhMuc, MoTa, createdAt, updatedAt) 
                 VALUES (?, ?, ?, NOW(), NOW())`,
                {
                    replacements: [MaDM, TenDanhMuc, MoTa],
                    type: db.Sequelize.QueryTypes.INSERT
                }
            )
        }

        res.status(201).json({
            message: 'Thêm mới danh mục thành công'
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