const dateSchema = require("../../models/dateSchema");
async function dayMiddleWereGet(req, res) {
  try {
    const foundById = await dateSchema
      .find({ id: req.params.id })
      .populate("dates");
    res.send(foundById);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "data not found",
    });
  }
}

//module exports
module.exports = dayMiddleWereGet;
