// Interface for a single message
export  interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  messageAt: string; // Can be converted to Date if necessary
}

// Interface for the user details
export interface User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  gender: string;
  lastActive: string; // Can be converted to Date if necessary
  profilePicture: string;
}

// Interface for the entire response
export interface ChatResponse {
  messages: Message[];
  user: User;
}


