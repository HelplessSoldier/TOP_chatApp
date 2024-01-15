import "./RemoveFriendConfirmation.css";
import globals from "../../../../publicGlobals/apiGlobals.json";
import { useState } from "react";

export default function RemoveFriendConfirmation({
  userObject,
  selectedFriend,
  setShowRemoveFriendConfirmation,
  setPageState,
}) {
  const [showFailure, setShowFailure] = useState(false);
  const handleCloseButton = () => {
    setShowRemoveFriendConfirmation(false);
  };

  const handleConfirm = async () => {
    const friendDeleteUri =
      globals.serverUri +
      ":" +
      globals.serverPort +
      globals.apiVersion +
      "/user" +
      "/friends/" +
      selectedFriend._id;

    const response = await fetch(friendDeleteUri, {
      credentials: "include",
      method: "PUT"
    })

    if (response.ok) {
      setShowFailure(false);
      setPageState("Chat");
    } else {
      setShowFailure(true);
    }
  };

  return (
    <div className="removeFriendConfirmationContainer">
      <div className="removeFriendConfirmationHeader">
        <h1>Removing friend: {selectedFriend.username}</h1>
        <h2>Are you sure?</h2>
      </div>

      <div className="removeFriendConfirmationButtonsContainer">
        <button className="logoutButton" onClick={handleConfirm}>
          <img src="./icons/checkmark-svgrepo-com.svg" className="logoutIcon" />
        </button>
        <button className="logoutButton" onClick={handleCloseButton}>
          <img src="./icons/cancel-svgrepo-com.svg" className="logoutIcon" />
        </button>
      </div>
    </div>
  );
}
