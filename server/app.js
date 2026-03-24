import http from "http";
import fs from "fs/promises";

import { getDB, saveDB } from "./db.js";

export default app = http.createServer(async (req, res) => {
  if (req.url == "/getdata") {
    res.statusCode = 200;
    res.setHeader("content-type", "application/json");

    const response = await getDB();
    res.end(response);
  } else if (req.url == "/savedata") {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk.toString();
    });
    req.on("end", async () => {
      await saveDB(data);
      res.end();
    });
  } else if (req.url == "/") {
    const file = await fs.readFile("./index.html");
    res.setHeader("content-type", "text/html");
    res.statusCode = 200;
    res.end(file);
  } else if (req.url == "/main.js") {
    const file = await fs.readFile("./main.js");
    res.setHeader("content-type", "text/javascript");
    res.statusCode = 200;
    res.end(file);
  } else if (req.url == "/style.css") {
    const file = await fs.readFile("./style.css");
    res.setHeader("content-type", "text/css");
    res.statusCode = 200;
    res.end(file);
  } else {
    try {
      const file = await fs.readFile(`.${req.url}`);
      res.setHeader("content-type", "text/javascript");
      res.statusCode = 200;
      res.end(file);
    } catch (err) {
      res.writeHead(404);
      res.end("Not found!");
    }
  }
});
