import React, { useMemo } from "react";


interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
}


const ChatBody = () => {
  return <p>Chat body</p>
};

export default ChatBody;
