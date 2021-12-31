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
    Prize:
    {
        type:Number
    },
    Location:
    {
        type:String
    },
    ContactNumber:
    {
        type:String
    },
    CNIC:
    {
        type:String
    },
    Size:
    {
        type:String
    },
    Description:
    {
        type:String
    },

  
  
   


})
{/* <label id="t">latitude</label> <input type="text" id="Latitude" name="Latitude">
<label id="t">longitude</label> <input type="text" id="longitude" name="longitude">
<label id="t">Prize</label> <input type="text"  name="Prize">
<label id="t">Exact Location</label> <input type="text"  name="ExactLocation">
<label id="t">Contact Number</label> <input type="text"  name="ContactNumber">
<label id="t">CNIC</label> <input type="text" name="CNIC">
<label id="t">Size</label> <input type="text" name="Size">
<label id="t">Description</label> <input type="text" name="Description"> */}
const seller=mongoose.model('seller',sellerShema)
module.exports=seller
