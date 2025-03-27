import { Server, Socket } from "socket.io";
import { v4 as uuid } from "uuid";
import { createMessage } from "../controllers/messageController";
import { userStore } from "../stores/UserStore";
import { messageStore } from "../stores/MessageStore";

export function setupChatSocket(socket: Socket, io: Server) {
  console.log(`User connected: ${socket.id}`);

  socket.on("join", (data: { username: string }) => {
    const user = { ...data, id: uuid(), socketId: socket.id };

    userStore.add(user);

    const history = messageStore.getAll();
    socket.emit("chat-history", history);
  });

  socket.on("message", (content) => {
    const sender = userStore.getBySocketId(socket.id);
    if (!sender) return;

    const message = createMessage(sender, content);
    messageStore.add(message);

    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    userStore.removeBySocketId(socket.id);
  });
}
