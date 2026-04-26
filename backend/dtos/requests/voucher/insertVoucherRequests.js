import Joi from 'joi'

const voucherSchema = Joi.object({
    MaVC: Joi.string().required(),
    MaVoucher: Joi.string().required(),
    GiaTri: Joi.number().positive().required(),
    NgayBD: Joi.date().required(),
    NgayKT: Joi.date().required(),
    SoLuong: Joi.number().integer().min(1).required()
})

class insertVoucherRequest{
    constructor(data) {
        this.MaVC = data.MaVC
        this.MaVoucher = data.MaVoucher
        this.GiaTri = data.GiaTri
        this.NgayBD = data.NgayBD
        this.NgayKT = data.NgayKT
        this.SoLuong = data.SoLuong
    }

    static validate(data){
        if (Array.isArray(data)) {
            const schema = Joi.array().items(voucherSchema)
            return schema.validate(data)
        }
        return voucherSchema.validate(data)
    }
}

export default insertVoucherRequest;