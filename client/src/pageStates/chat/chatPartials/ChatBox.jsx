import { useState, useEffect, useRef } from "react";
import getCookie from "../../../helpers/getCookie";
import "./ChatBox.css";
import ChatMessage from "./ChatMessage";

export default function ChatBox({ chatObject, socket, userObject }) {
  const [messageInput, setMessageInput] = useState("");
  const [scrolling, setScrolling] = useState(false);
  const [showGotoBottom, setShowGotoBottom] = useState(false);
  const [scriptScrolling, setScriptScrolling] = useState(false);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      setScriptScrolling(true);
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // set scroll position and states after rendering
    setTimeout(() => {
      scrollToBottom();
      setScrolling(false);
      setShowGotoBottom(false);
    }, 200);
  }, []);

  useEffect(() => {
    // scroll chatbox on new message unless user scrolling
    if (!scrolling) {
      scrollToBottom();
    }
    setShowGotoBottom(false);
  }, [chatObject, scrolling]);

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

  const handleMessageContainerScroll = () => {
    if (!scriptScrolling) {
      setScrolling(true);
      setShowGotoBottom(true);
    } else {
      setScriptScrolling(false);
    }
  };

  const handleGotoBottomButton = () => {
    scrollToBottom();
    setTimeout(() => {
      setScrolling(false);
      setShowGotoBottom(false);
    }, 300);
  };

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
                key={message.timestamp}
                message={message}
                userObject={userObject}
              />
            );
          })}
      </div>

      {showGotoBottom && (
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
