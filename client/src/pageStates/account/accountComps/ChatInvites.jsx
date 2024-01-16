import ChatInvite from "./ChatInvite";
import "./AccountSections.css";

export default function ChatInvites({ ChatInvites, userObject, socket }) {
  return (
    <div className="accountSectionContainer">
      <h2 className="accountSectionHeader">Chat invites:</h2>
      <hr />
      {userObject.chatInvites.map((chatObject) => (
        <ChatInvite
          key={chatObject._id}
          chatObject={chatObject}
          socket={socket}
        />
      ))}
    </div>
  );
}
