import { useEffect, useState } from "react";
import socket from "@/socket";
import { Message } from "@/types"; // Optional, or use inline types

interface Props {
  username: string;
}

export default function Chat({ username }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.emit("join", { username });

    socket.on("chat-history", (history: Message[]) => {
      setMessages(history);
    });

    socket.on("message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat-history");
      socket.off("message");
    };
  }, [username]);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("message", input.trim());
      setInput("");
    }
  };

  return (
    <div>
      <div
        style={{
          maxHeight: 300,
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: 10,
        }}
      >
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.sender.username}:</strong> {msg.message}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
