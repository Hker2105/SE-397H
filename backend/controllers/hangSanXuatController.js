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
        try {
        const data = Array.isArray(req.body) ? req.body : [req.body]
        
        for (const item of data) {
            const { MaHang, TenHang, Mota } = item
            await db.sequelize.query(
                `INSERT INTO hangsanxuats (MaHang, TenHang, Mota, createdAt, updatedAt) 
                 VALUES (?, ?, ?, NOW(), NOW())`,
                {
                    replacements: [MaHang, TenHang, Mota],
                    type: db.Sequelize.QueryTypes.INSERT
                }
            )
        }

        res.status(201).json({
            message: 'Thêm mới hãng sản xuất thành công'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Xảy ra lỗi khi thêm hãng sản xuất',
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