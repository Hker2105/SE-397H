import Joi from 'joi'

const updateSanPhamSchema = Joi.object({
    TenSP: Joi.string().optional(),
    MaDM: Joi.string().optional(),
    MaHang: Joi.string().optional(),
    MaNCC: Joi.string().optional(),
    MoTa: Joi.string().optional(),
    Gia: Joi.number().positive().optional(),
    SoLuongTon: Joi.number().integer().min(0).optional(),
    HinhAnh: Joi.string().allow("").optional(),
    UuDaiSV: Joi.boolean().optional(),
    NgayThem: Joi.date().optional(),
    createdAt: Joi.date().optional(), 
    updatedAt: Joi.date().optional()  
})

class updatesanPhamRequest{
    constructor(data) {
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
        return updateSanPhamSchema.validate(data, { allowUnknown: true })
    }
}

export default updatesanPhamRequest;