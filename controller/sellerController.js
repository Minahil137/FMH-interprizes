

const seller=require('../models/seller')
const  store  =(req, res) => 
{

   const s = new seller({
 

      Latitude:req.body.Latitude,
      longitude:req.body.longitude
   })
  
   

   s.save().then(() => {
     req.flash('message',"data submitted")
    m='Data saved!'
   console.log("hurrrau!")


   }
  
   )
}
module.exports=store