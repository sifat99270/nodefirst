const mongoose = require("mongoose");

const dateSchema = mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  date: {
    type: String,
    required: "true",
  },
  dates: {
    type: Array,
    require: true,
    ref: "day",
  },
});

module.exports = mongoose.model("date", dateSchema);
