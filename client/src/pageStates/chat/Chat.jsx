import "./Chat.css";
import globals from "../../../../publicGlobals/apiGlobals.json";
import { useEffect, useState } from "react";

export default function Chat({ setPageState }) {
  const [responseObject, setResponseObject] = useState(null)

  useEffect(() => {
    const wsUri = globals.webSocketUri;
    const socket = new WebSocket(wsUri);

    socket.onopen = () => {
      socket.onmessage = (event) => {
        const responseJson = JSON.parse(event.data);
        console.log(responseJson);
        if (responseJson.message === "No user") {
          setPageState("LogIn");
        } else {
          setResponseObject(responseJson);
        }
      };
    };

    return () => socket.close();
  }, [setPageState]);

  return (
    <div>
      <h1>hi from the chat comp!</h1>
    </div>
  );
}
