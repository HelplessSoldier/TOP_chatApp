import { useState } from "react";
import getCookie from "../../../helpers/getCookie";
import "./ChatBox.css";

export default function ChatBox({ chatObject, socket }) {
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    const tokenCookie = getCookie(document.cookie, "jwt");
    const newChatMessageRequest = {
      message: "New chat message",
      chatId: chatObject._id,
      token: tokenCookie,
      body: messageInput,
    };
    socket.send(JSON.stringify(newChatMessageRequest));
    setMessageInput("");
  };

  const handleMessageChange = (e) => {
    setMessageInput(e.target.value);
  };

  return (
    <div className="chatContainer">
      <div className="messagesContainer"></div>
      <form className="messageInputContainer" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="chatInput"
          name="chatInput"
          value={messageInput}
          onChange={handleMessageChange}
        />
      </form>
    </div>
  );
}
