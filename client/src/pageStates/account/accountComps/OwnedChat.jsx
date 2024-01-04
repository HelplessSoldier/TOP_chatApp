import { useState } from "react";
import "./OwnedChat.css";

export default function OwnedChat({ chatObject, setSelectedChat }) {

  const handleOptionsButton = (e) => {
    e.preventDefault();
    setSelectedChat(chatObject);
  };

  return (
    <div className="ownedChatContainer">
      <p className="ownedChatName">{chatObject.name}</p>
      <button className="ownedChatOptionsButton" onClick={handleOptionsButton}>
        <img
          src="./icons/options-lines-svgrepo-com.svg"
          className="ownedChatOptionsIcon"
        />
      </button>
    </div>
  );
}
