import express from 'express'
import * as sanPhamController from './controllers/sanPhamController'
import * as hangSanXuatController from './controllers/hangSanXuatController'
import * as nhaCungCapController from './controllers/nhaCungCapController'
import * as donHangController from './controllers/donHangController'
import * as voucherController from './controllers/voucherController'
import * as danhMucController from './controllers/danhMucController'
import asyncHandler from './middlewares/asyncHandler'
import validate from './middlewares/validate'
import insertsanPhamRequest from './dtos/requests/sanPham/insertsanPhamRequests'
const router = express.Router()


export function AppRoute(app) {
    //http:localhost:3000/sanphams
    router.get('/sanphams', asyncHandler(sanPhamController.getsanPham))
    router.get('/sanphams/:id', asyncHandler(sanPhamController.getsanPhamById))
    router.post('/sanphams', validate(insertsanPhamRequest),asyncHandler(sanPhamController.insertsanPham))
    router.put('/sanphams', asyncHandler(sanPhamController.updatesanPham))
    router.delete('/sanphams/:id', asyncHandler(sanPhamController.deletesanPham))

    router.get('/hangsanxuats', asyncHandler(hangSanXuatController.getHangSanXuats))
    router.get('/hangsanxuats/:id', asyncHandler(hangSanXuatController.getHangSanXuatById))
    router.post('/hangsanxuats', asyncHandler(hangSanXuatController.insertHangSanXuat))
    router.put('/hangsanxuats/:id', asyncHandler(hangSanXuatController.updateHangSanXuat))
    router.delete('/hangsanxuats/:id', asyncHandler(hangSanXuatController.deleteHangSanXuat))

    router.get('/nhacungcaps', asyncHandler(nhaCungCapController.getNhaCungCaps))
    router.get('/nhacungcaps/:id', asyncHandler(nhaCungCapController.getNhaCungCapById))
    router.post('/nhacungcaps', asyncHandler(nhaCungCapController.insertNhaCungCap))
    router.put('/nhacungcaps/:id', asyncHandler(nhaCungCapController.updateNhaCungCap))
    router.delete('/nhacungcaps/:id', asyncHandler(nhaCungCapController.deleteNhaCungCap))

    router.get('/donhangs', asyncHandler(donHangController.getDonHangs))
    router.get('/donhangs/:id', asyncHandler(donHangController.getDonHangById))
    router.post('/donhangs', asyncHandler(donHangController.insertDonHang))
    router.put('/donhangs/:id', asyncHandler(donHangController.updateDonHang))
    router.delete('/donhangs/:id', asyncHandler(donHangController.deleteDonHang))

    router.get('/vouchers', asyncHandler(voucherController.getVouchers))
    router.get('/vouchers/:id', asyncHandler(voucherController.getVoucherById))
    router.post('/vouchers', asyncHandler(voucherController.insertVoucher))
    router.put('/vouchers/:id', asyncHandler(voucherController.updateVoucher))
    router.delete('/vouchers/:id', asyncHandler(voucherController.deleteVoucher))

    router.get('/danhmucs', asyncHandler(danhMucController.getDanhMucs))
    router.get('/danhmucs/:id', asyncHandler(danhMucController.getDanhMucById))
    router.post('/danhmucs', asyncHandler(danhMucController.insertDanhMuc))
    router.put('/danhmucs/:id', asyncHandler(danhMucController.updateDanhMuc))
    router.delete('/danhmucs/:id', asyncHandler(danhMucController.deleteDanhMuc))

    app.use('/api/', router)
}