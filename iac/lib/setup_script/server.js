const http = require("http");

const server = http.createServer();

server.on("request", function (req, res) {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  const apiKeySample = apiKey ? apiKey.substring(0, 5) : 'Not found';
  
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write(`Hello dev-neko from cdk 2025-06-20 02:07!\nGoogle GenAI API Key sample: ${apiKeySample}`);
  res.end();
});

server.listen(3000, "127.0.0.1");
console.log("server listen...");