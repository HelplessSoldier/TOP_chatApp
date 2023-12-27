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
    <div>
      <h1>hi from the chat comp!</h1>
    </div>
  );
}
