import { User } from "../models/User";

class UserStore {
  private users: Map<string, User> = new Map();

  add(user: User): void {
    this.users.set(user.socketId, user);
  }

  getBySocketId(socketId: string): User | undefined {
    return this.users.get(socketId);
  }

  removeBySocketId(socketId: string): void {
    this.users.delete(socketId);
  }

  getAll(): User[] {
    return Array.from(this.users.values());
  }

  clear(): void {
    this.users.clear();
  }
}

export const userStore = new UserStore();
