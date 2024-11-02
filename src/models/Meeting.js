const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  title: String,
  startTime: Date,
  adminId: mongoose.Schema.Types.ObjectId,
  participants: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model("Meeting", meetingSchema);
