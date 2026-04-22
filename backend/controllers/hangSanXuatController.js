import { Sequelize } from "../models"
import db from "../models"
export async function getHangSanXuats(req, res){
    const hangSanXuats = await db.HANGSANXUAT.findAll();
    res.status(200).json({
        message: 'Lấy danh sách hãng sản xuất thành công',
        data: hangSanXuats
    });
}

export async function getHangSanXuatById(req, res){
    const {id} = req.params.id;
    const hangSanXuats = await db.HANGSANXUAT.findById(id);

    if(!hangSanXuats) {
        return res.status(404).json({
            message: 'Không tìm thấy nhà cung cấp này'
        })
    }

    res.status(200).json({
        message: 'Lấy thông tin hãng sản xuất thành công',
        data: hangSanXuats
    });
}

export async function insertHangSanXuat(req, res){
        // console.log(JSON.stringify(req.body))
        const hangSanXuat = await db.HANGSANXUAT.create(req.body)
        res.status(201).json({
            message: 'Thêm mới nhà cung cấp thành công',
            data: hangSanXuat
        })
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