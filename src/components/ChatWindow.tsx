import React from 'react';
import Message from './Message';
import './ChatWindow.css';

type MessageType = {
  sender: 'user' | 'bot';
  content: string;
};

interface ChatWindowProps {
  messages: MessageType[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((msg, idx) => (
        <Message key={idx} sender={msg.sender} content={msg.content} />
      ))}
    </div>
  );
};

export default ChatWindow;
