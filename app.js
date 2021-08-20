var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/*******************************************************************************Index Router*********/
var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
/*******************************************************************************Owner Router*********/
var ownerRouter = require('./routes/owner/owner-dashboard');
var ownerPanelRouter = require('./routes/owner/owner-panel');
/*******************************************************************************Admin Router*********/
var adminAuthRouter = require('./routes/admin/admin-auth');
var adminPanelRouter = require('./routes/admin/admin-panel');
var adminDashboardRouter = require('./routes/admin/admin-dashboard');
/******************************************************************************Student Router*********/
var getStudentUserRouter = require('./routes/student/getStudentUser');
var studentDashboardRouter = require('./routes/student/student-dashboard');
var adminStudentListRouter = require('./routes/student/studentList');
var studentUserRouter = require('./routes/student/studentUser');
/******************************************************************************Teacher Router*********/
var teacherRouter = require('./routes/teacher/teacher');
var teacherAdminPanelRouter = require('./routes/teacher/teacher-admin-panel');
var teacherAdminDashboardRouter = require('./routes/teacher/teacher-admin-dashboard');
var adminClassTeacherRouter = require('./routes/teacher/classTeacher'); 
/********************************************************************************Class Router*********/
var totalAdminClassRouter = require('./routes/totalAdminClass/totalAdminClass');
/********************************************************************************Subject Router*********/
var subjectRouter = require('./routes/subject/subject');




app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret:'~K]d9@5LEpD}t267',
  resave:false,
  saveUninitialized:true,
}));

var classModule=require('./modules/class');
var studentUserModule=require('./modules/studentUser');
var teacherModule=require('./modules/teacher');

var student_id;
app.get('/room/:id/:student_id', (req, res) => {
  var school_key = req.session.school_session_key;
  abcd = req.params.id;
  student_id = req.params.student_id;
  res.redirect('/'+abcd);
  app.get('/:id',function(req, res, next) {
    var classM=classModule.findOne({room_id:abcd,school_key:school_key});
    classM.exec((err,data)=>{
      if(err) throw err;
      var teacher_id =  data.teacher_id;
      if(student_id==teacher_id)
      {
        var start_date = data.start_date;
        res.render('room', {roomId: req.params.id,teacher_id:"",times:"",start_date:start_date,starts_date:""});
      }else{
        var times = 1;
        var starts_date = data.start_date;
        var teacher_id = data.teacher_id;
        res.render('room', {roomId: req.params.id,teacher_id:teacher_id,times:times,start_date:"",starts_date:starts_date});
      }
    }); 
  });
});

app.get('/get',function(req, res, next) {
  var school_key = req.session.school_session_key;
  var t_id = student_id;
  var studentUser=studentUserModule.findOne({student_id:student_id,school_key:school_key});
  studentUser.exec((err,data)=>{
    if(err) throw err;
    if(err){
      res.send({msg:'error'});
    }else{
      if(data==null){
        var teacher=teacherModule.findOne({teacher_uid:t_id,school_key:school_key});
        teacher.exec((err,datas)=>{
        var teacher_id = datas.teacher_uid;
        var teachername = datas.teachername;
        res.send({msg:'success',student_id:teacher_id,student_name:teachername});
        });
      }else{
        var student_id = data.student_id;
        var student_name = data.student_name;
        res.send({msg:'success',student_id:student_id,student_name:student_name});
      }
    }
  });
});

/********************************************************Index Router****************/
app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
/********************************************************Owner Router****************/
app.use('/owner-dashboard', ownerRouter);
app.use('/owner-panel', ownerPanelRouter);
/********************************************************Admin Router****************/
app.use('/admin-auth',adminAuthRouter);
app.use('/admin-panel', adminPanelRouter);
app.use('/admin-dashboard', adminDashboardRouter);
/******************************************************teacher Router****************/
app.use('/teacher', teacherRouter);
app.use('/teacher-admin-panel', teacherAdminPanelRouter);
app.use('/teacher-admin-dashboard', teacherAdminDashboardRouter);
app.use('/classTeacher', adminClassTeacherRouter);
/******************************************************Student Router****************/
app.use('/studentList', adminStudentListRouter);
app.use('/studentUser', studentUserRouter);
app.use('/getStudentUser', getStudentUserRouter);
app.use('/student-dashboard', studentDashboardRouter);
/********************************************************Class Router****************/
app.use('/totalAdminClass', totalAdminClassRouter);
/********************************************************Subject Router****************/
app.use('/subject', subjectRouter);

module.exports = app;