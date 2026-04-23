import Joi from 'joi'

const sanPhamSchema = Joi.object({
    MaSP: Joi.string().required(),
    TenSP: Joi.string().required(),
    MaDM: Joi.string().required(),
    MaHang: Joi.string().required(),
    MaNCC: Joi.string().required(),
    MoTa: Joi.string().optional(),
    Gia: Joi.number().positive().required(),
    SoLuongTon: Joi.number().integer().min(0).required(),
    HinhAnh: Joi.string().allow("").optional(),
    UuDaiSV: Joi.boolean().optional(),
    NgayThem: Joi.date().required()
})

class insertsanPhamRequest{
    constructor(data) {
        this.MaSP = data.MaSP
        this.TenSP = data.TenSP
        this.MaDM = data.MaDM
        this.MaHang = data.MaHang
        this.MaNCC = data.MaNCC
        this.MoTa = data.MoTa
        this.Gia = data.Gia
        this.SoLuongTon = data.SoLuongTon
        this.HinhAnh = data.HinhAnh
        this.UuDaiSV = data.UuDaiSV
        this.NgayThem = data.NgayThem
    }

    static validate(data){
        if (Array.isArray(data)) {
            const schema = Joi.array().items(sanPhamSchema)
            return schema.validate(data)
        }
        return sanPhamSchema.validate(data)
    }
}

export default insertsanPhamRequest;