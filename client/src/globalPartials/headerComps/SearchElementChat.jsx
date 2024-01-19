import "./SearchElement.css";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { chatObjectProps, userObjectProps } from "../../helpers/propValidation";

SearchElementChat.propTypes = {
  chatObject: PropTypes.shape(chatObjectProps),
  userObject: PropTypes.shape(userObjectProps),
  socket: PropTypes.object,
};

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

  if (chatObject.canJoin && !alreadyParticipant) {
    return (
      <div className="searchElementContainer">
        <h2 className="searchChatName">{chatObject.name}</h2>
        <div className="typeAndJoinButtonContainer">
          <h3>{chatObject.instanceType}</h3>
          <button
            className={"searchResultButton" + (isClicked ? " clicked" : "")}
            onClick={handleJoinChatButton}
          >
            Join Chat
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
