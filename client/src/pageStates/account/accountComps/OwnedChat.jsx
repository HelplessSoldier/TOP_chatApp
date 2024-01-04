import "./OwnedChat.css";

export default function OwnedChat({ chatObject }) {
  console.log(chatObject);
  return (
    <div className="ownedChatContainer">
      <p className="ownedChatName">{chatObject.name}</p>
      <button className="ownedChatOptionsButton">
        <img
          src="./icons/options-lines-svgrepo-com.svg"
          className="ownedChatOptionsIcon"
        />
      </button>
    </div>
  );
}
