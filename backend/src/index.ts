import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import { setupChatSocket } from "./sockets/chat";
import { resolve } from "path";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
