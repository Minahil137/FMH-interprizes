const mongoose=require('mongoose');
const schema =mongoose.Schema;
   
const userShema= new schema({
    username:{
    type:String
},
Email:{
type:String
},
Phone:{
    type:String
    },
    Message :{
        type:String   
    },
    password:{
        type:String
    },
    img:
    {
        data: Buffer,
        contentType: String
    }
})
// username: req.body.cf-name,
//Email: req.body.cf-email,
//Phone: req.body.cf-phone,
//Message:req.body.cf-message
const user=mongoose.model('user',userShema)
module.exports=user
