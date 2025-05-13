import React from 'react';
import './Message.css';

interface MessageProps {
  sender: 'user' | 'bot';
  content: string;
}

const Message: React.FC<MessageProps> = ({ sender, content }) => {
  return (
    <div className={`message ${sender}`}>
      <p>{content}</p>
    </div>
  );
};

export default Message;
