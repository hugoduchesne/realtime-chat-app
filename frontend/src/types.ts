export interface User {
  id: string;
  username: string;
  socketId: string;
}

export interface Message {
  id: string;
  message: string;
  sender: User;
  timestamp: string;
}
