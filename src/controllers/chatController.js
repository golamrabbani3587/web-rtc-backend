const Chat = require("../models/Chat");

exports.getChatMessages = async (req, res, next) => {
  try {
    const messages = await Chat.find({ meetingId: req.params.meetingId });
    res.json({ messages });
  } catch (error) {
    next(error);
  }
};
