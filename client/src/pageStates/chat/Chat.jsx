import './Chat.css';
import globals from '../../../../publicGlobals/apiGlobals.json';

export default function Chat() {

  const wsUri = globals.webSocketUri;
  const socket = new WebSocket(wsUri);

  return (
    <div>
      <h1>hi from the chat comp!</h1>
    </div>
  )
}
