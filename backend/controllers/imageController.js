import path from 'path'

export async function uploadImages(req, res) {
    if(!req.files || req.files.length === 0){
        return res.status(400).json({
            message: 'Không có file nào được tải lên'
        })
    }

    const uploadedImagesPaths = req.files.map(file => file.filename) 

    res.status(200).json({
        message: 'Tải ảnh lên thành công',
        files: uploadedImagesPaths
    })
}