var express=require('express')
var router=express.Router();

var articleModel=require('../db/articleModel')
//引入上传文件插件，能拿到上传文件的数据
var multiparty=require('multiparty')
//创建一个对象，调用parse方法，解析图片数据


var fs=require('fs')

// 新增和修改文章
router.post('/write',(req,res,next)=>{
    let{title,content,username,time}=req.body  
    if(time){
        articleModel.updateOne({'time':time},{content,title,username}).then((data)=>{
            res.redirect('/')
        }).catch((err)=>{
            console.log(err)
            res.redirect('/write')
        })
        // res.send({title,content,username,id})
    }else{
        // 用户名
        let username=req.session.username
        let time=Date.now()
        // res.send({title,content})
        articleModel.insertMany({title,content,time,username}).then((data)=>{
            // res.send('文章发表完成')
            res.redirect('/')
        }).catch((err)=>{
            // res.send('文章发送失败')
            res.redirect('/write')
        })
    }
    
    

})
// 上传文件
router.post('/upload',(req,res,next)=>{
    var form=new multiparty.Form()
    form.parse(req,(err,field,files)=>{
        if(err){
            console.log('文件上传失败')
        }else{
            // console.log(files)
            var file=files.filedata[0]
            var read=fs.createReadStream(file.path)
            var write=fs.createWriteStream('./public/imgs/'+file. originalFilename)
            read.pipe(write)
            write.on('close',()=>{
                res.send({err:0,msg:'/imgs/'+file.originalFilename})
            })
        }
    })
})

//删除
router.get('/delete',(req,res,next)=>{
    let time=req.query.time
    articleModel.deleteOne({'time':time}).then((data)=>{
        res.redirect('/')
    }).catch((err)=>{
        res.redirect('/')
    })
    // res.send(time)
})

module.exports=router


// if(id){
//     id=new Object(id)
//     articleModel.updateOne({_id:id},{time,content,title,username}).then((data)=>{
//         res.redirect('/')
//     }).catch((err)=>{
//         console.log(err)
//         res.redirect('/write')
//     })
//     // res.send({title,content,username,id})
// }




 