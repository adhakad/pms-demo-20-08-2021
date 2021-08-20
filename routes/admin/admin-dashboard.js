var express = require('express');
var router = express.Router();
const classTeacherModel = require('../../modules/classTeacher');
var teacherModule=require('../../modules/teacher');

const { check, validationResult } = require('express-validator');
router.use(express.static('public'))

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));



router.get('/',function(req, res, next) {
  var school_key = req.session.school_session_key;
  var teacher= teacherModule.find({school_key:school_key});
  teacher.exec(function(err,data){
    if(err) throw err;
    var index = 1;
    res.render('./admin/admin-dashboard', { title: 'TechBista Solutions',data:data,index:index,enabled:"enabled",active:"active",disabled:"disabled",inactive:"inactive"});
  });
});

router.delete('/delete',function(req, res) {
  var id=req.body.id;
  var teacher=teacherModule.findByIdAndDelete(id);
  teacher.exec((err,datas)=>{
    if(err) throw err;
    if(err){
      res.send({msg:'error'});
    }else{
      res.send({msg:'success'});
    }
  });
});

router.put('/enable_teacher', function(req, res,) {
  var id=req.body.id;
    var teacher=teacherModule.findByIdAndUpdate(id,{teacher_status:'enabled'});
    teacher.exec(function(err){
      if(err) throw err;
      res.send({msg:'success'}); 
    });  
});

router.put('/disable_teacher', function(req, res,) {
  var id=req.body.id;
    var teacher=teacherModule.findByIdAndUpdate(id,{teacher_status:'disabled'});
    teacher.exec(function(err){
      if(err) throw err;
      res.send({msg:'success'}); 
    });    
});

router.put('/active_class_teacher', function(req, res,) {
  var id=req.body.id;
    var teacher=teacherModule.findByIdAndUpdate(id,{class_teacher_status:'active'});
    teacher.exec(function(err){
      if(err) throw err;
      res.send({msg:'success'}); 
    });  
});

router.put('/inactive_class_teacher',function(req, res, next) {
  var id = req.body.id;
  classTeacher=teacherModule.findOne({_id:id});
  classTeacher.exec((err,result)=>{
    var teacher_uid=result.teacher_uid;
    clsTeacher=classTeacherModel.find({teacher_uid:teacher_uid});
    clsTeacher.exec((err,results)=>{
      if(results==null){
        var teacherUpdate=teacherModule.findByIdAndUpdate(id,{class_teacher_status:'inactive'});
        teacherUpdate.exec((err,data)=>{
          if(err) throw err;
          res.send({msg:'success'}); 
        });
      }else{
        var teacherUpdate=teacherModule.findByIdAndUpdate(id,{class_teacher_status:'inactive'});
        teacherUpdate.exec((err,data)=>{
          if(err) throw err;
          if(results.length > 0){
            results.forEach(function(row){
              var objid=row._id;
              Teacher=classTeacherModel.findByIdAndDelete(objid);
              Teacher.exec((err)=>{
              });
            }) 
          }
          res.send({msg:'success'}); 
        });
      }
    });
  });
});

  module.exports = router;