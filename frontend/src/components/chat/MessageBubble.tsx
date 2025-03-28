import styles from "./MessageBubble.module.css";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Message } from "@/types";

interface Props {
  message: Message;
  isSelf: boolean;
  showAvatar?: boolean;
  showUsername?: boolean;
}

export default function MessageBubble({
  message,
  isSelf,
  showAvatar,
  showUsername,
}: Props) {
  const { sender, message: text } = message;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={clsx(
        styles.bubbleWrapper,
        isSelf ? styles.self : styles.other
      )}
    >
      {!isSelf && showAvatar && (
        <div className={styles.avatar}>
          {/* You could use an SVG icon here */}
          <svg
            viewBox="0 0 24 24"
            fill="var(--color-surface)"
            width="24"
            height="24"
          >
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
          </svg>
        </div>
      )}
      {!isSelf && !showAvatar && <div className={styles.avatarPlaceholder} />}
      <div className={styles.bubbleContent}>
        {!isSelf && showUsername && (
          <div className={styles.username}>{sender.username}</div>
        )}
        <div className={styles.bubble}>{text}</div>
      </div>
    </motion.div>
  );
}
