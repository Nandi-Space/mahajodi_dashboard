var express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
require("dotenv").config();


const be_safe_online=require('./paths/be_safe_online');
const admin_login=require('./paths/admin_login');
const user_data =require('./paths/user_detail');
const plan_data=require('./paths/plan_get');





 


app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: false
}));



app.use('/subscription',be_safe_online);
app.use('/auth',admin_login);
app.use('/get_data',user_data);
app.use('/plan',plan_data);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
  
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, multipart/form-data");
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });



  

  

  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });

module.exports = app;


