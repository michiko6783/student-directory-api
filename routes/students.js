var express = require('express');
var router = express.Router();
var Student = require('../models/student');

/* Get a blog post */
router.get('/',function(req,res,next){
 Student.find({},function(err,student){
   if(err){ console.log(err); }

   res.json(student);
 });
});

/* Add a student */
router.post('/',function(req,res,next){

 var newStudent = new Student({
   name: req.body.name
 });

 newStudent.save(function(err, student){
   if(err){
     res.status(500).send({
       status: 'Error',
       error: err
     });
   } else {
     res.status(200).json({
       status: 'OK',
       student: student
     })
   }
 });

});

/* Update a student */
router.patch('/',function(req,res,next){
 Student.find({ _id: req.body.id }, function(err,post){
   if(err) console.log(err);

   post.firstName = req.body.firstName || post.firstName;
   post.lastName = req.body.lastName || post.lastName;

   post.save(function(err,student){
     if(err) console.log(err);

     res.json({
       status: 'updated!',
       updated_student: student
     });
   });
 });
});


/* Delete a student */
router.delete('/',function(req,res,next){

 Post.findByIdAndDelete(req.body.id,function(err,student){
   if(err) console.log(err);
   res.json({
     status: 'deleted!',
     post: student
   });
 });

});

module.exports = router;
