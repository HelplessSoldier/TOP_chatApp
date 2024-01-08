import "./Chat.css";
import globals from "../../../../publicGlobals/apiGlobals.json";
import { useEffect } from "react";
import getCookie from "../../helpers/getCookie";

export default function Chat({ setPageState, setUserObject, setSocket }) {
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
            setUserObject(responseJson);
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
