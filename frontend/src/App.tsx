import { useEffect, useState } from "react";
import MessageList from "@/components/chat/MessageList";
import MessageInput from "@/components/chat/MessageInput";
import UsernameScreen from "./components/UsernameScreen";
import socket from "@/socket";
import { Message } from "@/types";

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    const handleMessage = (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  const handleUsernameSubmit = (name: string) => {
    setUsername(name);
    socket.emit("join", { username: name });
  };

  const handleSendMessage = (text: string) => {
    socket.emit("message", text);
  };

  if (!username) {
    return <UsernameScreen onSubmit={handleUsernameSubmit} />;
  }

  if (!socket.id) {
    return (
      <div style={{ color: "var(--color-text)", padding: "2rem" }}>
        Connecting...
      </div>
    );
  }

  return (
    <main className={"container"}>
      <header className={"header"}>
        <button
          className={"backButton"}
          onClick={() => setUsername(null)}
          aria-label="Go back"
        >
          ←
        </button>
        <h1 className={"title"}>Direct messages</h1>
      </header>
      <MessageList messages={messages} currentUserSocketId={socket.id} />
      <MessageInput
        value={messageInput}
        onChange={setMessageInput}
        onSubmit={() => {
          handleSendMessage(messageInput);
          setMessageInput("");
        }}
      />
    </main>
  );
}

export default App;
