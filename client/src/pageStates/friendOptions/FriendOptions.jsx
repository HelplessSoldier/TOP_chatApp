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
        <button onClick={handleExitButton}>exit</button>
        <h1>
          hi from the friend options pageState! selectedfriend is{" "}
          {JSON.stringify(selectedFriend)}
        </h1>
      </div>
    </div>
  );
}
