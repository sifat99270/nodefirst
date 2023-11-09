const mongoose = require("mongoose");

const mounthSchema = mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "taka",
  },
  mounths: {
    type: Array,
    require: true,
  },
});

module.exports = mongoose.model("mounth", mounthSchema);
