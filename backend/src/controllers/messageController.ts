import { v4 as uuid } from "uuid";
import { Message } from "@/models/Message";
import { User } from "@/models/User";

export function createMessage(sender: User, messageContent: string): Message {
  return {
    id: uuid(),
    message: sanitize(messageContent),
    sender,
    timestamp: new Date().toISOString(),
  };
}

function sanitize(text: string): string {
  return text.trim().substring(0, 1000); // Cap to 1000 characters
}
