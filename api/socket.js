// api/socket.js
import { Server } from "socket.io";

let io;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("🚀 Initializing HealHub Fireside Socket Server...");

    io = new Server(res.socket.server, {
      path: "/api/socket",
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    const roomListeners = {};

    io.on("connection", (socket) => {
      console.log("🟢 User connected:", socket.id);

      socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        roomListeners[roomId] = (roomListeners[roomId] || 0) + 1;
        io.to(roomId).emit("updateCount", roomListeners[roomId]);
      });

      socket.on("reaction", ({ roomId, emoji }) => {
        io.to(roomId).emit("newReaction", emoji);
      });

      socket.on("disconnect", () => {
        console.log("🔴 User disconnected:", socket.id);
        for (const roomId in roomListeners) {
          if (roomListeners[roomId] > 0) {
            roomListeners[roomId]--;
            io.to(roomId).emit("updateCount", roomListeners[roomId]);
          }
        }
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("⚡ HealHub Socket server already running");
  }

  res.end();
}
