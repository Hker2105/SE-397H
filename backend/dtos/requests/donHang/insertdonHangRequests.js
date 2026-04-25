import Joi from 'joi'

const donHangSchema = Joi.object({
    MaDH: Joi.string().required(),
    MaKhachHang: Joi.string().required(),
    MaVC: Joi.string().optional().allow(""),
    SoLuong: Joi.number().integer().min(1).required(),
    DonGia: Joi.number().positive().required(),
    NgayDat: Joi.date().required(),
    TongTien: Joi.number().positive().required(),
    TinhTrang: Joi.string().required(),
    GhiChu: Joi.string().optional().allow("")
})

class insertDonHangRequest{
    constructor(data) {
        this.MaDH = data.MaDH
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
        if (Array.isArray(data)) {
            const schema = Joi.array().items(donHangSchema)
            return schema.validate(data)
        }
        return donHangSchema.validate(data)
    }
}

export default insertDonHangRequest;