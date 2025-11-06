import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import './ChatInput.css'
import dayjs from 'dayjs';

export type ChatMessageModel = {
  message: string;
  user: 'user' | 'robot';
  id: string;
  time: string | number;
};

interface ChatInputProps {
  chatMessages: ChatMessageModel[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessageModel[]>>;
}

export function ChatInput({ chatMessages, setChatMessages }: ChatInputProps) {

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event: React.ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  // Send Message Function
  async function sendMessage() {
    //Stops if already loading or input is empty
    if (isLoading || inputText === '') {
      return
    }
    setIsLoading(true);

    const newChatMessages: ChatMessageModel[] = [
      ...chatMessages,
      {
        message: inputText,
        user: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]

    setChatMessages(newChatMessages);

    setChatMessages([
      ...newChatMessages,
      {
        message: 'loading...',
        user: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        user: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);

    setInputText('');
    setIsLoading(false);

  }

  function clearMessages() {
    setChatMessages([]);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      sendMessage()
    } else if (event.key === 'Escape') {
      setInputText('');
    }
  }

  return (
    <div className="input-container">
      <input
        className="input-box"
        placeholder='Send a message to chatbox'
        size={30}
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={sendMessage}
        className="send-btn"
      >Send</button>
      <button
        className='clear-btn'
        onClick={clearMessages}
      >Clear</button>
    </div>
  )
}