// src/socket/chatSocket.js
const Chat = require("../models/Chat");

module.exports = (chatNamespace) => {
  chatNamespace.on("connection", (socket) => {
    console.log("New user connected to chat:", socket.id);

    socket.on("join-chat", (meetingId) => {
      socket.join(meetingId);
      console.log(`User ${socket.id} joined chat for meeting ${meetingId}`);
    });

    socket.on("send-message", (data) => {
      const { meetingId, userId, message } = data;
      const timestamp = new Date();

      chatNamespace.to(meetingId).emit("receive-message", { userId, message, timestamp });
      saveMessageToDB(meetingId, userId, message, timestamp);
    });

    socket.on("leave-chat", (meetingId) => {
      socket.leave(meetingId);
      console.log(`User ${socket.id} left chat for meeting ${meetingId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected from chat:", socket.id);
    });
  });
};

const saveMessageToDB = async (meetingId, userId, message, timestamp) => {
  try {
    const chat = new Chat({ meetingId, userId, message, timestamp });
    await chat.save();
    console.log("Message saved to database.");
  } catch (error) {
    console.error("Error saving message to database:", error);
  }
};
