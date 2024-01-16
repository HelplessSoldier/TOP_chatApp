import "./SearchElement.css";
import { useState, useEffect } from "react";

export default function SearchElementChat({ chatObject, userObject, socket }) {
  const [alreadyParticipant, setAlreadyParticipant] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleJoinChatButton = () => {
    const jwt = document.cookie
      .split(";")
      .find((row) => row.startsWith("jwt="))
      .split("=")[1];

    const msg = JSON.stringify({
      message: "Join public chat from search",
      chatId: chatObject._id,
      jwt,
    });

    setIsClicked(true);
    socket.send(msg);
  };

  useEffect(() => {
    if (userObject && chatObject) {
      if (userObject.chats.includes(chatObject._id)) {
        setAlreadyParticipant(true);
      }
    }
  }, [userObject, chatObject, setAlreadyParticipant]);

  if (!alreadyParticipant) {
    return (
      <div className="searchElementContainer">
        <h2 className="searchChatName">
          {chatObject.name}
        </h2>
        <button className={"searchResultButton" + (isClicked ? " clicked" : "")} onClick={handleJoinChatButton}>
          Join Chat
        </button>
      </div>
    );
  } else {
    return null;
  }
}
