import { Sequelize } from "../models"
import db from "../models"
export async function getNhaCungCaps(req, res){
    const nhaCungCaps = await db.NHACUNGCAP.findAll();
    res.status(200).json({
        message: 'Lấy danh sách nhà cung cấp thành công',
        data: nhaCungCaps
    });
}

export async function getNhaCungCapById(req, res){
    const {id} = req.params.id;
    const nhaCungCaps = await db.NHACUNGCAP.findByPk(id);
    
    if(!nhaCungCaps) {
        return res.status(404).json({
            message: 'Không tìm thấy nhà cung cấp này'
        })
    }
    res.status(200).json({
        message: 'Lấy thông tin nhà cung cấp thành công',
        data: nhaCungCaps
    });
}

export async function insertNhaCungCap(req, res){
   
        //console.log(JSON.stringify(req.body))
        const nhaCungCap = await db.NHACUNGCAP.create(req.body)
        res.status(201).json({
            message: 'Thêm mới nhà cung cấp thành công',
            data: nhaCungCap
        })
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