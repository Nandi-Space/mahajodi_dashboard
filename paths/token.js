const jwt = require("jsonwebtoken");

class token{
  token(){}

  signAccessToken(user){
  try {
       const token = jwt.sign({
          userId:user ,
          token :"access_token"

        },
        process.env.JWT_KEY, {
          expiresIn: "2d",
        }
        );
        return token;
  } catch (error) {
    return error;
  }

}

 signRefreshToken(user){
  try {
    const token = jwt.sign({
      userId:user ,
      token:"refresh_token"

    },
    process.env.JWT_KEY1, {
      expiresIn: "60d",
    }
    );
    return token;
    
  } catch (error) {
    return error;
  }
    
 }


}

module.exports = new token();