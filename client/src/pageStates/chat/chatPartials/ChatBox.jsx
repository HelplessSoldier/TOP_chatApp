import { useState } from "react";
import getCookie from "../../../helpers/getCookie";
import "./ChatBox.css";
import ChatMessage from "./ChatMessage";

export default function ChatBox({ chatObject, socket, userObject }) {
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() !== "") {
      const tokenCookie = getCookie(document.cookie, "jwt");
      const newChatMessageRequest = {
        message: "New chat message",
        chatId: chatObject._id,
        token: tokenCookie,
        body: messageInput,
      };
      socket.send(JSON.stringify(newChatMessageRequest));
      setMessageInput("");
    }
  };

  const handleMessageChange = (e) => {
    setMessageInput(e.target.value);
  };

  return (
    <div className="chatContainer">
      <div className="messagesContainer">
        {chatObject && chatObject.messages.map((message) => {
          return <ChatMessage key={message._id} message={message} userObject={userObject} />
        })}
      </div>
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
