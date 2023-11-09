const daySchema = require("../../models/daySchema");

async function takaMiddleWereUpdate(req, res) {
  const id = req.body.id;
  const name = req.body.name;
  const taka = req.body.taka;

  try {
    if (id && name && taka) {
      const update = await daySchema.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            name: name,
            taka: taka,
          },
        }
      );
      const updateRes = await update;
      res.status(200).json({
        updateRes,
        message: "data update successFully",
      });
    } else {
      res.status(500).json({
        error: "data update fail",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "data update fail",
    });
  }
}

module.exports = takaMiddleWereUpdate;
