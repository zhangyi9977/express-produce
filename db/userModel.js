var mongoose=require('mongoose')

var userSchema=mongoose.Schema({
    username:String,
    password:String,
    time:Number
    // name:String,
    // age:Number
})

var userModel=mongoose.model('users',userSchema)

module.exports=userModel