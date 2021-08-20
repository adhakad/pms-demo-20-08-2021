var express = require('express');
var router = express.Router();
var teacherModule=require('../modules/teacher');
var classModule=require('../modules/class');
var studentModule=require('../modules/studentUser');

const { check, validationResult } = require('express-validator');
router.use(express.static('public'))

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('/',function(req, res, next) {
  var school_key = req.session.school_session_key;
  var getTeacher= teacherModule.find({school_key:school_key});
  getTeacher.exec(function(err,records){
    var getCls= classModule.find({school_key:school_key});
    getCls.exec(function(err,t_id){
      if(err) throw err;
      if(t_id==null){
        if(req.session.auth_email){
          res.render('dashboard', { title: 'TechBista Solutions',records:records,auth_email:req.session.auth_email,stu_email:"",teacher_email:"",class_name:"",t_id:""});  
        }else if(req.session.stu_email){
          var email = req.session.stu_email;
          var get= studentModule.findOne({email:email});
          get.exec(function(err,stuData){
            var class_name = stuData.class_name;
            req.session.class_name = class_name;
            res.render('dashboard', { title: 'TechBista Solutions',records:records,auth_email:"",stu_email:req.session.stu_email,teacher_email:"",class_name:class_name,t_id:""});
          });  
        }else if(req.session.teacher_email){
          res.render('dashboard', { title: 'TechBista Solutions',records:records,auth_email:"",stu_email:"",teacher_email:req.session.teacher_email,class_name:"",t_id:""});
        }
      }else{
        if(req.session.auth_email){
          res.render('dashboard', { title: 'TechBista Solutions',records:records,auth_email:req.session.auth_email,stu_email:"",teacher_email:"",class_name:"",t_id:t_id});
        }else if(req.session.stu_email){
          var email = req.session.stu_email;
          var get= studentModule.findOne({email:email});
          get.exec(function(err,stuData){
            var class_name = stuData.class_name;
            req.session.class_name = class_name;
            res.render('dashboard', { title: 'TechBista Solutions',records:records,auth_email:"",stu_email:req.session.stu_email,teacher_email:"",class_name:class_name,t_id:t_id});
          });  
        }else if(req.session.teacher_email){
          res.render('dashboard', { title: 'TechBista Solutions',records:records,auth_email:"",stu_email:"",teacher_email:req.session.teacher_email,class_name:"",t_id:t_id});
        }
      }
    });
  });  
});

module.exports = router;