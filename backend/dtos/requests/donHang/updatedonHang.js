import Joi from 'joi'

const updateDonHangSchema = Joi.object({
    MaKhachHang: Joi.string().optional(),
    MaVC: Joi.string().optional().allow(""),
    SoLuong: Joi.number().integer().min(1).optional(),
    DonGia: Joi.number().positive().optional(),
    NgayDat: Joi.date().optional(),
    TongTien: Joi.number().positive().optional(),
    TinhTrang: Joi.string().optional(),
    GhiChu: Joi.string().optional().allow("")
})

class updateDonHangRequest{
    constructor(data) {
        this.MaKhachHang = data.MaKhachHang
        this.MaVC = data.MaVC
        this.SoLuong = data.SoLuong
        this.DonGia = data.DonGia
        this.NgayDat = data.NgayDat
        this.TongTien = data.TongTien
        this.TinhTrang = data.TinhTrang
        this.GhiChu = data.GhiChu
    }

    static validate(data){
        return updateDonHangSchema.validate(data)
    }
}

export default updateDonHangRequest;