import "./ModerateChatWindow.css";

export default function ModerateChatWindow({ chatObject, setSelectedChat }) {
  const handleCloseButton = () => {
    setSelectedChat(null);
  };

  return (
    <div className="chatModerationRoot">
      <p>Hi! this is the chat moderation window for chat: {chatObject.name}</p>
      <button
        className="closeModerationWindowButton"
        onClick={handleCloseButton}
      >
        <img src="./icons/close-svgrepo-com.svg" className="closeModerationWindowIcon" />
      </button>
    </div>
  );
}
