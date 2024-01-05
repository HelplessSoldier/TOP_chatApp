import "./SingleChat.css";

export default function SingleChat({ userObject, chatObject, socket }) {
  const handleSelectChatButton = () => {
    const jwtToken = document.cookie
      .split(";")
      .find((row) => row.startsWith("jwt="))
      .split("=")[1];

    const msg = JSON.stringify({
      message: "Switch chat request",
      token: jwtToken,
      chatId: chatObject._id,
    });

    socket.send(msg);
    console.log('message sent: ', msg)
  };

  return (
    <div className="singleChatContainer">
      <p className="chatName">{chatObject.chatName}</p>
      <button className="chatSelectButton" onClick={handleSelectChatButton}>
        <img
          src="./icons/chat-square-svgrepo-com.svg"
          className="chatSelectIcon"
        />
      </button>
    </div>
  );
}
