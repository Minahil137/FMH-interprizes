const express = require('express');
const app = express();
app.set('view engine','ejs');
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
module.exports={store,display}