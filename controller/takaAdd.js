const express = require("express");
const takaMiddleWere = require("../middlewares/takaAdd/takaMiddleWares");
const takaMiddleWereGet = require("../middlewares/takaAdd/takaMiddleWereGet");
const dayMiddleWereGet = require("../middlewares/takaAdd/dayMiddleWere");
const takaMiddleWereUpdate = require("../middlewares/takaAdd/takaMiddlewereUpdate");
const takaMiddleWereDelete = require("../middlewares/takaAdd/takaMiddleWereDelete");
const officeSchema = require("../models/officeScheama");
const userSchema = require("../models/usersSchema");
const daySchema = require("../models/daySchema");
//router
const takaRouter = express.Router();

//route
takaRouter.post("/", takaMiddleWere);
takaRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const find = await daySchema.find({ id: id });
  if (find.length > 0) {
    res.status(200).json(find);
  } else {
    res.status(200).json({
      message: "no data found",
    });
  }
});
//router office
takaRouter.post("/office", async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const taka = req.body.taka;
  const date = req.body.date;
  const mounth = req.body.mounth;
  const time = req.body.time;
  try {
    if (id && name && taka && date && mounth && time) {
      const user = await userSchema.find({ _id: id });
      if (user.length > 0) {
        const preparation = new officeSchema({
          id,
          name,
          taka,
          date,
          mounth,
          time,
        });
        const save = await preparation.save();
        if (save) {
          res.status(200).json(save);
        }
      } else {
        res.status(404).json({
          error: "user not find",
        });
      }
    } else {
      res.status(500).json({
        error: "please check data",
      });
    }
  } catch (err) {
    res.status(404).json({
      error: err.message,
    });
  }
});
takaRouter.get("/office/:id", async (req, res) => {
  const id = req.params.id;
  const checkId = await userSchema.find({ _id: id });
  if (checkId.length > 0) {
    const allHisab = await officeSchema.find({ id: id });
    if (allHisab.length > 0) {
      res.status(200).json(allHisab);
    } else {
      res.status(200).json({
        message: "no data found",
      });
    }
  } else {
    res.status(500).json({
      error: "user not find",
    });
  }
});
takaRouter.put("/office", async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const taka = req.body.taka;
  const search = await officeSchema.updateOne(
    { _id: id },
    { $set: { name: name, taka: taka } }
  );
  if (search.matchedCount === 1) {
    res.status(200).json({ message: "data update", search });
  } else {
    res.status(200).json({ message: "your id not valid" });
  }
});
takaRouter.delete("/office/:id", async (req, res) => {
  const id = req.params.id;
  const deletes = await officeSchema.deleteOne({ _id: id });
  if (deletes.deletedCount === 1) {
    res.status(200).json({ message: "data was deleted" });
  } else {
    res.status(200).json({ message: "data data not found" });
  }
});
//get route mounth and date
takaRouter.get("/mounth/:id", takaMiddleWereGet);
takaRouter.get("/day/:id", dayMiddleWereGet);
//update route
takaRouter.put("/", takaMiddleWereUpdate);

// delete data
takaRouter.delete("/", takaMiddleWereDelete);
//module export
module.exports = takaRouter;
