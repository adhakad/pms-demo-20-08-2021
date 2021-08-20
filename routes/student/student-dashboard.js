var express = require('express');
var router = express.Router();
var studentUserModule=require('../../modules/studentUser');
var classModule=require('../../modules/class');

router.get('/', function(req, res) {
  var school_key = req.session.school_session_key;
  var email=req.session.stu_email;
  var class_name = req.session.class_name;
  var check=studentUserModule.findOne({email:email,school_key:school_key,class_name:class_name});
  check.exec((err, data)=>{
    var getClass=classModule.findOne({class_name:class_name,school_key:school_key});
      getClass.exec((err, datas)=>{
        if(datas==null){
          res.render('./student/student-dashboard', { title: 'Student Dashboard',data:data,datas:''});
        }else{
          res.render('./student/student-dashboard', { title: 'Student Dashboard',data:data,datas:datas});
        }
      }); 
  });
});

router.post('/join-class',function(req, res, next) {
  var school_key = req.session.school_session_key;
  var class_name = req.session.class_name;
  var student_id=req.body.student_id;
    var getClass=classModule.findOne({class_name:class_name,school_key:school_key});
    getClass.exec(function(err,data){ 
      if(data==null){
        res.send({redirects:'/student-dashboard'});
      }else{
        var room_id = data.room_id;
        res.send({redirects:'/room/'+room_id+'/'+student_id});
      }
    });
});

module.exports = router;