const express =require('express');
const router =express.Router();
const db=require('../mysql/dbconnect');
const nodemailer = require('nodemailer');
const { response } = require('express');
router.post('/send_email',function(req,res,next)
{
   console.log(req.body.user_id)
   db.query('SELECT email from tbl_user where id=?',
    [
      
      req.body.user_id,
      
    ] ,
    
   function(err,data,fields)
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
          var  email= data[0].email;
         
            
         
          var transporter = nodemailer.createTransport({
            name: "mail.mahajodi.space",
            host: "mail.mahajodi.space",
            port: 465,
            secure: true,
            auth: {
              // user: process.env.DOMAIN_EMAIL,
              // pass: process.env.EMAIL_PASSWORD,
              user: "Namaste@mahajodi.space",
              pass: '!!MahaJod!!',
            },
          });

          var mailOptions = {
            from: "Namaste@mahajodi.space",
           
            to: email,
            subject: req.body.subject,
            text:req.body.body_part+"\r\n"+"regards:"+"\r\n"+"mahajodi team"+"\r\n"+"Thank you",
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              return  res.status(200).json({
                status:'success',
                message:'email send sucess'+info.response,

               });
            }
          });
 
        }
    });

    
});




// get user male female 




module.exports=router;
