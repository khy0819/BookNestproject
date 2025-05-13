import React, { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import InputBox from '../components/InputBox';

type MessageType = {
  sender: 'user' | 'bot';
  content: string;
};

const Home: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const handleSend = (text: string) => {
    const newUserMsg = { sender: 'user', content: text };
    setMessages(prev => [...prev, newUserMsg]);

    // 예시 응답 (실제 API로 대체 가능)
    const botResponse = { sender: 'bot', content: '이 부분에 AI 응답이 표시됩니다.' };
    setTimeout(() => {
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <h2>헬스케어 AI 챗봇</h2>
      <ChatWindow messages={messages} />
      <InputBox onSend={handleSend} />
    </div>
  );
};

export default Home;
