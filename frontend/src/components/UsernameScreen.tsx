import { useState } from "react";
import styles from "./UsernameScreen.module.css";

interface Props {
  onSubmit: (username: string) => void;
}

export default function UsernameScreen({ onSubmit }: Props) {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <div className={styles.screen}>
      <div className={styles.box}>
        <h2 className={styles.title}>Welcome</h2>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          autoFocus
        />
        <button className={styles.button} onClick={handleSubmit}>
          Join chat
        </button>
      </div>
    </div>
  );
}
