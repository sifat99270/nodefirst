//intranal import
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//external import
const { notFoundHandler, errorHandler } = require("./middlewares/errorHandler");
const router = require("./controller/userController");
const converRouter = require("./controller/converSationControler");
const messageRouter = require("./controller/messageController");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const takaRouter = require("./controller/takaAdd");
const searchRouter = require("./controller/searchControler");
const http = require("http");
const { Server } = require("socket.io");
//init app
const app = express();
//socket server

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: ["http://localhost:5173", "http://localhost:5173"],
});

io.on("connection", (socket) => {
  socket.on("join-room", function (data) {
    socket.join(data);
  });
  socket.on("join-id", function (data) {
    socket.join(data);
  });
  socket.on("send-message", function (datas) {
    io.sockets.in(datas.conversation_id).emit("see-message", datas);
  });
  global.io = socket;
  // .to(data.conversation_id)
  // socket.on("join-id", (id) => {
  // console.log(id);
  //socket.join(id);
  // });
  socket.on("add", (bata) => {
    io.sockets.in(bata.id).emit("get", bata);
  });
  socket.on("addOffice", function (data) {
    io.sockets.in(data.id).emit("getOffice", data);
  });
  socket.on("dayUpdate", (data) => {
    socket.emit("getDayUpdate", data);
  });

  socket.on("officeUpdate", (data) => {
    socket.emit("getOfficeUpdate", data);
  });
  socket.on("dayDelete", (data) => {
    socket.emit("getDayDelete", data);
  });
  socket.on("officeDelete", (data) => {
    socket.emit("getOfficeDelete", data);
  });
  socket.on("disconnect", () => {});
});

//dotenv config
dotenv.config();
//connsct connect
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });
//cors setup
app.use(
  cors({
    origin: ["https://hisabandchat.netlify.app", "http://localhost:5173"],
    methods: "GET,PUT,POST,DELETE",
  })
);
//data parse
app.use();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));
//set default folder
app.use("/images", express.static("public"));
//route handle;
app.get("/", (req, res) => {
  res.status(200).json({
    king: "iam the king",
  });
});
app.use("/user", router);
app.use("/converSation", converRouter);
app.use("/message", messageRouter);
app.use("/takaAddAndGet", takaRouter);
app.use("/search", searchRouter);
//404 handle error
app.use(notFoundHandler);
//main error handler
app.use(errorHandler);

//app run
httpServer.listen(process.env.PORT, () => {
  console.log(`app running port ${process.env.PORT}`);
});
