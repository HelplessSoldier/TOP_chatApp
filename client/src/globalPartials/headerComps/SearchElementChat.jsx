import "./SearchElement.css";
import { useState, useEffect } from "react";

export default function SearchElementChat({ chatObject, userObject }) {
  const [alreadyParticipant, setAlreadyParticipant] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleJoinChatButton = () => {
    console.log("join chat button pressed");
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
        <h2 className="searchChatName">{chatObject.name}</h2>
        <button className="searchResultButton" onClick={handleJoinChatButton}>
          Join Chat
        </button>
      </div>
    );
  } else {
    return null;
  }
}
