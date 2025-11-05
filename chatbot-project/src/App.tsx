import { useState, useEffect } from 'react';
import { ChatInput } from './components/ChatInput';
import { ChatMessages } from './components/ChatMessages';
import { Chatbot } from 'supersimpledev';
import RobotProfileImg from './assets/robot.png';
import './App.css';

function App() {
  const messages = JSON.parse(localStorage.getItem('messages') ?? '[]');
  const [chatMessages, setChatMessages] = useState(messages);

  useEffect(() => {
    Chatbot.addResponses({
      'goodbye': 'Goodbye. Have a great day!',
      'give me a unique id': function () {
        return `Sure! Here is the unique id : ${crypto.randomUUID()}`;
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
    const messageCount = chatMessages.length;
    document.title = messageCount === 0 ? `Chatbot` : `${ messageCount } Messages`;
  }, [chatMessages]);
  
  // const title = `${ chatMessages.length } Messages`;

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="chatbot-project/src/assets/robot.png" />
      {/* or we can use this */}
      <link rel="icon" type="image/svg+xml" href={RobotProfileImg} />

      <div className="main-container">
        <ChatMessages
          chatMessages={chatMessages}
        />
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      </div>

    </>

  );
};

export default App
