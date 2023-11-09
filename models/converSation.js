const mongoose = require("mongoose");

const converSationSchema = mongoose.Schema({
  unic: {
    type: String,
    required: true,
  },
  creator_id: {
    id: mongoose.Types.ObjectId,
    name: String,
    avatar: String,
  },
  perticipate_id: {
    id: mongoose.Types.ObjectId,
    name: String,
    avatar: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("converSation", converSationSchema);
