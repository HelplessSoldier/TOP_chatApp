import { useState, useEffect, useRef } from "react";
import getCookie from "../../../helpers/getCookie";
import "./ChatBox.css";
import ChatMessage from "./ChatMessage";

export default function ChatBox({ chatObject, socket, userObject }) {
  const [messageInput, setMessageInput] = useState("");
  const [scrolling, setScrolling] = useState(false);
  const messagesContainerRef = useRef(null);

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

  const handleMessageContainerScroll = (e) => {
    setScrolling(true);
  };

  const handleGotoBottomButton = (e) => {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
    setTimeout(() => {
      setScrolling(false);
    }, 300);
  };

  useEffect(() => {
    if (chatObject) {
      if (messagesContainerRef.current && !scrolling) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    }
  }, [chatObject, scrolling]);

  return (
    <div className="chatContainer">
      <div
        className="messagesContainer"
        ref={messagesContainerRef}
        onScroll={handleMessageContainerScroll}
      >
        {chatObject &&
          chatObject.messages.map((message) => {
            return (
              <ChatMessage
                key={message._id}
                message={message}
                userObject={userObject}
              />
            );
          })}
      </div>

      {scrolling && (
        <button className="gotoBottomButton" onClick={handleGotoBottomButton}>
          <img
            className="gotoBottomIcon"
            src="./icons/down-arrow-svgrepo-com.svg"
          />
        </button>
      )}

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
