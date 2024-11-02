// src/index.js
const express = require("express");
const http = require("http");
const mongoose = require("./config/db");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const meetingRoutes = require("./routes/meetingRoutes");
const chatRoutes = require("./routes/chatRoutes");
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors');

dotenv.config();

const app = express();
const server = http.createServer(app);

// CORS options configuration
const corsOptions = {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"], // Specify the allowed methods
    credentials: true, // Allow credentials if necessary
};

// Apply CORS middleware to Express
app.use(cors(corsOptions));

// Socket.IO instance with CORS options
const io = require("socket.io")(server, {
    cors: {
        origin: ["http://localhost:3000", "https://88da-37-111-227-86.ngrok-free.app"], // Allow multiple origins
        methods: ["GET", "POST"],
        credentials: true,
    },
});

app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/chat", chatRoutes);

// Socket.io integrations for chat and video
const videoNamespace = io.of("/video");
require("./socket/videoSocket")(videoNamespace); // Integrate videoSocket.js for '/video'

const chatNamespace = io.of("/chat");
require("./socket/chatSocket")(chatNamespace); // Integrate chatSocket.js for '/chat'

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
