import "./FriendReq.css";

export default function FriendReq({ requestingUser }) {

  const handleAccept = () => {
    return;
  }

  const handleReject = () => {
    return;
  }

  return (
    <div className="friendReqBlock" key={requestingUser.username}>
      <p className="friendReqUsername">{requestingUser.username}</p>
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
