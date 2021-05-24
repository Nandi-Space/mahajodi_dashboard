const express=require('express');
const router=express.Router();
const db=require('../mysql/dbconnect');
const bcrypt=require('bcrypt');
const jwt= require('jsonwebtoken');
const token=require('./token');

router.post("/login", (req, res, next) => {
  console.log(req.body);
  db.query(
    "SELECT id, email, password from tbl_admin where email =?", [req.body.email],
    function (error, user, fields) {
      
      if (user[0] == null) {
        return res.status(400).json({
          status: "Failed",
          message: "User email doesn't exist",
          error: error,
        });
      }
      finalNodeGeneratedHash = user[0].password.replace('$2y$', '$2b$');
  
      bcrypt.compare(req.body.password, finalNodeGeneratedHash, (err, result) => {
       

        if (result) {
      
        var refreshTokenSecretKey =   token.signRefreshToken(user[0].id);
        var accessTokenSecretKey =   token.signAccessToken(user[0].id);
        console.log(refreshTokenSecretKey);
          const  profiletoken={ 
                    accessToken : accessTokenSecretKey,
                    refreshToken : refreshTokenSecretKey
                   };
          const response = {
            
            "status": "Logged in",
            "token": accessTokenSecretKey,
            "refreshToken": refreshTokenSecretKey,
        }

          return res.status(200).json({
            
            status: "Success",
            message: "User login successfully",
            id: user[0].id,
            email: user[0].email,
            username:user[0].username,
            is_verified:user[0].is_verified,
            token: profiletoken
            
          });
         } else {
          res.status(400).json({
            status: "failure",
            message: "User login failed incorrect password or email",
            id: '',
            email: '',
            is_verified:'',
            token: ''
          });
        }
       
      });
    }
  );
});


//token check


router.post("/checkTokenExpire", (req, res) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.slice(7);
    console.log("this is token", token);
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      const data = decoded;
      if (err) {
        res.status(410).json({
          stats: "Failed",
          message: "Token already expired",
          err,
        });
      } else {
        res.status(200).json({
          stats: "Success",
          message: "Token is not expire yet",
          data,
        });
      }
    });
  }
});

module.exports=router;