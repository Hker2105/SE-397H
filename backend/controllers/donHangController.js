export async function getDonHangs(req, res){
    try {
        const donHangs = await db.DONHANG.findAll();
        res.status(200).json({
            message: 'Lấy danh sách đơn hàng thành công',
            data: donHangs
        });
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function getDonHangById(req, res){
     try {
        const { id } = req.params;
        const donHang = await db.DONHANG.findByPk(id);
        if(!donHang) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng này' })
        }
        res.status(200).json({
            message: 'Lấy thông tin đơn hàng thành công',
            data: donHang
        });
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}

export async function insertDonHang(req, res){
    try {
        const data = Array.isArray(req.body) ? req.body : [req.body]
        
        for (const item of data) {
            const { MaDH, MaKhachHang, MaVC, SoLuong, DonGia, NgayDat, TongTien, TinhTrang, GhiChu } = item
            await db.sequelize.query(
                `INSERT INTO donhangs (MaDH, MaKhachHang, MaVC, SoLuong, DonGia, NgayDat, TongTien, TinhTrang, GhiChu, createdAt, updatedAt) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
                {
                    replacements: [MaDH, MaKhachHang, MaVC, SoLuong, DonGia, NgayDat, TongTien, TinhTrang, GhiChu],
                    type: db.Sequelize.QueryTypes.INSERT
                }
            )
        }

        res.status(201).json({
            message: 'Thêm mới đơn hàng thành công'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Xảy ra lỗi khi thêm đơn hàng',
            error: error.message
        })
    }
}

export async function deleteDonHang(req, res){
        const { id } = req.params;
        const deleted = await db.DONHANG.destroy({ where: { id } });
        if(deleted) {
           return res.status(200).json({ message: 'Xoá đơn hàng thành công' })
        } else {
            return res.status(404).json({
                message: 'Đơn hàng không tìm thấy'
            })
        }
}

export async function updateDonHang(req, res){
    try {
        const { id } = req.params;
        const { SoLuong, DonGia, TongTien, TinhTrang, GhiChu } = req.body
        await db.DONHANG.update(
            { SoLuong, DonGia, TongTien, TinhTrang, GhiChu },
            { where: { MaDH: id } }
        )
        res.status(200).json({ message: 'Update đơn hàng thành công' })
    } catch (error) {
        res.status(500).json({ message: 'Xảy ra lỗi', error: error.message })
    }
}