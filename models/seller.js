const { Double } = require('mongodb');
const mongoose=require('mongoose');
const schema =mongoose.Schema;
const sellerShema= new schema({
    latitude:{
        type:Number
    },
    longitude:{
        type:Number
    },
    img:
    {
      type:String
    },
  
   


})
const seller=mongoose.model('seller',sellerShema)
module.exports=seller
