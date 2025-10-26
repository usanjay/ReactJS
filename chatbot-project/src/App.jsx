import { useState, useEffect } from 'react'
import { ChatInput } from './components/ChatInput'
import { ChatMessages } from './components/ChatMessages';
import { Chatbot } from 'supersimpledev';
import './App.css'

function App() {
  const messages = JSON.parse(localStorage.getItem('messages')) || []
  const [chatMessages, setChatMessages] = useState(messages);



  useEffect(() => {
    Chatbot.addResponses({
      'goodbye': 'Goodbye. Have a great day!',
      'give me a unique id': function () {
        return `Sure! Here is the unique id : ${crypto.randomUUID()}`;
      }
    });
  }, [])

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages))
  }, [chatMessages])
  return (
    <div className="main-container">
      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  )
}

export default App
