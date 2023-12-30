import "./FriendReq.css";

export default function FriendReq({ user }) {
  return (
    <div className="friendReqBlock" key={user.username}>
      <p className="friendReqUsername">{user.username}</p>
      <div className="friendreqButtonContainer">
        <button className="hiddenFriendButton">
          <img src="./icons/checkmark-svgrepo-com.svg" className="friendIcon" />
        </button>
        <button className="hiddenFriendButton">
          <img src="./icons/cancel-svgrepo-com.svg" className="friendIcon" />
        </button>
      </div>
    </div>
  );
}
