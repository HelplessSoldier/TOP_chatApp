import "./FriendReq.css";

export default function FriendReq({ requestingUser, currentUser, socket }) {
  const handleAccept = () => {
    const msg = JSON.stringify({
      message: "Friend request accepted",
      currentUser: currentUser._id,
      targetUser: requestingUser._id,
    });
    socket.send(msg);
    return;
  };

  const handleReject = () => {
    const msg = JSON.stringify({
      message: "Friend request rejected",
      currentUser: currentUser._id,
      targetUser: requestingUser._id,
    });
    socket.send(msg);
    return;
  };

  return (
    <div className="friendReqBlock" key={requestingUser.username}>
      <p className="friendReqUsername">{requestingUser.username}</p>
      <div className="friendreqButtonContainer">
        <button className="hiddenFriendButton" onClick={handleAccept}>
          <img src="./icons/checkmark-svgrepo-com.svg" className="friendIcon" />
        </button>
        <button className="hiddenFriendButton" onClick={handleReject}>
          <img src="./icons/cancel-svgrepo-com.svg" className="friendIcon" />
        </button>
      </div>
    </div>
  );
}
