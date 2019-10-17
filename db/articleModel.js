var mongoose=require('mongoose')

var articleSchema=mongoose.Schema({
    title:String,
    content:String,
    time:Number,
    username:String
})

var articleModel=mongoose.model('articles',articleSchema)

module.exports=articleModel