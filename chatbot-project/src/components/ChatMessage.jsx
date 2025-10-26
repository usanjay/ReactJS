import RobotPP from '../assets/robot.png';
import UserPP from '../assets/user.png';
import './ChatMessage.css'

export function ChatMessage({ message, sender }) {

  return (
    <div className={
      sender === 'robot' ? 'robot-msg msg-box' : 'user-msg msg-box'
    }>
      {sender === 'robot' && (
        <img src={RobotPP} width='45' />
      )}
      <div className='msg'>{message}</div>
      {sender === 'user' && (
        <img src={UserPP} width='45' />
      )}
    </div>
  )
}