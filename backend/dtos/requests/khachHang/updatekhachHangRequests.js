import Joi from 'joi'

const updatekhachHangSchema = Joi.object({
    HoTen: Joi.string().optional(),
    Email: Joi.string().email().optional(),
    MatKhau: Joi.string().min(6).optional(),
    SoDienThoai: Joi.string().optional().allow(""),
    DiaChi: Joi.string().optional().allow(""),
    LoaiTaiKhoan: Joi.string().optional(),
    NgayTao: Joi.date().optional()
})

class updatekhachHangRequest{
    constructor(data) {
        this.HoTen = data.HoTen
        this.Email = data.Email
        this.MatKhau = data.MatKhau
        this.SoDienThoai = data.SoDienThoai
        this.DiaChi = data.DiaChi
        this.LoaiTaiKhoan = data.LoaiTaiKhoan
        this.NgayTao = data.NgayTao
    }

    static validate(data){
        return updatekhachHangSchema.validate(data)
    }
}

export default updatekhachHangRequest;