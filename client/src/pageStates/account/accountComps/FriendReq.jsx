import "./FriendReq.css";

export default function FriendReq({ requestingUser, currentUser }) {

  const handleAccept = () => {
    console.log(`currentUser: ${JSON.stringify(currentUser)}\nrequestingUser: ${JSON.stringify(requestingUser)}`)
    return;
  }

  const handleReject = () => {
    return;
  }

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
