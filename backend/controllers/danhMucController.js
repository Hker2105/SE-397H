import db from "../models"

export async function getDanhMucs(req, res){
    try {
        const danhMucs = await db.DANHMUC.findAll();
        res.status(200).json({
            message: 'Lấy danh sách danh mục thành công',
            data: danhMucs
        });
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function getDanhMucById(req, res){
    try {
        const { id } = req.params;
        const danhMuc = await db.DANHMUC.findByPk(id);
        if(!danhMuc) {
            return res.status(404).json({ message: 'Không tìm thấy danh mục này' })
        }
        res.status(200).json({
            message: 'Lấy thông tin danh mục thành công',
            data: danhMuc
        });
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function insertDanhMuc(req, res){
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
        res.status(201).json({ message: 'Thêm mới danh mục thành công' })
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi khi thêm danh mục', error: error.message })
    }
}

export async function deleteDanhMuc(req, res){
    try {
        const { id } = req.params;
        const deleted = await db.DANHMUC.destroy({ where: { MaDM: id } });
        if(deleted) {
            return res.status(200).json({ message: 'Xoá danh mục thành công' })
        } else {
            return res.status(404).json({ message: 'Danh mục không tìm thấy' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function updateDanhMuc(req, res){
    try {
        const { id } = req.params;
        const updated = await db.DANHMUC.update(req.body, { where: { MaDM: id } });
        if(updated[0] > 0) {
            return res.status(200).json({ message: 'Update danh mục thành công' })
        } else {
            return res.status(404).json({ message: 'Danh mục không tìm thấy' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}