const http = require("http");
const fs = require("fs");

const PORT = 8000;
const mockData = fs.readFileSync("./mock-data.json", "utf8");

const server = http.createServer((req, res) => {
  // Check if the request URL matches the perons endpoint
  if (req.url.startsWith("/api/v1/persons")) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "authorization, content-type",
    );
    res.statusCode = 200;
    if (req.method === "GET") {
      res.end(mockData);
    } else {
      res.end();
    }
    console.log(
      `Received ${req.method} request with Auth Header: ${req.headers.authorization}`,
    );
  } else {
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        message:
          "Not Found" +
          "This is a mock backend server for cognito-react-starter and only responds on /api/v1/persons",
      }),
    );
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
