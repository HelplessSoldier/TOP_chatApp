import { useState, useEffect } from "react";
import getAccountInfo from "../../helpers/getAccountInfo";
import "./SingleChat.css";
import PropTypes from "prop-types";
import { userObjectProps, chatObjectProps } from "../../helpers/propValidation";

SingleChat.propTypes = {
  userObject: PropTypes.shape(userObjectProps),
  chatObject: PropTypes.shape(chatObjectProps),
  socket: PropTypes.object,
  setUserObject: PropTypes.func,
};

export default function SingleChat({
  userObject,
  chatObject,
  socket,
  setUserObject,
}) {
  const [isCurrentChat, setIsCurrentChat] = useState(false);

  useEffect(() => {
    const chatSelected = userObject.currentChat === chatObject._id;
    setIsCurrentChat(chatSelected);
  }, [userObject, chatObject]);

  const handleSelectChatButton = () => {
    const jwtToken = document.cookie
      .split(";")
      .find((row) => row.startsWith("jwt="))
      .split("=")[1];

    const msg = JSON.stringify({
      message: "Switch chat request",
      token: jwtToken,
      chatId: chatObject._id,
    });

    socket.send(msg);
    setTimeout(async () => {
      // TODO: this should really be triggered by a confirmation from the server
      // that the account has been updated. timeout's hacky but works as long
      // as the client has reasonable latency
      await getAccountInfo().then((data) => setUserObject(data.user));
    }, 50);
  };

  return (
    <div className="singleChatContainer" onClick={handleSelectChatButton}>
      <p className="chatName">{chatObject.chatName}</p>
      {isCurrentChat && <div className="selectedChatDisplay"></div>}
    </div>
  );
}
