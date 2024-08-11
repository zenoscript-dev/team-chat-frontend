import { chatInstance } from "@/api/axios";
import { useAuth } from "@/components/AuthContext";
import ChatBody from "@/components/Chat/ChatBody";
import ChatHeader from "@/components/Chat/ChatHeader";
import ChatInput from "@/components/Chat/ChatInput";
import { Socket } from "socket.io-client";
import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useQuery } from "react-query";
import { io } from "socket.io-client";
import updateConversationStore from "../state/store";

// Memoize components that do not change
const MemoizedChatHeader = React.memo(ChatHeader);
const MemoizedChatBody = React.memo(ChatBody);
const MemoizedChatInput = React.memo(ChatInput);

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  userId: string;
  recipientId: string;
  lastMessage: Message | null;
}
const Chat = () => {
  const socket = useRef<Socket | null>(null);
  const { updateConversationId, updateSenderId, updateReceiverId, senderId, receiverId, conversationId } =
    updateConversationStore((state) => state);
  const { token } = useAuth();

  useEffect(() => {
    const initializeSocket = async () => {
      try {
        socket.current = io(`${import.meta.env.VITE_APP_SOCKET}`, {
          withCredentials: true,
          transports: ["websocket"],
          auth: { token },
          retries: 3,
          autoConnect: true,
          reconnectionAttempts: 4,
          reconnectionDelay: 1000,
        });

        socket.current.on("reply", () => {
          // Handle the reply event
        });

        socket.current.on("error", (error: { message: string }) => {
          console.error("Socket error:", error.message);
        });
      } catch (error) {
        console.error("Failed to initialize socket:", error);
      }
    };

    initializeSocket();

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [token]); // Re-run only when token changes

  const onSend = useCallback(async (message: string) => {
    try {
      if (socket.current) {
        socket.current.emit(
          "one-one-message",
         {
          senderId,
          recipientId: receiverId,
          content: message 
          }
        );
      }
    } catch (error) {
      alert("Failed to send message");
    }
  }, []);

  return (
    <div className="w-full h-screen overflow-y-scroll flex flex-col justify-between">
      <MemoizedChatHeader />
      <MemoizedChatBody />
      <MemoizedChatInput onSend={onSend} />
    </div>
  );
};

export default Chat;
