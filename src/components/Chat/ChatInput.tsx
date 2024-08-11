import React, { useState, useMemo } from "react";
import Input from "../ui/Input";
import { BsEmojiSmile } from "react-icons/bs";

const ChatInput = ({ onSend }: { onSend: (message: string) => void }) => {
  const [message, setMessage] = useState("");

  const chatInputComponent = useMemo(() => {
    console.log("render ChatInput");
    return (
      <div className="bg-primary w-full flex align-middle justify-center gap-6 p-4">
        <BsEmojiSmile size={24} className="h-full" />
        <Input
          placeholder="Type something..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-10/12 border-none p-4 text-black"
        />
        <button onClick={()=> onSend(message)}>send</button>
      </div>
    );
  }, [message]); // Re-render only when `message` changes

  return chatInputComponent;
};

export default ChatInput;
