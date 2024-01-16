import "./ChatInvite.css";

export default function ChatInvite({ chatObject, userObject, socket }) {
  const handleAccept = () => {
    const message = JSON.stringify({
      message: "Chat invite accepted",
      userId: userObject._id,
      chatId: chatObject.chatid,
    });
    socket.send(message)
    return;
  };

  const handleReject = () => {
    const message = JSON.stringify({
      message: "Chat invite rejected",
      userId: userObject._id,
      chatId: chatObject.chatid,
    });
    socket.send(message)
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
