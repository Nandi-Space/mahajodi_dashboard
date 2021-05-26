var mysql=require('mysql');

var con = mysql.createConnection({
  host: "162.241.225.57",
  user: "emusklan_mahajod",
  password: "Nandi4780",
  port:3306,
  database: "emusklan_mahajodi"
});

  con.connect(function(err) {
  if (err) {
    
    console.log('caught this error: ' + err.toString());
  }
  console.log("Connected!");
});


module.exports = con;
