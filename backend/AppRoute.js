import express from 'express'
import * as sanPhamController from './controllers/sanPhamController'
import * as hangSanXuatController from './controllers/hangSanXuatController'
import * as nhaCungCapController from './controllers/nhaCungCapController'
import * as donHangController from './controllers/donHangController'
import * as voucherController from './controllers/voucherController'
const router = express.Router()
export function AppRoute(app) {
    //http:localhost:3000/sanphams
    router.get('/sanphams', sanPhamController.getsanPham)
    router.get('/sanphams/:id', sanPhamController.getsanPhamById)
    router.post('/sanphams', sanPhamController.insertsanPham)
    router.put('/sanphams', sanPhamController.updatesanPham)
    router.delete('/sanphams/:id', sanPhamController.deletesanPham)

    router.get('/hangsanxuats', hangSanXuatController.getHangSanXuats)
    router.get('/hangsanxuats/:id', hangSanXuatController.getHangSanXuatById)
    router.post('/hangsanxuats', hangSanXuatController.insertHangSanXuat)
    router.put('/hangsanxuats/:id', hangSanXuatController.updateHangSanXuat)
    router.delete('/hangsanxuats/:id', hangSanXuatController.deleteHangSanXuat)

    router.get('/nhacungcaps', nhaCungCapController.getNhaCungCaps)
    router.get('/nhacungcaps/:id', nhaCungCapController.getNhaCungCapById)
    router.post('/nhacungcaps', nhaCungCapController.insertNhaCungCap)
    router.put('/nhacungcaps/:id', nhaCungCapController.updateNhaCungCap)
    router.delete('/nhacungcaps/:id', nhaCungCapController.deleteNhaCungCap)

    router.get('/donhangs', donHangController.getDonHangs)
    router.get('/donhangs/:id', donHangController.getDonHangById)
    router.post('/donhangs', donHangController.insertDonHang)
    router.put('/donhangs/:id', donHangController.updateDonHang)
    router.delete('/donhangs/:id', donHangController.deleteDonHang)

    router.get('/vouchers', voucherController.getVouchers)
    router.get('/vouchers/:id', voucherController.getVoucherById)
    router.post('/vouchers', voucherController.insertVoucher)
    router.put('/vouchers/:id', voucherController.updateVoucher)
    router.delete('/vouchers/:id', voucherController.deleteVoucher)

    app.use('/api/', router)
}