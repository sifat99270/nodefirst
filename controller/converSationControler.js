//external import
const converSation = require("../models/converSation");
const Hash = require("../other/hash");
//internal import
const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
//router init
const converRouter = express.Router();
//route
converRouter.post("/", async (req, res, next) => {
  try {
    const unic = req.body.creator_id.id + req.body.perticipate_id.id;
    const unic2 = req.body.perticipate_id.id + req.body.creator_id.id;
    const check = await converSation.find({
      $or: [{ unic: unic }, { unic: unic2 }],
    });
    if (
      check.length === 0 &&
      req.body.creator_id.id !== req.body.perticipate_id.id
    ) {
      const addConverSation = await new converSation({
        unic: unic,
        creator_id: req.body.creator_id,
        perticipate_id: req.body.perticipate_id,
      });
      const userConverSationAdded = await addConverSation.save();
      res.status(200).json(userConverSationAdded);
    } else {
      res.status(400).json({
        unic,
        error: "user taken",
      });
    }
  } catch (err) {
    next(createError(500, "converSation added fail"));
  }
});

converRouter.get("/:userId", async (req, res) => {
  const all = await converSation.find({
    $or: [
      { "creator_id.id": req.params.userId },
      {
        "perticipate_id.id": req.params.userId,
      },
    ],
  });
  if (all.length > 0) {
    res.status(200).json(all);
  } else {
    res.status(500).json({
      error: "conversation not found",
    });
  }
});

module.exports = converRouter;
