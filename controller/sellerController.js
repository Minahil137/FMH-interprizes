const express = require('express');
const app = express();
app.set('view engine','ejs');
const seller=require('../models/seller')
const  store  =(req, res) => 
{
//    latitude:{
//       type:Number
//   },
//   longitude:{
//       type:Number
//   },
//   img:
//   {
//     type:String
//   },
//   Prize:
//   {
//       type:Number
//   },
//   Location:
//   {
//       type:String
//   },
//   ContactNumber:
//   {
//       type:String
//   },
//   CNIC:
//   {
//       type:String
//   },
//   Size:
//   {
//       type:String
//   },
//   Description:
//   {
//       type:String
//   },

   const s = new seller({
 

      Latitude:req.body.Latitude,
      longitude:req.body.longitude,
      Prize:req.body.Prize,
      Location:req.body.ExactLocation,
      ContactNumber:req.body.ContactNumber,
      CNIC:req.body.CNIC,
      Size:req.body.Size,
      Description:req.body,Description

   })
  
   

   s.save().then(() => {
     req.flash('message',"data submitted")
    m='Data saved!'
   console.log("hurrrau!")


   }
  
   )
}
const display=(req,res)=>{



   seller.find().then((response)=>{
      console.log(response)
      res.render('properties.ejs',{response:response})
   }
   )
 
   
   // ).then((response)=>{
   //    response.forEach((hmm)=>{
   //     // const lat= array.map(hmm.longitude)
   //     //  console.log(lat)
   //    })
    
     

    

   //    }).catch((err=>res.send("ello")))
   
}
const HAPPY=(req,res)=>{



  res.render('dashboard.ejs')
   
}
module.exports={store,display,HAPPY}