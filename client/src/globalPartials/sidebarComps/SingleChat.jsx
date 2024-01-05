import './SingleChat.css';

export default function SingleChat({ userObject, chatObject, socket }) {
  const handleSelectChatButton = () => {
    return;
  }

  return (
    <div className='singleChatContainer'>
      <p className='chatName'>{chatObject.chatName}</p>
      <button className="chatSelectButton" onClick={handleSelectChatButton}>
        <img
          src="./icons/chat-square-svgrepo-com.svg"
          className="chatSelectIcon"
        />
      </button>
    </div>
  )
}
