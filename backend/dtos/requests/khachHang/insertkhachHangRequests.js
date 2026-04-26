import Joi from 'joi'

const khachHangSchema = Joi.object({
    MaKhachHang: Joi.string().required(),
    HoTen: Joi.string().required(),
    Email: Joi.string().email().required(),
    MatKhau: Joi.string().min(6).required(),
    SoDienThoai: Joi.string().optional().allow(""),
    DiaChi: Joi.string().optional().allow(""),
    LoaiTaiKhoan: Joi.string().required(),
    NgayTao: Joi.date().required()
})

class insertKhachHangRequest{
    constructor(data) {
        this.MaKhachHang = data.MaKhachHang
        this.HoTen = data.HoTen
        this.Email = data.Email
        this.MatKhau = data.MatKhau
        //this.MatKhau = this.encryptPassword(data.MatKhau)
        this.SoDienThoai = data.SoDienThoai
        this.DiaChi = data.DiaChi
        this.LoaiTaiKhoan = data.LoaiTaiKhoan
        this.NgayTao = data.NgayTao
    }

    static validate(data){
        if (Array.isArray(data)) {
            const schema = Joi.array().items(khachHangSchema)
            return schema.validate(data)
        }
        return khachHangSchema.validate(data)
    }
}

export default insertKhachHangRequest;