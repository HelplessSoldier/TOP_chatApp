import "./ChatMessage.css";

export default function ChatMessage({ message, userObject }) {
  const isCurrentUser = message.sentById === userObject._id;
  const parsedTimeStamp = new Date(message.timestamp);
  const formattedTimestamp = parsedTimeStamp.toLocaleString();

  return (
    <div className="chatBoxRoot">
      <div className={(isCurrentUser ? "user" : "") + "ChatBoxContainer"}>
        <p className="chatUsername" >{message.sentByUsername}:</p>
        <p className="chatBody">{message.messageBody}</p>
      </div>
      <p className={isCurrentUser ? "chatTimestampUser" : "chatTimestamp"}>
        {formattedTimestamp}
      </p>
    </div>
  );
}
