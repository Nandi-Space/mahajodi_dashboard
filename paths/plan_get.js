const express =require('express');
const router =express.Router();
const Auth= require("../middleware/authencation");
const isAuthorized = require("../middleware/authorization");
const db=require('../mysql/dbconnect');
router.get('/plan_get',function(req,res,next){
    var sql="SELECT * from tbl_plan";
    db.query(sql,function(err,data,fields)
    {
       if(err)
       {
        return res.status(400).json({
            status:"failed",
            message:"to get user plan", 
            data:error
          });
       }
       else{
           
        return res.status(200).json({
            status:"success",
            message:"to get user plan", 
            data:data
          });

       }
    });
});


router.post('/user_plan',function(req,res,next){
  var sql=("SELECT * from detail_profile where id=?",[
    req.body.id,
  ]);
  db.query(sql,function(err,data,fields)
  {
     if(err)
     {
      return res.status(400).json({
          status:"failed",
          message:"to get user data", 
          data:error
        });
     }
     else{
         
      return res.status(200).json({
          status:"success",
          message:"to get user data", 
          data:data
        });

     }
  });
});



module.exports=router;
