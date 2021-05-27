const express =require('express');
const router =express.Router();
const Auth= require("../middleware/authencation");
router.get('/get_country',function(req,res,next){
    var sql="SELECT DISTINCT country from detail_profile";
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




module.exports=router;