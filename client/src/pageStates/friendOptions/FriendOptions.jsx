import "./FriendOptions.css";

export default function FriendOptions({
  selectedFriend,
  setSelectedFriend,
  setPageState,
}) {
  const handleExitButton = () => {
    setSelectedFriend(null);
    setPageState("Chat");
    return;
  };

  return (
    <div className="friendOptionsContainer">
      <div className="friendOptionsHeaderAndExitContainer">
        <h1>
          {selectedFriend.username}
        </h1>
        <button className="friendOptionsExitButton" onClick={handleExitButton}>
          <img
            className="friendOptionsExitIcon"
            src="./icons/close-svgrepo-com.svg"
          />
        </button>
      </div>
      <hr />
    </div>
  );
}
