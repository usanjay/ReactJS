import { ChatMessage } from './ChatMessage';
import { useAutoScroll } from '../custom-hooks/useAutoScroll'
import './ChatMessages.css'

export function ChatMessages({ chatMessages }) {
  const messageContainerRef = useAutoScroll([chatMessages]);
  return (
    <div className="messages-container"
      ref={messageContainerRef}>
      {
        chatMessages.length === 0
          ? (
            <div className="welcome-msg">Welcome to the chatbot project! Send a message using the textbox below.</div>
          )
          : chatMessages.map(chatMessage => (
            <ChatMessage
              message={chatMessage.message}
              sender={chatMessage.user}
              key={chatMessage.id}
            />
          ))
      }
    </div>
  )
}