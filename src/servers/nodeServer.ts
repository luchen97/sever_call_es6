import * as https from "https";
import * as httpolyglot from "httpolyglot";
import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import express from "express";
import { config } from "../config";
import { roomList } from "../roomManager";

const nodeServer = () => {
  const option = {
    key: fs.readFileSync(config.sslKey),
    cert: fs.readFileSync(config.sslCrt),
  };
  const app = express();
  app.use(express.static("public"));
  app.all("*", (req: any, res: any, next: any) => {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });
  app.get("/checkRoom", (req: any, res: any) => {
    const roomname = req.query.roomname;
    const roomhas = roomList.get(roomname);
    console.log(roomname, roomhas,roomList);

    if (roomhas) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
  const httpsServer = httpolyglot.createServer(option, app);

  return { httpsServer };
};

export { nodeServer };
