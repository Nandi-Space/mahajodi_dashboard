const express =require('express');
const router =express.Router();
const Auth= require("../middleware/authencation");
const isAuthorized = require("../middleware/authorization");
const db=require('../mysql/dbconnect');
router.get('/get_subscription',Auth,isAuthorized,function(req,res,next){
    var sql="SELECT(SELECT COUNT(plan_id)  FROM   detail_profile WHERE plan_id=0 ) as free,(SELECT COUNT(plan_id) FROM   detail_profile WHERE plan_id=1  ) AS three_month,(SELECT COUNT(plan_id) FROM   detail_profile WHERE plan_id=2) AS six_month,(SELECT COUNT(plan_id)FROM   detail_profile WHERE plan_id=3) AS premium,(SELECT COUNT(*)FROM   detail_profile) As total_user";
    db.query(sql,function(err,data,fields)
    {
       if(err)
       {
        return res.status(400).json({
            status:"failed",
            message:"user subscription data  ", 
            data:error
          });
       }
       else{
           
        return res.status(200).json({
            status:"success",
            message:"user subscription data ", 
            data:data
          });

       }
    });
});



// get user male female 


router.get('/get_user_data',Auth,isAuthorized,function(req,res,next){
  var sql="SELECT( SELECT COUNT(gender) FROM detail_profile WHERE gender='Male' ) as Male, (SELECT COUNT(gender) FROM detail_profile WHERE gender='Female' ) AS Femaile,(SELECT COUNT(*) FROM detail_profile) As total_user";
  db.query(sql,function(err,data,fields)
  {
     if(err)
     {
      return res.status(400).json({
          status:"failed",
          message:"user subscription data  ", 
          data:error
        });
     }
     else{
         
      return res.status(200).json({
          status:"success",
          message:"user subscription data ", 
          data:data
        });

     }
  });
});

module.exports=router;