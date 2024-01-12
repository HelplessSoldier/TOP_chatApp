import "./SingleFriend.css";

export default function SingleFriend({
  friendObject,
  setSelectedFriend,
  setPageState,
}) {
  const handleOptionsButton = () => {
    setSelectedFriend(friendObject);
    setPageState("FriendOptions");
  };

  return (
    <div className="singleFriendContainer">
      <p className="friendName">{friendObject.username}</p>
      <button className="friendOptionsButton" onClick={handleOptionsButton}>
        <img
          src="./icons/options-lines-svgrepo-com.svg"
          className="friendOptionsIcon"
        />
      </button>
    </div>
  );
}
