// const KhuyenMai = require('../models/KhuyenMai');

// // TẠO KHUYẾN MÃI (ADMIN)
// exports.createPromotion = async (req, res) => {
//     try {
//         // Kiểm tra admin
//         if (req.user.MaLoai !== 1) {
//             return res.status(403).json({ 
//                 success: false,
//                 message: 'Chỉ admin mới có thể tạo khuyến mãi' 
//             });
//         }

//         const { TenKM, TuNgay, DenNgay, MucGiam, DonViGiam } = req.body;

//         // Kiểm tra input
//         if (!TenKM || !TuNgay || !DenNgay || !MucGiam) {
//             return res.status(400).json({ 
//                 success: false,
//                 message: 'Tên, ngày bắt đầu, ngày kết thúc và mức giảm là bắt buộc' 
//             });
//         }

//         const result = await KhuyenMai.create({
//             TenKM,
//             TuNgay,
//             DenNgay,
//             MucGiam: parseInt(MucGiam),
//             DonViGiam: DonViGiam || '%'
//         });

//         res.status(201).json({ 
//             success: true,
//             message: 'Tạo khuyến mãi thành công',
//             data: {
//                 MaKM: result.insertId
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             success: false,
//             message: error.message 
//         });
//     }
// };

// // LẤY TẤT CẢ KHUYẾN MÃI
// exports.getPromotions = async (req, res) => {
//     try {
//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 20;
//         const offset = (page - 1) * limit;

//         const promotions = await KhuyenMai.getAll(limit, offset);

//         res.json({ 
//             success: true,
//             page,
//             limit,
//             count: promotions.length,
//             data: promotions 
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             success: false,
//             message: error.message 
//         });
//     }
// };

// // LẤY KHUYẾN MÃI THEO ID
// exports.getPromotionById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const promotion = await KhuyenMai.getById(id);

//         if (!promotion) {
//             return res.status(404).json({ 
//                 success: false,
//                 message: 'Khuyến mãi không tồn tại' 
//             });
//         }

//         // Lấy sản phẩm trong khuyến mãi
//         const products = await KhuyenMai.getProducts(id);

//         res.json({ 
//             success: true,
//             data: {
//                 ...promotion,
//                 products
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             success: false,
//             message: error.message 
//         });
//     }
// };

// // XÓA KHUYẾN MÃI (ADMIN)
// exports.deletePromotion = async (req, res) => {
//     try {
//         // Kiểm tra admin
//         if (req.user.MaLoai !== 1) {
//             return res.status(403).json({ 
//                 success: false,
//                 message: 'Chỉ admin mới có thể xóa khuyến mãi' 
//             });
//         }

//         const { id } = req.params;

//         await KhuyenMai.delete(id);

//         res.json({ 
//             success: true,
//             message: 'Xóa khuyến mãi thành công' 
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             success: false,
//             message: error.message 
//         });
//     }
// };
export async function getVouchers(req, res){
    res.status(200).json({
        message: 'Lấy danh sách voucher thành công'
    })
}

export async function getVoucherById(req, res){
    res.status(200).json({
        message: 'Lấy thông tin voucher thành công'
    })
}

export async function insertVoucher(req, res){
    res.status(200).json({
        message: 'Thêm mới voucher thành công'
    })
}

export async function deleteVoucher(req, res){
    res.status(200).json({
        message: 'Xoá voucher thành công'
    })
}

export async function updateVoucher(req, res){
    res.status(200).json({
        message: 'Update voucher thành công'
    })
}