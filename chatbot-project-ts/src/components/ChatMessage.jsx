import dayjs from 'dayjs'
import RobotPP from '../assets/robot.png';
import UserPP from '../assets/profile-1.jpg';
import './ChatMessage.css'



export function ChatMessage({ message, sender, time }) {
  return (
    <div className={
      sender === 'robot' ? 'robot-msg msg-box' : 'user-msg msg-box'
    }>
      {sender === 'robot' && (
        <img src={RobotPP} width='45' />
      )}
      <div className='msg'>
        {message}
        <div className="msg-time">{
          dayjs(time).format('h:mma')
        }</div>
      </div>
      {sender === 'user' && (
        <img className='userProfileImage' src={UserPP} width='45' />
      )}
    </div>
  )
}