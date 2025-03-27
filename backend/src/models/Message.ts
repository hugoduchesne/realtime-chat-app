import { User } from "@/models/User";

export interface Message {
  id: string;
  message: string;
  sender: User;
  timestamp: string;
}
