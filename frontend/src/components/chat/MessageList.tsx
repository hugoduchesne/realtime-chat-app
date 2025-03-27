import styles from "./MessageList.module.css";
import MessageBubble from "./MessageBubble";
import { Message } from "@/types";
import { useEffect, useRef } from "react";

interface Props {
  messages: Message[];
  currentUserSocketId: string;
}

export default function MessageList({ messages, currentUserSocketId }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.container}>
      <div className={styles.filler} />
      {messages.map((msg, index) => {
        const isSelf = msg.sender.socketId === currentUserSocketId;

        const prevMsg = messages[index - 1];
        const nextMsg = messages[index + 1];

        const isStartOfGroup =
          !isSelf && (!prevMsg || prevMsg.sender.id !== msg.sender.id);
        const isEndOfGroup =
          !isSelf && (!nextMsg || nextMsg.sender.id !== msg.sender.id);

        return (
          <MessageBubble
            key={msg.id}
            message={msg}
            isSelf={isSelf}
            showAvatar={isEndOfGroup}
            showUsername={isStartOfGroup}
          />
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
