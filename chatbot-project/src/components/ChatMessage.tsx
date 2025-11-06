import dayjs from 'dayjs'
import RobotPP from '../assets/robot.png';
import UserPP from '../assets/profile-1.jpg';
import LoadingSpinner from '../assets/loading-spinner.gif'
import './ChatMessage.css';
import type { ChatMessageModel } from './ChatInput';

type ChatMessageProps = {
  chatMessage: ChatMessageModel;
};
export function ChatMessage({ chatMessage }: ChatMessageProps) {
  return (
    <div className={
      chatMessage.user === 'robot' ? 'robot-msg msg-box' : 'user-msg msg-box'
    }>
      {chatMessage.user === 'robot' && (
        <img src={RobotPP} width='45' />
      )}
      <div className='msg'>
        {
          (chatMessage.message === 'loading...')
            ? (<img className="loading-gif" src={LoadingSpinner} />)
            : (chatMessage.message)
        }

        <div className="msg-time">{
          dayjs(chatMessage.time).format('h:mma')
        }</div>
      </div>
      {chatMessage.user === 'user' && (
        <img className='userProfileImage' src={UserPP} width='45' />
      )}
    </div>
  )
}