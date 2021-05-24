var http =require("http");
var os =require('os');
var app = require("./app");


const server = http.createServer(app);
var myhost =os.hostname();

server.listen(8000,'127.0.0.1',() => {
  console.log(`Server running at 127.0.0.1`);
});


