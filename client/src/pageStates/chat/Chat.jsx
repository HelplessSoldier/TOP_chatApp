import "./Chat.css";
import globals from "../../../../publicGlobals/apiGlobals.json";
import { useEffect, useState } from "react";
import getCookie from "../../helpers/getCookie";
import ChatBox from "./chatPartials/ChatBox";

export default function Chat({ setPageState, setUserObject, setSocket }) {
  const [chatObject, setChatObject] = useState(null);

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
          default:
            console.log(responseJson.message);
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

  return (
    <div className="chatRoot">
      <ChatBox chatObject={chatObject} />
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
