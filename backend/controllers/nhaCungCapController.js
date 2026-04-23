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
         try {
        const data = Array.isArray(req.body) ? req.body : [req.body]
        
        for (const item of data) {
            const { MaNCC, TenNCC, SoDienThoai, DiaChi, Email } = item
            await db.sequelize.query(
                `INSERT INTO nhacungcaps (MaNCC, TenNCC, SoDienThoai, DiaChi, Email, createdAt, updatedAt) 
                 VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
                {
                    replacements: [MaNCC, TenNCC, SoDienThoai, DiaChi, Email],
                    type: db.Sequelize.QueryTypes.INSERT
                }
            )
        }

        res.status(201).json({
            message: 'Thêm mới nhà cung cấp thành công'
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