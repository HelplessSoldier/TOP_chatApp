import "./ChatInvite.css";

export default function ChatInvite({ chatObject, socket }) {
  const handleAccept = () => {
    console.log("handle accept");
    return;
  };

  const handleReject = () => {
    console.log("handle reject");
    return;
  };

  return (
    <div className="chatInviteContainer">
      <p className="chatInviteText">
        Invited to chat: {chatObject.chatName}. Sent by {chatObject.sentByName}
      </p>
      <div className="friendreqButtonContainer">
        <button className="hiddenChatInviteButton" onClick={handleAccept}>
          <img
            src="./icons/checkmark-svgrepo-com.svg"
            className="chatInviteIcon"
          />
        </button>
        <button className="hiddenChatInviteButton" onClick={handleReject}>
          <img
            src="./icons/cancel-svgrepo-com.svg"
            className="chatInviteIcon"
          />
        </button>
      </div>
    </div>
  );
}
