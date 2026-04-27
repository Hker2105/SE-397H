import path from 'path'
import fs from 'fs'


export async function uploadImages(req, res) {
    console.log(req.files) 
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

export async function viewImage(req, res) {
    const {fileName} = req.params
    const imagePath = path.join(path.join(__dirname, '../uploads/'), fileName)
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if(err) {
            return res.status(404).send('Image not found');
        }
        res.sendFile(imagePath)
    })
}