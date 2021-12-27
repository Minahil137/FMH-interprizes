const express=require('express');
const path=require('path')
const seller=require('../models/seller')

const router=(express.Router())
 const controller=require('../controller/sellerController');
router.use(express.urlencoded({ extended: true }))
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/pic')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + path.extname(file.originalname)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })

 router.post("/upload",upload.single('myfile'),(req,res)=>{

    
       
        {const s = new seller({
 

            Latitude:req.body.Latitude,
            longitude:req.body.longitude,
            img:req.file.filename
         })
         s.save().then(()=>{
             console.log("saved")
         })
         
        }
    })

//router.post('/save',controller)

	


module.exports=router