import "./SingleFriend.css";

export default function SingleFriend({ friendObject }) {

  const handleOptionsButton = () => {
    console.log(friendObject.username, friendObject._id)
    return;
  }

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
