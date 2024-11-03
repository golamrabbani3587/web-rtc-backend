// src/socket/videoSocket.js
module.exports = (videoNamespace) => {
    videoNamespace.on("connection", (socket) => {
      console.log("New user connected to video:", socket.id);
  
      socket.on("join-meeting", (meetingId) => {
        socket.join(meetingId);
        videoNamespace.to(meetingId).emit("user-joined", { userId: socket.id });
        console.log(`User ${socket.id} joined meeting ${meetingId}`);
      });
  
      socket.on("offer", (data) => {
        const { meetingId, userId, offer } = data;
        videoNamespace.to(meetingId).emit("offer", { userId, offer });
      });
  
      socket.on("answer", (data) => {
        const { meetingId, userId, answer } = data;
        videoNamespace.to(meetingId).emit("answer", { userId, answer });
      });
  
      socket.on("ice-candidate", (data) => {
        const { meetingId, userId, candidate } = data;
        videoNamespace.to(meetingId).emit("ice-candidate", { userId, candidate });
      });
  
      socket.on("leave-meeting", (meetingId) => {
        socket.leave(meetingId);
        videoNamespace.to(meetingId).emit("user-left", { userId: socket.id });
        console.log(`User ${socket.id} left meeting ${meetingId}`);
      });
  
      socket.on("disconnect", () => {
        console.log("User disconnected from video:", socket.id);
      });
    });
  };
  