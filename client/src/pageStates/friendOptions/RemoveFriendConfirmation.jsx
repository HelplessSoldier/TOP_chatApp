import "./RemoveFriendConfirmation.css";
import globals from "../../../../publicGlobals/apiGlobals.json";
import { useState } from "react";
import PropTypes from 'prop-types';
import { friendsListProps } from "../../helpers/propValidation";

RemoveFriendConfirmation.propTypes = {
  selectedFriend: PropTypes.shape(friendsListProps),
  setShowRemoveFriendConfirmation: PropTypes.func,
  setPageState: PropTypes.func,
}

export default function RemoveFriendConfirmation({
  selectedFriend,
  setShowRemoveFriendConfirmation,
  setPageState,
}) {
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
      "/friends" +
      "/remove/" +
      selectedFriend._id;

    const response = await fetch(friendDeleteUri, {
      credentials: "include",
      method: "PUT"
    })

    if (response.ok) {
      setPageState("Chat");
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
