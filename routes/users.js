var express = require('express');
var router = express.Router();

var userModel=require('../db/userModel')



/* GET users listing. */
router.get('/getList', function(req, res, next) {
  // res.send('hello world');
  userModel.find().then((docs)=>{
    res.send({data:docs})
  }).catch((err)=>{
    res.send({err:-1,msg:'fail'})
  })

});

// 注册(接口)   浏览器默认  model模型
router.post('/regist',(req,res,next)=>{
  
  let{username,password,password2}=req.body  //拿到请求主体中的...
  userModel.find({username}).then((docs)=>{
    if(docs.length>0){
      res.send('用户名已存在')
    }else{
      let time=Date.now()
      userModel.insertMany({username,password,time}).then((data)=>{  //data是插入成功后返回的data,data是数组
            // res.send('注册成功')
            console.log(data)
            res.redirect('/login')
      }).catch((err)=>{
            res.send('注册失败')
          })
    }
   
  })
  
  
})

//登录
router.post('/login',(req,res,next)=>{
  let{username,password}=req.body
  userModel.find({username,password}).then((docs)=>{
    if(docs.length>0){
      // res.send('登录成功')
      req.session.username=username     //session 记录
      res.redirect('/') 
    }else{
      // res.send('用户名不存在')
        res.redirect('/regist')
      }
  }).catch((err)=>{
    // res.send('注册失败')
  })
  
})

//退出
router.get('/logout',(req,res,next)=>{
  req.session.username=null
  res.redirect('/login')
})
module.exports = router;
