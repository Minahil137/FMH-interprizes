const { Double } = require('mongodb');
const mongoose=require('mongoose');
const schema =mongoose.Schema;
const sellerSchema= new schema({
    latitude:{
        type:Number
    },
    longitude:{
        type:Number
    },
   price:{
       type:Number
   }


})
const seller=mongoose.model('seller',sellerSchema)
module.exports=seller