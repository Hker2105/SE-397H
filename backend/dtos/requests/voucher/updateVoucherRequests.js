import Joi from 'joi'

const updateVoucherSchema = Joi.object({
    MaVC: Joi.string().optional(),
    MaVoucher: Joi.string().optional(),
    GiaTri: Joi.number().positive().optional(),
    NgayBD: Joi.date().optional(),
    NgayKT: Joi.date().optional(),
    SoLuong: Joi.number().integer().min(1).optional()
})

class updateVoucherRequest{
    constructor(data) {
        this.MaVC = data.MaVC
        this.MaVoucher = data.MaVoucher
        this.GiaTri = data.GiaTri
        this.NgayBD = data.NgayBD
        this.NgayKT = data.NgayKT
        this.SoLuong = data.SoLuong
    }

    static validate(data){
        return updateVoucherSchema.validate(data)
    }
}

export default updateVoucherRequest;