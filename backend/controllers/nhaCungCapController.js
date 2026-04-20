export async function getNhaCungCaps(req, res){
    res.status(200).json({
        message: 'Lấy danh sách nhà cung cấp thành công'
    })
}

export async function getNhaCungCapById(req, res){
    res.status(200).json({
        message: 'Lấy thông tin nhà cung cấp thành công'
    })
}

export async function insertNhaCungCap(req, res){
    res.status(200).json({
        message: 'Thêm mới nhà cung cấp thành công'
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