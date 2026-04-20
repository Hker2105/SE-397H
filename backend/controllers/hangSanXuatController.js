export async function getHangSanXuats(req, res){
    res.status(200).json({
        message: 'Lấy danh sách hãng sản xuất thành công'
    })
}

export async function getHangSanXuatById(req, res){
    res.status(200).json({
        message: 'Lấy thông tin hãng sản xuất thành công'
    })
}

export async function insertHangSanXuat(req, res){
    res.status(200).json({
        message: 'Thêm mới hãng sản xuất thành công'
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