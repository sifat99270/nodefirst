const express = require("express");
const User = require("../models/usersSchema");
const searchRouter = express.Router();

searchRouter.post("/", async (req, res) => {
  const userName = req.body.userName;
  if (userName) {
    const user = await User.find({ name: userName });
    res.status(200).json(user);
  } else {
    res.status(500).json({
      error: "i want user name",
    });
  }
});

module.exports = searchRouter;
