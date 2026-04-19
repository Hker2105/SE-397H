import express from 'express'
import * as sanPhamController from './controllers/sanPhamController'
const router = express.Router()
export function AppRoute(app) {
    //http:localhost:3000/sanphams
    router.get('/sanphams', sanPhamController.getsanPham)
    router.get('/sanphams/:id', sanPhamController.getsanPhamById)
    router.post('/sanphams', sanPhamController.insertsanPham)
    router.put('/sanphams', sanPhamController.updatesanPham)
    router.delete('/sanphams/:id', sanPhamController.deletesanPham)
    
    app.use('/api/', router)
}