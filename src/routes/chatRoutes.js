const express = require("express");
const chatController = require("../controllers/chatController");

const router = express.Router();
router.get("/:meetingId", chatController.getChatMessages);

module.exports = router;
