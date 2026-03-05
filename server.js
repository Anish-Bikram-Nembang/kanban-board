import http from "http";
import fs from "fs";
import path from "path";

const server = http.createServer(async (req, res) => {
  const filePath = req.url === "/" ? "./index.html" : "." + req.url;
  const fileExtension = path.extname(filePath);

  let contentType = "text/plain";
  if (fileExtension === ".html") {
    contentType = "text/html";
  } else if (fileExtension === ".css") {
    contentType = "text/css";
  } else if (fileExtension === ".js") {
    contentType = "text/javascript";
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.statusCode = 404;
      res.end("Not Found");
    } else {
      res.setHeader("content-type", contentType);
      res.end(content);
    }
  });
  const data = await fs.promises.readFile("./main.js");
  console.log(data.toString());
});
server.listen(3000);
