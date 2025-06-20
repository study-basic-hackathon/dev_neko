const http = require("http");

const server = http.createServer();

server.on("request", function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("Hello dev-neko from cdk 2025-06-20 02:07!");
  res.end();
});

server.listen(3000, "127.0.0.1");
console.log("server listen...");