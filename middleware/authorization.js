const pool = require("../mysql/dbconnect");
const isAuthorized = (req, res, next) => {
  if (req.role.admin == 'yes') {
    next();
  }
  else {
    pool.query('SELECT email, password FROM tbl_user where id=?',
      [req.userId],
      function (err, user) {
        console.log(user);
        if (err) return res.status(500).send("There was a problem.");
        if (!user) {
          return res.status(404).send("You must have an account to make this request.");
        }
        if (user[0].email !== req.headers.email) { return res.status(401).send("You are not authorized."); }
        req.email = user[0].email;
        next();
      });
  }

}

module.exports = isAuthorized;