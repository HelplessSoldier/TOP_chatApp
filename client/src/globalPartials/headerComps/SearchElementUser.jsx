import { useEffect, useState } from "react";
import "./SearchElement.css";

export default function SearchElementUser(inputs) {
  const [alreadySent, setAlreadySent] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const user = inputs.user;
  const socket = inputs.socket;
  const userObject = inputs.userObject;

  useEffect(() => {
    if (userObject.sentFriendRequests.includes(user._id)) {
      setAlreadySent(true);
    }
  }, [user, userObject]);

  const handleFriendRequest = () => {
    const responseObject = {
      message: "Friend request sent",
      sentById: userObject._id,
      targetId: user._id,
    };
    socket.send(JSON.stringify(responseObject));
    setIsClicked(true);
  };

  return (
    <div className="searchElementContainer">
      <h2 className="usernameHeader">{user.username}</h2>
      {!alreadySent ? (
        <button
          className={"searchResultButton" + (isClicked ? " clicked" : "")}
          onClick={handleFriendRequest}
        >
          Send Friend Request
        </button>
      ) : (
        <p>Already Sent!</p>
      )}
    </div>
  );
}
