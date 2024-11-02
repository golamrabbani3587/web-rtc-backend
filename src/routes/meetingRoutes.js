const express = require("express");
const meetingController = require("../controllers/meetingController");

const router = express.Router();
router.get("/join/:id", meetingController.joinMeeting);
router.post("/create", meetingController.createMeeting);
router.get("/", meetingController.getMeetings);

module.exports = router;
