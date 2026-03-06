import http from "http";

import { getDB, saveDB } from "./src/db.js";

const server = http.createServer(async (req, res) => {
  if (req.url == "/getdata") {
    res.statusCode = 200;
    res.setHeader("content-type", "text/javascript");

    const data = await getDB();
    res.end(JSON.stringify(data));
  } else if (req.url == "/savedata") {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk.toString();
    });
    req.on("end", async () => {
      await saveDB(JSON.parse(data));
      res.end();
    });
  }
});
server.listen(3000);
