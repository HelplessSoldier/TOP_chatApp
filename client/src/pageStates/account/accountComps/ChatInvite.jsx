import "./ChatInvite.css";
import { useState } from "react";
import PropTypes from "prop-types";
import {
  chatObjectProps,
  userObjectProps,
} from "../../../helpers/propValidation";

ChatInvite.propTypes = {
  chatObject: PropTypes.shape(chatObjectProps),
  userObject: PropTypes.shape(userObjectProps),
  socket: PropTypes.object,
}

export default function ChatInvite({ chatObject, userObject, socket }) {
  const [displayed, setDisplayed] = useState(true);

  const handleAccept = () => {
    const message = JSON.stringify({
      message: "Chat invite accepted",
      userId: userObject._id,
      chatId: chatObject.chatid,
    });
    socket.send(message);
    return;
  };

  const handleReject = () => {
    const message = JSON.stringify({
      message: "Chat invite rejected",
      userId: userObject._id,
      chatId: chatObject.chatid,
    });
    socket.send(message);
    return;
  };

  socket.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);
    if (msg.message === "Remove chat invite") {
      const chatToRemoveId = msg.chatId;
      if (chatToRemoveId === chatObject.chatid) {
        setDisplayed(false);
      }
    }
  });

  if (displayed) {
    return (
      <div className="chatInviteContainer">
        <div className="chatInviteTextContainer">
          <p className="chatInviteText">{chatObject.chatName}</p>
          <p className="chatInviteTextSmol">Sent by {chatObject.sentByName}</p>
        </div>

        <div className="friendreqButtonContainer">
          <button className="hiddenChatInviteButton" onClick={handleAccept}>
            <img
              src="./icons/checkmark-svgrepo-com.svg"
              className="chatInviteIcon"
            />
          </button>
          <button className="hiddenChatInviteButton" onClick={handleReject}>
            <img
              src="./icons/cancel-svgrepo-com.svg"
              className="chatInviteIcon"
            />
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
