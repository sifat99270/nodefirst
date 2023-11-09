const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  text: {
    type: String,
    default: "",
  },
  sender: {
    id: mongoose.Types.ObjectId,
    name: String,
    avatar: String,
  },
  receiver: {
    id: mongoose.Types.ObjectId,
    name: String,
    avatar: String,
  },
  date: {
    type: String,
    default: Date.now(),
  },
  conversation_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Message", messageSchema);
