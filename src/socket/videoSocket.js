// src/socket/videoSocket.js
module.exports = (videoNamespace) => {
    videoNamespace.on("connection", (socket) => {
        console.log("New user connected to video:", socket.id);

        // User joins a meeting
        socket.on("join-meeting", ({ meetingId, userId }) => {
            socket.join(meetingId);
            videoNamespace.to(meetingId).emit("user-joined", { userId: socket.id });
            console.log(`User ${socket.id} joined meeting ${meetingId}`);
        });

        // Handle an offer sent by a user to another specific user
        socket.on("offer", (data) => {
            const { meetingId, targetUserId, offer } = data;
            // Send the offer only to the specific target user in the meeting
            videoNamespace.to(targetUserId).emit("offer", { userId: socket.id, offer });
        });

        // Handle an answer sent by a user to another specific user
        socket.on("answer", (data) => {
            const { meetingId, targetUserId, answer } = data;
            // Send the answer only to the specific target user in the meeting
            videoNamespace.to(targetUserId).emit("answer", { userId: socket.id, answer });
        });

        // Relay ICE candidates from one user to another
        socket.on("ice-candidate", (data) => {
            const { meetingId, targetUserId, candidate } = data;
            // Send the ICE candidate only to the specific target user in the meeting
            videoNamespace.to(targetUserId).emit("ice-candidate", { userId: socket.id, candidate });
        });

        // User leaves the meeting
        socket.on("leave-meeting", (meetingId) => {
            socket.leave(meetingId);
            videoNamespace.to(meetingId).emit("user-left", { userId: socket.id });
            console.log(`User ${socket.id} left meeting ${meetingId}`);
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            console.log("User disconnected from video:", socket.id);
        });
    });
};
