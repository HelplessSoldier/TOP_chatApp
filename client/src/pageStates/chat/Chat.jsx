import "./Chat.css";
import globals from "../../../../publicGlobals/apiGlobals.json";
import { useEffect, useState } from "react";

export default function Chat({ setPageState, setUserObject, setSocket }) {
  const [responseObject, setResponseObject] = useState(null);

  useEffect(() => {
    const wsUri = globals.webSocketUri;
    const socket = new WebSocket(wsUri);
    setSocket(socket);

    socket.onopen = () => {
      socket.onmessage = (event) => {
        const responseJson = JSON.parse(event.data);

        switch (responseJson.message) {
          case "No user":
            setPageState("LogIn");
            break;
          case "User successfully verified":
            setResponseObject(responseJson);
            setUserObject(responseJson);
            break;
          default:
            console.log(responseJson.message);
        }
      };
    };
    return () => socket.close();
  }, [setPageState, setUserObject, setSocket]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const message = e.target.chatInput.value;
    console.log(message);
  };

  return (
    <div className="chatRoot">
      <div className="chatContainer">
        <div className="messagesContainer"></div>
        <form className="messageInputContainer" onSubmit={handleSendMessage}>
          <input type="text" className="chatInput" name="chatInput" />
        </form>
      </div>
    </div>
  );
}
