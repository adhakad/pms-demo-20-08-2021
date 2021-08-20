var express = require('express');
var router = express.Router();
var subjectModule=require('../../modules/subject');

var bodyParser = require('body-parser');
var path = require('path');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
const { check, validationResult } = require('express-validator');
router.use(express.static(__dirname+"./public/"));
router.use(express.static(__dirname+"./public/script/ajax/admin/subject/"));


function checkClass(req,res,next){
  var subject_name =  req.body.subject_name;
  var subject=subjectModule.findOne({subject_name:subject_name});
  subject.exec((err,data)=>{
    if(err) throw err;
    if(data)
    {
     return res.send({redirect: "Class Detail's Already Exist!"});
    }
    next();
  });
} 

router.get('/', function(req, res, next) {
   res.render('./subject/subject');
});

router.post('/post',checkClass,function(req, res, next) {
  var subject_name =  req.body.subject_name; 
  var subject = new subjectModule({
    subject_name: subject_name,
  });
  subject.save((err,doc)=>{
    if(err) throw err;
    res.send({redirect:"Class Detail's Inserted Successfully!"}); 
   });
});

router.get('/get',function(req, res, next) {
  var subject=subjectModule.find({});
  subject.exec((err,data)=>{
    if(err) throw err;
    if(err){
      res.send({msg:'error'});
    }else{
      res.send({msg:'success',data:data});
    }
  }); 
});


router.delete('/delete',function(req, res, next) {
  var id = req.body.id;
  var subject= subjectModule.findByIdAndDelete({_id:id});
  subject.exec((err,data)=>{
    if(err) throw err;
    if(err){
      res.send({msg:'error'});
    }else{
      res.send({msg:'success'});
    }
  }); 
});

module.exports = router;