import './ChatMessage.css';

export default function ChatMessage({ message, userObject }) {
  return (
    <div className='chatMessageContainer'>
      <p>{message.sentByUsername}</p>
      <p>{message.messageBody}</p>
      <p>{message.timestamp}</p>
    </div>
  )
}
