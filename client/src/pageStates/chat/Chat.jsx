import "./Chat.css";
import globals from "../../../../publicGlobals/apiGlobals.json";
import { useEffect, useState } from "react";
import getCookie from "../../helpers/getCookie";
import ChatBox from "./chatPartials/ChatBox";
import ModerateChatWindow from "../crossPageComps/chatModeration/ModerateChatWindow";

export default function Chat({
  setPageState,
  setUserObject,
  socket,
  setSocket,
  userObject,
}) {
  const [chatObject, setChatObject] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  const handleGotoModerationButton = () => {
    console.log("goto moderation pressed");
    setSelectedChat(chatObject);
  };

  useEffect(() => {
    const wsUri = globals.webSocketUri;
    const socket = new WebSocket(wsUri);
    setSocket(socket);

    socket.onopen = () => {
      sendChatObjectRequest(socket);

      socket.onmessage = (event) => {
        const responseJson = JSON.parse(event.data);
        switch (responseJson.message) {
          case "No user":
            setPageState("LogIn");
            break;
          case "User successfully verified":
            setUserObject(responseJson);
            break;
          case "Chat found":
            setChatObject(responseJson.chatObject);
            break;
          case "New chat message received":
            addNewChatMessage(responseJson.messageObject, setChatObject);
            break;
          case "Successfully switched chat":
            sendChatObjectRequest(socket);
            break;
          default:
            console.log(responseJson);
        }
      };
    };

    addEventListener("beforeunload", () => {
      const token = getCookie(document.cookie, "jwt");
      const closeMessage = {
        message: "User closed socket",
        token,
      };
      socket.send(JSON.stringify(closeMessage));
    });

    return () => socket.close();
  }, [setPageState, setUserObject, setSocket]);

  useEffect(() => {
    if (userObject && chatObject) {
      if (userObject._id.toString() === chatObject.owner.toString()) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    }
  }, [userObject, chatObject]);

  return (
    <div className="chatRoot">
      <ChatBox
        chatObject={chatObject}
        socket={socket}
        userObject={userObject}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />

      {isOwner && (
        <button
          className="gotoModerationButton"
          onClick={handleGotoModerationButton}
        >
          Go to chat moderation
        </button>
      )}
    </div>
  );
}

function sendChatObjectRequest(socket) {
  const token = getCookie(document.cookie, "jwt");
  const chatObjectRequestMessage = {
    message: "User requesting current chat",
    token,
  };
  socket.send(JSON.stringify(chatObjectRequestMessage));
}

function addNewChatMessage(newMessage, setChatObject) {
  setChatObject((prevChatObject) => {
    return {
      ...prevChatObject,
      messages: [...prevChatObject.messages, newMessage],
    };
  });
}
