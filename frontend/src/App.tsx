import { useEffect, useState } from "react";
import MessageList from "@/components/chat/MessageList";
import MessageInput from "@/components/chat/MessageInput";
import UsernameScreen from "./components/UsernameScreen";
import socket from "@/socket";
import { Message } from "@/types";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    const handleMessage = (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("message", handleMessage);

    socket.on("chat-history", (history: Message[]) => {
      setMessages(history);
    });

    return () => {
      socket.off("message", handleMessage);
      socket.off("chat-history");
    };
  }, []);

  const handleUsernameSubmit = (name: string) => {
    setUsername(name);
    socket.emit("join", { username: name });
  };

  const handleSendMessage = (text: string) => {
    socket.emit("message", text);
  };

  return (
    <AnimatePresence mode="wait">
      {!username ? (
        <motion.div
          key="username"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <UsernameScreen onSubmit={handleUsernameSubmit} />
        </motion.div>
      ) : !socket.id ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: "var(--color-text)", padding: "2rem" }}
        >
          Connecting...
        </motion.div>
      ) : (
        <motion.main
          key="chat"
          className={"container"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <header className={"header"}>
            <button
              className={"backButton"}
              onClick={() => setUsername(null)}
              aria-label="Go back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <mask
                  id="mask0_208_28"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="25"
                  height="25"
                >
                  <rect x="0.5" y="0.5" width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_208_28)">
                  <path
                    d="M16.5 22.5L6.5 12.5L16.5 2.5L18.275 4.275L10.05 12.5L18.275 20.725L16.5 22.5Z"
                    fill="#B5DEDA"
                  />
                </g>
              </svg>
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
        </motion.main>
      )}
    </AnimatePresence>
  );
}

export default App;
