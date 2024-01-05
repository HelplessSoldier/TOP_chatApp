import './SingleChat.css';

export default function SingleChat({ chatObject }) {
  console.log(chatObject);
  return (
    <div className='singleChatContainer'>
      <p>{chatObject.chatName}</p>
    </div>
  )
}
