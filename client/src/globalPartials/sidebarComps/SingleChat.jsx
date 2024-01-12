import getAccountInfo from "../../helpers/getAccountInfo";
import "./SingleChat.css";

export default function SingleChat({ userObject, chatObject, socket, setUserObject }) {
  const isCurrentChat = userObject.currentChat === chatObject._id;

  const handleSelectChatButton = async () => {
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

    const userInfo = await getAccountInfo();
    setUserObject(userInfo.user);
  };

  return (
    <div className="singleChatContainer" onClick={handleSelectChatButton}>
      <p className="chatName">{chatObject.chatName}</p>
      {isCurrentChat && <div className="selectedChatDisplay"></div>}
    </div>
  );
}
