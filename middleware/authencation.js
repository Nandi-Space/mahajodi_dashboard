const jwt = require('jsonwebtoken');
require("dotenv").config();


module.exports = (req, res, next) => {
 
  let token = req.headers.authorizationheader;
  console.log(token)
  if (token) {
    token = token.slice(7);

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        console.log(`**************expire name : ${err.name}`)
        return res.status(401).json({
          status_code:"401",
          success: 0,
          message: "Invalid Token..."
        });
      } else {
        console.log(decoded)
        req.userId = decoded.userId;
        req.role = decoded
        next();

      }
    });
  } else {
    return res.status(401).json({
      status_code:"401",
      success: 0,
      message: "Access Denied! Unauthorized User"
    });
  }
}
