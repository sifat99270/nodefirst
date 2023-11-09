const mongoose = require("mongoose");

const takaSchema = mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  mounth: {
    type: String,
    required: true,
  },
  mounths: {
    type: Array,
    require: true,
    ref: "day",
  },
});

module.exports = mongoose.model("taka", takaSchema);
