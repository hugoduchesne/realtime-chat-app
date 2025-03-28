import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import { setupChatSocket } from "./sockets/chat";
import { resolve } from "path";
import cors from "cors";

const app = express();

const isDev = process.env.NODE_ENV !== "production";

app.use(
  cors({
    origin: isDev ? true : ["https://realtime-chat-app-hafu.onrender.com"],
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: isDev ? true : ["https://realtime-chat-app-hafu.onrender.com"],
    methods: ["GET", "POST"],
  },
});

app.use(express.json());

const frontendPath = resolve(__dirname, "../../frontend/dist");
app.use(express.static(frontendPath));

app.get("*", (_req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

io.on("connection", (socket) => {
  setupChatSocket(socket, io);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
