// server.js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("🔥 User connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    const count = io.sockets.adapter.rooms.get(roomId)?.size || 1;
    io.to(roomId).emit("updateCount", count);
  });

  socket.on("reaction", ({ roomId, emoji }) => {
    io.to(roomId).emit("newReaction", emoji);
  });

  socket.on("disconnecting", () => {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        const count = (io.sockets.adapter.rooms.get(room)?.size || 1) - 1;
        io.to(room).emit("updateCount", count);
      }
    }
  });
});

server.listen(5000, () => console.log("💬 HealHub Fireside Live Server running on port 5000"));
