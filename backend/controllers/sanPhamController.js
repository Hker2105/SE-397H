// const SanPham = require('../models/SanPham');

// // TẠO SẢN PHẨM (ADMIN)
// exports.createProduct = async (req, res) => {
//     try {
//         // Kiểm tra admin
//         if (req.user.MaLoai !== 1) {
//             return res.status(403).json({ 
//                 success: false,
//                 message: 'Chỉ admin mới có thể tạo sản phẩm' 
//             });
//         }

//         const { TenSP, DonGia, MaDM, MaThue, MoTa } = req.body;

//         // Kiểm tra input
//         if (!TenSP || !DonGia || !MaDM || !MaThue) {
//             return res.status(400).json({ 
//                 success: false,
//                 message: 'Tên, giá, danh mục và thuế là bắt buộc' 
//             });
//         }

//         // Xử lý upload ảnh
//         const HinhAnh = req.file ? `/uploads/${req.file.filename}` : null;

//         await SanPham.create({
//             TenSP,
//             DonGia: parseFloat(DonGia),
//             HinhAnh,
//             MaDM: parseInt(MaDM),
//             MaThue: parseInt(MaThue),
//             MoTa: MoTa || ''
//         });

//         res.status(201).json({ 
//             success: true,
//             message: 'Tạo sản phẩm thành công' 
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             success: false,
//             message: error.message 
//         });
//     }
// };

// // LẤY TẤT CẢ SẢN PHẨM
// exports.getProducts = async (req, res) => {
//     try {
//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 20;
//         const offset = (page - 1) * limit;

//         const products = await SanPham.getAll(limit, offset);

//         res.json({ 
//             success: true,
//             page,
//             limit,
//             count: products.length,
//             data: products 
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             success: false,
//             message: error.message 
//         });
//     }
// };

// // LẤY SẢN PHẨM THEO ID
// exports.getProductById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await SanPham.getById(id);

//         if (!product) {
//             return res.status(404).json({ 
//                 success: false,
//                 message: 'Sản phẩm không tồn tại' 
//             });
//         }

//         res.json({ 
//             success: true,
//             data: product 
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             success: false,
//             message: error.message 
//         });
//     }
// };

// // TÌM KIẾM SẢN PHẨM
// exports.searchProducts = async (req, res) => {
//     try {
//         const { keyword } = req.query;
        
//         if (!keyword) {
//             return res.status(400).json({ 
//                 success: false,
//                 message: 'Vui lòng nhập từ khóa tìm kiếm' 
//             });
//         }

//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 20;
//         const offset = (page - 1) * limit;

//         const products = await SanPham.search(keyword, limit, offset);

//         res.json({ 
//             success: true,
//             page,
//             limit,
//             count: products.length,
//             data: products 
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             success: false,
//             message: error.message 
//         });
//     }
// };

// // CẬP NHẬT SẢN PHẨM (ADMIN)
// exports.updateProduct = async (req, res) => {
//     try {
//         // Kiểm tra admin
//         if (req.user.MaLoai !== 1) {
//             return res.status(403).json({ 
//                 success: false,
//                 message: 'Chỉ admin mới có thể cập nhật sản phẩm' 
//             });
//         }

//         const { id } = req.params;
//         const { TenSP, DonGia, MaDM, MaThue, MoTa } = req.body;

//         // Xử lý upload ảnh
//         let HinhAnh = req.body.HinhAnh;
//         if (req.file) {
//             HinhAnh = `/uploads/${req.file.filename}`;
//         }

//         await SanPham.update(id, {
//             TenSP: TenSP || undefined,
//             DonGia: DonGia ? parseFloat(DonGia) : undefined,
//             HinhAnh,
//             MaDM: MaDM ? parseInt(MaDM) : undefined,
//             MaThue: MaThue ? parseInt(MaThue) : undefined,
//             MoTa: MoTa || ''
//         });

//         res.json({ 
//             success: true,
//             message: 'Cập nhật sản phẩm thành công' 
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             success: false,
//             message: error.message 
//         });
//     }
// };

// // XÓA SẢN PHẨM (ADMIN)
// exports.deleteProduct = async (req, res) => {
//     try {
//         // Kiểm tra admin
//         if (req.user.MaLoai !== 1) {
//             return res.status(403).json({ 
//                 success: false,
//                 message: 'Chỉ admin mới có thể xóa sản phẩm' 
//             });
//         }

//         const { id } = req.params;

//         await SanPham.delete(id);

//         res.json({ 
//             success: true,
//             message: 'Xóa sản phẩm thành công' 
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             success: false,
//             message: error.message 
//         });
//     }
// };

export async function getsanPham(req, res){
    res.status(200).json({
        message: 'Lấy danh sách sản phẩm thành công'
    })
}

export async function getsanPhamById(req, res){
    res.status(200).json({
        message: 'Lấy thông tin sản phẩm thành công'
    })
}

export async function insertsanPham(req, res){
    res.status(200).json({
        message: 'Thêm mới sản phẩm thành công'
    })
}

export async function deletesanPham(req, res){
    res.status(200).json({
        message: 'Xoá sản phẩm thành công'
    })
}

export async function updatesanPham(req, res){
    res.status(200).json({
        message: 'Update sản phẩm thành công'
    })
}
