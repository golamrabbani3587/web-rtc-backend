const Meeting = require("../models/Meeting");

exports.createMeeting = async (req, res, next) => {
  try {
    const { title, startTime, adminId, participants } = req.body;
    const formattedData = { title, startTime, adminId, participants };
    const meeting = await Meeting.create(formattedData);
    res.status(201).json({ meeting });
  } catch (error) {
    next(error);
  }
};


exports.getMeetings = async (req, res, next) => {
  try {
    const meetings = await Meeting.find();
    res.json({ meetings });
  } catch (error) {
    next(error);
  }
};

exports.joinMeeting = async (req, res) => {
  let meetingId = req.params.id;
  try {
    const meeting = await Meeting.findById(meetingId);
    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }
    // Add user to the meeting participants list if necessary
    res.json({ success: true, message: "Joined meeting", meeting });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};