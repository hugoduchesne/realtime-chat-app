import { Message } from "@/models/Message";

class MessageStore {
  private messages: Message[] = [];

  add(message: Message): void {
    this.messages.push(message);
  }

  getAll(): Message[] {
    return this.messages;
  }

  clear(): void {
    this.messages = [];
  }
}

export const messageStore = new MessageStore();
