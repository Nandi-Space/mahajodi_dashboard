const express =require('express');
const router =express.Router();
const Auth= require("../middleware/authencation");
const isAuthorized = require("../middleware/authorization");
const db=require('../mysql/dbconnect');
router.get('/user_transcation',function(req,res,next){
    var sql="SELECT a.path1,a.user_id,p.method,p.amount,b.plan_type,b.duration FROM detail_profile a JOIN tbl_payment p on a.user_id=p.user_id JOIN tbl_plan b on p.plan_id=b.id";
    db.query(sql,function(err,data,fields)
    {
       if(err)
       {
        return res.status(400).json({
            status:"failed",
            message:"to get user transcation", 
            data:error
          });
       }
       else{
           
        return res.status(200).json({
            status:"success",
            message:"to get user transcation", 
            data:data
          });

       }
    });
});
router.post('/transcation',function(req,res,next){
    var sql=("SELECT SUM(amount) as transcation from tbl_payment where pay_at BETWEEN ? and ?",[
        req.body.start_date,
        req.body.final_date,
    ]);
    db.query(sql,function(err,data,fields)
    {
       if(err)
       {
        return res.status(400).json({
            status:"failed",
            message:"to get  transcation", 
            data:error
          });
       }
       else{
           
        return res.status(200).json({
            status:"success",
            message:"to get  transcation", 
            data:data
          });

       }
    });
});





module.exports=router;
