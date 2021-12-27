

const seller=require('../models/seller')


  


var multer=require('multer')
//const { authorize } = require('passport');

 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'uploads')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.fieldname)
    }
  })
  
  const upload = multer(
      { storage: storage }).single("file")

  


const  store  =(req, res) => 
{
   const s = new seller({
 

    latitude:req.body.Latitude,
      longitude:req.body.longitude,
      img:req.file.filename
   })
  
   

   s.save().then(() => {
     req.flash('message',"data submitted")
    m='Data saved!'
   console.log("hurrrau!")


   }
  
   )
}
module.exports=store