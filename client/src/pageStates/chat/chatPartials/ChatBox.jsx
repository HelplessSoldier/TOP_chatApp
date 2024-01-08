import { useState } from "react";
import "./ChatBox.css";

export default function ChatBox({ chatObject }) {
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(messageInput);
    setMessageInput('');
  };

  const handleMessageChange = (e) => {
    setMessageInput(e.target.value);
  }

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
