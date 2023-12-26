import './Chat.css';
import globals from '../../../../publicGlobals/apiGlobals.json';
import { useEffect } from 'react';

export default function Chat({ setPageState }) {

  const wsUri = globals.webSocketUri;
  const socket = new WebSocket(wsUri);

  useEffect(() => {
    socket.onopen = () => {
      console.log(`Websocket open!`)

      socket.onmessage = (event) => {
        const responseJson = JSON.parse(event.data);
        console.log(responseJson);
        if (responseJson.message === 'No user') {
          setPageState('LogIn');
        }
      }
    }
  })

  return (
    <div>
      <h1>hi from the chat comp!</h1>
    </div>
  )
}
