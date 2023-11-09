const takaSchema = require("../../models/takaAddSchema");
async function takaMiddleWereGet(req, res) {
  try {
    const foundById = await takaSchema
      .find({ id: req.params.id })
      .populate("mounths");
    res.send(foundById);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "data not found",
    });
  }
}

//module exports
module.exports = takaMiddleWereGet;
