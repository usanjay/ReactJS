import { useState} from 'react'
import {Chatbot} from 'supersimpledev';
import LoadingSpinner from '../assets/loading-spinner.gif'
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages }) {

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState();

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === '') {
      return
    }
    setIsLoading(true);
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        user: 'user',
        id: crypto.randomUUID()
      }
    ]

    setChatMessages(newChatMessages);
    setInputText('');

    setChatMessages([
      ...newChatMessages,
      {
        message: (<img className="loading-gif" src={LoadingSpinner} />),
        user: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        user: 'robot',
        id: crypto.randomUUID()
      }
    ]);
    setIsLoading(false);

  }

  function handleKeyDown(event) {
    event.key === 'Enter' && sendMessage();
    event.key === 'Escape' && setInputText('');
  }

  return (
    <div className="input-container">
      <input
        className="input-box"
        placeholder='Send a message to chatbox'
        size='30'
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={sendMessage}
        className="send-btn"
      >Send</button>
    </div>
  )
}