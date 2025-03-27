import React from "react";
import styles from "./MessageInput.module.css";

interface MessageInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

export default function MessageInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Your message...",
}: MessageInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSubmit();
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      {value.trim() !== "" && (
        <button
          className={styles.sendButton}
          onClick={onSubmit}
          aria-label="Send message"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
          </svg>
        </button>
      )}
    </div>
  );
}
