var express = require('express');
var router = express.Router();
var teacherModule=require('../../modules/teacher');

router.get('/', function(req, res, next) {
  var teacher_email=req.session.teacher_email;
  var check=teacherModule.findOne({email:teacher_email,pin:121212});
  check.exec((err, data)=>{
    if(data==null){
      res.render('./teacher/teacher-login', { title: 'Password Management System',data:""});
    }else{
      res.render('./teacher/teacher-login', { title: 'Password Management System',data:data});
    }
  });
});

router.post('/post',function(req, res, next) {
  var email=req.session.teacher_email;
  req.session.pin = req.body.pin;
  var pin = req.session.pin;
  var checkUser=teacherModule.findOne({email:email,pin:pin});
  checkUser.exec((err, data)=>{
    if(err) throw err;
    if(data!==null){
      req.session.teacher_id = data.teacher_uid;
      res.send({redirect:'./teacher-admin-dashboard'});
    }else if(pin==121212){
      res.send({redirectTo: 'Invalid Pin.'});
    }else if(data==null){
      res.send({redirectTo: 'Invalid Pin.'});
    }
  });
});

router.put('/set-pin',function(req, res, next) {
  var email = req.session.teacher_email;
  var pin=req.body.pin;
  var check=teacherModule.findOne({email:email});
  check.exec((err,data)=>{
    if(err) throw err;
    if(data){
      var obj_id = data._id;
      var teacherUpdate=teacherModule.findByIdAndUpdate(obj_id,{pin:pin});
      teacherUpdate.exec(function(err){
        if(err) throw err;
        res.send({msg:'success'}); 
      });
    }
  })
});

module.exports = router;