module.exports = (videoNamespace) => {
  videoNamespace.on("connection", (socket) => {
      console.log("New user connected to video:", socket.id);

      socket.on("join-meeting", (meetingId) => {
          socket.join(meetingId);
          videoNamespace.to(meetingId).emit("user-joined", { userId: socket.id });
          console.log(`User ${socket.id} joined meeting ${meetingId}`);
      });

      socket.on("leave-meeting", (meetingId) => {
          socket.leave(meetingId);
          videoNamespace.to(meetingId).emit("user-left", { userId: socket.id });
          console.log(`User ${socket.id} left meeting ${meetingId}`);
      });

      socket.on("signal", (data) => {
          const { meetingId, signalData } = data;
          videoNamespace.to(meetingId).emit("signal", { userId: socket.id, signalData });
      });

      socket.on("disconnect", () => {
          console.log("User disconnected from video:", socket.id);
      });
  });
};
