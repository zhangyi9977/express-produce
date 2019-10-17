var express = require('express');
var router = express.Router();

var articleModel=require('../db/articleModel')

var moment=require('moment')

/* GET home page. */
router.get('/', function(req, res, next) {
  // let{page,size}=req.query
  let page=parseInt(req.query.page||1)
  let size=parseInt(req.query.size||3)
  // res.send({page,size})
  // return

  //用户名
  let username=req.session.username
  articleModel.find().count().then((total)=>{
    var pages=Math.ceil(total/size)

    articleModel.find().sort({'time':-1}).limit(size).skip((page-1)*size).then((docs)=>{
      var arr=docs.slice()
      for(let i=0;i<arr.length;i++){
        arr[i].timeZ=moment(arr[i].time).format('YYYY-MM-DD HH:mm:ss' )
      }
      res.render('index', { data:{list:arr,total:pages,username:username} });
    }).catch((err)=>{
      res.redirect('/')
    })
  }).catch((err)=>{
    res.redirect('/')
  })
  
  
});

// 注册
router.get('/regist', function(req, res, next) {
  res.render('regist', { });
});


// 登录
router.get('/login', function(req, res, next) {
  res.render('login', { });
});


// 写文章
router.get('/write',function(req,res,next){
  var time=parseInt(req.query.time)
  if(time){
    articleModel.find({'time':time}).then((doc)=>{
      res.render('write',{doc:doc[0]})
    }).catch((err)=>{
      res.redirect('/')
    })
  }else{
    var doc={
      _id:"",
      username:req.session.username,
      title:'',
      content:''
    }
    res.render('write',{doc:doc})
  }
  
})


// 详情
router.get('/detail',function(req,res,next){
  var time=parseInt(req.query.time);
  articleModel.find({'time':time}).then((doc)=>{
    // res.send({doc})
    // console.log(doc[0].time)
    timeZ=moment(doc[0].time).format('YYYY-MM-DD HH:mm:ss')
    res.render('detail',{doc:doc[0]})
  }).catch((err)=>{
    console.log('文章详情失败')
  })
  // res.render('detail',{})
})

module.exports = router;
