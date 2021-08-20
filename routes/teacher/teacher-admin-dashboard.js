var express = require('express');
var router = express.Router();

var teacherModule=require('../../modules/teacher');
var classModule=require('../../modules/class');
var allClassModule=require('../../modules/totalAdminClass');
var subjectModule=require('../../modules/subject');
var classTeacherModal=require('../../modules/classTeacher');

const { check, validationResult } = require('express-validator');
router.use(express.static('public'))

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));



router.get('/',function(req, res,) {
    var school_key = req.session.school_session_key;
    var teacher_id = req.session.teacher_id;
    
      var getClass=classModule.findOne({teacher_id:teacher_id,school_key:school_key});
      getClass.exec((err, datas)=>{
        classTeacher=classTeacherModal.find({teacher_uid:teacher_id,school_key:school_key});
        classTeacher.exec((err,result)=>{
          if(err) throw err;
          var allClass=allClassModule.find({});
          allClass.exec((err, allClass)=>{
            var allSubject=subjectModule.find({});
            allSubject.exec((err, allSubject)=>{  
              if(result==null){
                if(datas==null){
                  res.render('./teacher/teacher-admin-dashboard', { title: 'TechBista Solutions', msg:'',datas:'',result:'',allClass:allClass,allSubject:allSubject });
                }else{
                  res.render('./teacher/teacher-admin-dashboard', { title: 'TechBista Solutions', msg:'',datas:datas,result:'',allClass:allClass,allSubject:allSubject });
                }
              }else{
                if(datas==null){
                  res.render('./teacher/teacher-admin-dashboard', { title: 'TechBista Solutions', msg:'',datas:'',result:result,allClass:allClass,allSubject:allSubject });
                }else{
                  res.render('./teacher/teacher-admin-dashboard', { title: 'TechBista Solutions', msg:'',datas:datas,result:result,allClass:allClass,allSubject:allSubject });
                }
              } 
            });
          });      
        });
      });
  
});

    function checkClass(req,res,next){
      var room_id=req.body.room_id; 
      var checkExitStudent_id=classModule.findOne({room_id:room_id});
      checkExitStudent_id.exec((err,datass)=>{
         if(err) throw err;
         if(datass){
            return res.send({redirectTo: 'This Room Id Already Created !'});
         }
        next();
      });
    }
    router.post('/post',checkClass,function(req, res, next) { 
      var school_key = req.session.school_session_key;
      var teacher_id = req.session.teacher_id;
      var exist_id = 1234567890;
      var class_name = req.body.class_name;
      var exist_class_name = 234567654;  
      var subject_name = req.body.subject_name; 
      var room_id = req.body.room_id; 
        var getClass= classModule.findOne({school_key:school_key});
        getClass.exec(function(err,datas){
          if(err) throw err;
          if(datas==null){           
                var userDetails=new classModule({
                  teacher_id:teacher_id,
                  exist_id:exist_id,
                  class_name:class_name,
                  exist_class_name:exist_class_name,
                  subject_name:subject_name,
                  room_id:room_id,
                  school_key:school_key,
                });
                userDetails.save((err)=>{
                  if(err) throw err; 
                  res.send({redirects:'/teacher-admin-dashboard'});
                });  
          }else{
            var class_name_exist = datas.class_name;
            if(class_name_exist == class_name){
              res.send({redirectTo: 'This Class Already Created'});
            }else{
                  var userDetails=new classModule({
                    teacher_id:teacher_id,
                    exist_id:exist_id,
                    class_name:class_name,
                    exist_class_name:exist_class_name,
                    subject_name:subject_name,
                    room_id:room_id,
                    school_key:school_key,
                  });
                  userDetails.save((err)=>{
                  if(err) throw err;
                  res.send({redirects:'/teacher-admin-dashboard'});
                });
            }
          }
        });  
    });

//delete class code start
router.delete('/delete', function(req, res,) {
  var school_key = req.session.school_session_key;
  var teacher_id=req.body.id;
    var teacherAdminClassDelete=classModule.findOneAndDelete({teacher_id:teacher_id,school_key:school_key});
    teacherAdminClassDelete.exec(function(err){
      if(err) throw err;
      res.send({redirects:'/teacher-admin-dashboard'});
    });
});

router.post('/class-start',function(req,res) {
  var school_key = req.session.school_session_key;
  var teacher_id=req.body.teacher_id;
  var checkUser=classModule.findOne({teacher_id:teacher_id,school_key:school_key});
    checkUser.exec((err, data)=>{
      if(data==null){
        res.send({redirects:'/teacher-admin-dashboard'});
      }else{  
        if(err) throw err;
          var class_obj_id = data._id;
          var start_date = data.start_date;
          var class_name = data.class_name;
          req.session.room_id = data.room_id;
          if(start_date==1234567890){
            var checkClass=classModule.findByIdAndUpdate(class_obj_id,{exist_id:teacher_id,exist_class_name:class_name,start_date:Date.now(),exp:Date.now()});
            checkClass.exec((err, clsData)=>{
              res.send({redirects:'/room/'+req.session.room_id+'/'+teacher_id});
            });
          }else{
            res.send({redirects:'/room/'+req.session.room_id+'/'+teacher_id});
            
          }
        
      }
    }); 
});

module.exports = router;