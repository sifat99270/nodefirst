const mongoose = require("mongoose");

const daySchema = mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  taka: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    required: true,
  },
  mounth: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("day", daySchema);
