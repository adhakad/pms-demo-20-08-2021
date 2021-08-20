const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://pms-demo:@Aa1Bb2Hh3@@cluster0.ngu0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true,useFindAndModify:false,});
var conn =mongoose.Collection;
var classSchema =new mongoose.Schema({
   
    teacher_id:
    {
        type:Number, 
    },
    exist_id:
    {
        type:Number,
    },
    exist_class_name: 
    {
        type:Number,
    },class_name: 
    {
        type:Number,
    },        
    subject_name: 
    {
        type:String, 
    },
    room_id:
    {
        type:Number, 
    },
    school_key:
    {
        type:String,
    },
    start_date:
    {
      type:Number,
      default:1234567890,
    },
    
    exp:{
        type:Date,
        expires:1680,
    },
    
});

var classModel = mongoose.model('class', classSchema);
module.exports=classModel;

//mongodb+srv://pms-demo:@Aa1Bb2Hh3@@cluster0.ngu0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority