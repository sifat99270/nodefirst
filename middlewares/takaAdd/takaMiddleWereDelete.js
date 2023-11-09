const daySchema = require("../../models/daySchema");

async function takaMiddleWereDelete(req, res) {
  const id = req.body.id;
  try {
    if (id) {
      const deletes = await daySchema.deleteOne({
        _id: id,
      });
      res.status(200).json({
        deletes,
        message: "dat was delete",
      });
    } else {
      res.status(500).json({
        error: "data delete fail 1",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "data delete fail",
    });
  }
}
module.exports = takaMiddleWereDelete;
