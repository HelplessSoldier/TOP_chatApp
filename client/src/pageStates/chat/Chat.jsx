import './Chat.css';
import globals from '../../../../publicGlobals/apiGlobals.json';
import { useEffect } from 'react';

export default function Chat() {

  const wsUri = globals.webSocketUri;
  const socket = new WebSocket(wsUri);

  useEffect(() => {
    socket.onopen = () => {
      console.log(`Websocket open!`)

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log(message);
      }
    }
  })

  return (
    <div>
      <h1>hi from the chat comp!</h1>
    </div>
  )
}
