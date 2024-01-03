import "./SingleFriend.css";

export default function SingleFriend({ friendObject }) {
  return (
    <div className="singleFriendContainer">
      <p className="friendName">{friendObject.username}</p>
      <button className="friendOptionsButton">
        <img
          src="./icons/options-lines-svgrepo-com.svg"
          className="friendOptionsIcon"
        />
      </button>
    </div>
  );
}
