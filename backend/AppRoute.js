import express from 'express'
import * as sanPhamController from './controllers/sanPhamController'
import * as hangSanXuatController from './controllers/hangSanXuatController'
import * as nhaCungCapController from './controllers/nhaCungCapController'
import * as donHangController from './controllers/donHangController'
import * as voucherController from './controllers/voucherController'
import * as danhMucController from './controllers/danhMucController'
import * as khachHangController from './controllers/khachHangController'
import * as imageController from './controllers/imageController'
import * as lienHeHoTroController from './controllers/lienHeHoTroController'
import * as danhGiaController from './controllers/danhGiaController'
import * as thanhToanController from './controllers/thanhToanController'
import * as gioHangController from './controllers/gioHangController'
import asyncHandler from './middlewares/asyncHandler'
import validate from './middlewares/validate'
import insertsanPhamRequest from './dtos/requests/sanPham/insertsanPhamRequests'
import updatesanPhamRequest from './dtos/requests/sanPham/updatesanPhamReqests'
import insertDonHangRequest from './dtos/requests/donHang/insertDonHangRequests'
import updateVoucherRequest from './dtos/requests/voucher/updateVoucherRequests'
import insertVoucherRequest from './dtos/requests/voucher/insertVoucherRequests'
import updateDonHangRequest from './dtos/requests/donHang/updatedonHang'
import insertKhachHangRequest from './dtos/requests/khachHang/insertkhachHangRequests'
import updatekhachHangRequest from './dtos/requests/khachHang/updatekhachHangRequests'
import upload from './middlewares/imageUpload'
const router = express.Router()


export function AppRoute(app) {
    //http:localhost:3000/sanphams
    router.get('/khachhangs', asyncHandler(khachHangController.getKhachHangs))
    router.get('/khachhangs/:id', asyncHandler(khachHangController.getKhachHangById))
    router.post('/khachhangs', validate(insertKhachHangRequest),asyncHandler(khachHangController.insertKhachHang))
    router.put('/khachhangs/:id', validate(updatekhachHangRequest), asyncHandler(khachHangController.updateKhachHang))
    router.delete('/khachhangs/:id', asyncHandler(khachHangController.deleteKhachHang))
    router.post('/khachhangs/login', asyncHandler(khachHangController.loginKhachHang))

    router.get('/sanphams', asyncHandler(sanPhamController.getsanPham))
    router.get('/sanphams/:id', asyncHandler(sanPhamController.getsanPhamById))
    router.post('/sanphams', validate(insertsanPhamRequest),asyncHandler(sanPhamController.insertsanPham))
    router.put('/sanphams/:id', validate(updatesanPhamRequest), asyncHandler(sanPhamController.updatesanPham))
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
    router.post('/donhangs', validate(insertDonHangRequest),asyncHandler(donHangController.insertDonHang))
    router.put('/donhangs/:id', validate(updateDonHangRequest),asyncHandler(donHangController.updateDonHang))
    router.delete('/donhangs/:id', asyncHandler(donHangController.deleteDonHang))

    router.get('/vouchers', asyncHandler(voucherController.getVouchers))
    router.get('/vouchers/:id', asyncHandler(voucherController.getVoucherById))
    router.post('/vouchers', validate(insertVoucherRequest),asyncHandler(voucherController.insertVoucher))
    router.put('/vouchers/:id', validate(updateVoucherRequest),asyncHandler(voucherController.updateVoucher))
    router.delete('/vouchers/:id', asyncHandler(voucherController.deleteVoucher))

    router.get('/danhmucs', asyncHandler(danhMucController.getDanhMucs))
    router.get('/danhmucs/:id', asyncHandler(danhMucController.getDanhMucById))
    router.post('/danhmucs', asyncHandler(danhMucController.insertDanhMuc))
    router.put('/danhmucs/:id', asyncHandler(danhMucController.updateDanhMuc))
    router.delete('/danhmucs/:id', asyncHandler(danhMucController.deleteDanhMuc))

    router.post('/images/uploads', upload.any(), asyncHandler(imageController.uploadImages))
    router.get('/images/:fileName', asyncHandler(imageController.viewImage))

    router.get('/lienhehotros', asyncHandler(lienHeHoTroController.getLienHeHoTro))
    router.get('/lienhehotros/:id', asyncHandler(lienHeHoTroController.getLienHeHoTroById))
    router.post('/lienhehotros', asyncHandler(lienHeHoTroController.insertLienHeHoTro))
    router.delete('/lienhehotros/:id', asyncHandler(lienHeHoTroController.deleteLienHeHoTro))

    router.get('/danhgias', asyncHandler(danhGiaController.getDanhGias))
    router.get('/danhgias/:id', asyncHandler(danhGiaController.getDanhGiaById))
    router.post('/danhgias', asyncHandler(danhGiaController.insertDanhGia))
    router.delete('/danhgias/:id', asyncHandler(danhGiaController.deleteDanhGia))

    router.get('/thanhtoans', asyncHandler(thanhToanController.getThanhToans))
    router.get('/thanhtoans/:id', asyncHandler(thanhToanController.getThanhToanById))
    router.post('/thanhtoans', asyncHandler(thanhToanController.insertThanhToan))

    router.get('/giohangs', asyncHandler(gioHangController.getGioHangs))
    router.post('/giohangs', asyncHandler(gioHangController.insertGioHang))
    router.delete('/giohangs/:id', asyncHandler(gioHangController.deleteGioHang))

    app.use('/api/', router)
}