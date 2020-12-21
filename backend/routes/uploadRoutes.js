import multer from 'multer'
import express from 'express'
import path from 'path'

const router = express.Router()


const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploads/')
    },
    filename(req,file,cb){
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType (file , cb){
    const fileType = /jpeg|jpg|png/
    const extname = fileType.test(path.extname(file.originalname).toLowerCase()) // this checks the extension of file
    const mimetype = fileType.test(file.mimetype) // this checks if image/jpeg or this '/' solutions 

    if(extname && mimetype){
        return cb(null,true)
    }
    else{
         cb('Only Imge type accepted')
    }
}

const upload = multer ({
    storage,
    fileFilter:function(req,file,cb){
        checkFileType(file,cb)
    }
})

// here upload.single only allows single picture and in FrontEnd we catch it 'image'
router.post('/',upload.single('image'), (req,res)=>{
    res.send(`/${req.file.path}`)
})


// we need to  make 'uploads' folder static which we will do it in se

export default router;