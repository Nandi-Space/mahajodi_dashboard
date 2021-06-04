const express =require('express');
const router =express.Router();
const db=require('../mysql/dbconnect');
const current_date=new Date();
const Auth= require("../middleware/authencation");
const isAuthorized = require("../middleware/authorization");
const authencation = require('../middleware/authencation');
router.get('/user',function(req,res,next){
    
    var sql="SELECT tbl_user.id,tbl_user.username,detail_profile.country,detail_profile.date_of_subscription,tbl_plan.plan_type ,tbl_plan.duration from tbl_user JOIN detail_profile on tbl_user.id=detail_profile.user_id JOIN tbl_plan on detail_profile.plan_id=tbl_plan.id";
    db.query(sql,function(err,data,fields)
    {
       if(err)
       {
        return res.status(400).json({
            status:"failed",
            message:"cant get user detail", 
            data:error
          });
       }
       else{
           
        return res.status(200).json({
            status:"success",
            message:"user data", 
            data:data
          });

       }
    });
});

router.patch('/insert',function(req,res,next)
{


   var sql=('select id from detail_profile where user_id=?',[req.body.user_id,]);
   db.query(sql,function(err,data,fields)
   {
      if(err)
      {
       return res.status(400).json({
           status:"failed",
           message:"no data found", 
           data:error
         });
      }
      else{
          

         console.log(req.body.plan_id)
         db.query('update detail_profile set plan_id=?,date_of_subscription=? where user_id=?',
          [
            
             req.body.plan_id,
           current_date,
             req.body.user_id,
          ] ,
          
         function(err,data,fields)
          {
             if(err)
             {
              return res.status(400).json({
                  status:"failed",
                  message:"subscription adding ", 
                  error:err,
                  
                });
             }
             else{
                 
              return res.status(200).json({
                  status:"success",
                  message:"subscription adding", 
                            
                });
      
             }
          });
       

      }
   });


  

    
});


router.delete('/delete',function(req,res,next)
{
   console.log(req.body.plan_id)
   db.query('delete tbl_user,detail_profile from tbl_user inner join detail_profile on tbl_user.id=detail_profile.user_id where tbl_user.id=?',
    [
      
      req.body.user_id,
    ] ,
    
   function(err,data,fields)
    {
       if(err)
       {
        return res.status(400).json({
            status:"failed",
            message:"user deleted", 
            error:err,
            
          });
       }
       else{
           
        return res.status(200).json({
            status:"success",
            message:"user deleted", 
                      
          });

       }
    });

    
});


module.exports=router;
