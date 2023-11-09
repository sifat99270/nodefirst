//external import
const message = require("../models/messageSchema");
const createError = require("http-errors");
//internal import
const express = require("express");
const { socket } = require("server/router");
//router init
const messageRouter = express.Router();
//route
messageRouter.post("/", async (req, res, next) => {
  try {
    const addMessage = new message({
      sender: req.body.sender,
      receiver: req.body.receiver,
      conversation_id: req.body.conversation_id,
      text: req.body.text,
      date: req.body.date,
    });
    const messageAddad = await addMessage.save();
    // global.io.emit("see-message", {
    //  messageAddad,
    // });
    res.status(200).json(messageAddad);
  } catch (err) {
    next(createError(500, "message didnt added"));
  }
});
messageRouter.get("/:id", async (req, res, next) => {
  const allMessage = await message.find({
    conversation_id: req.params.id,
  });
  if (allMessage.length > 0) {
    res.status(200).json(allMessage);
  } else {
    res.status(200).json({
      message: "no message here",
    });
  }
});

module.exports = messageRouter;
