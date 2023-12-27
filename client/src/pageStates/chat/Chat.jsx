import "./Chat.css";
import globals from "../../../../publicGlobals/apiGlobals.json";
import { useEffect, useState } from "react";

export default function Chat({ setPageState, setUserObject }) {
  const [responseObject, setResponseObject] = useState(null)

  useEffect(() => {
    const wsUri = globals.webSocketUri;
    const socket = new WebSocket(wsUri);

    socket.onopen = () => {
      socket.onmessage = (event) => {
        const responseJson = JSON.parse(event.data);
        if (responseJson.message === "No user") {
          setPageState("LogIn");
        } else {
          setResponseObject(responseJson);
          setUserObject(responseJson)
        }
      };
    };

    return () => socket.close();
  }, [setPageState, setUserObject]);

  return (
    <div className="chatRoot">
      <div className="chatContainer">
        <div className="messagesContainer">
        </div>
        <div className="messageInputContainer">
          <textarea className="chatInput" />
          <button className="messageSubmitButton" >Send</button>
        </div>
      </div>
    </div>
  );
}
