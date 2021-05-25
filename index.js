var http =require("http");
var os =require('os');
var app = require("./app");


const server = http.createServer(app);
var myhost =os.hostname();

server.listen(3000,() => {
  console.log(`Server running`);
});


