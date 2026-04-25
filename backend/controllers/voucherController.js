export async function getVouchers(req, res){
    res.status(200).json({
        message: 'Lấy danh sách voucher thành công'
    })
}

export async function getVoucherById(req, res){
    res.status(200).json({
        message: 'Lấy thông tin voucher thành công'
    })
}

export async function insertVoucher(req, res){
    res.status(200).json({
        message: 'Thêm mới voucher thành công'
    })
}

export async function deleteVoucher(req, res){
    res.status(200).json({
        message: 'Xoá voucher thành công'
    })
}

export async function updateVoucher(req, res){
    res.status(200).json({
        message: 'Update voucher thành công'
    })
}