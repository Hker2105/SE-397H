import { Sequelize } from "../models"
import db from "../models"

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
            const danhMuc = await db.DANHMUC.create(req.body)
            res.status(201).json({
                message: 'Thêm mới danh mục thành công',
                data: danhMuc
            })
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