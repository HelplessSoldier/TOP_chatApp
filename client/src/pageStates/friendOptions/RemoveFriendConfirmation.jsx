import "./RemoveFriendConfirmation.css";

export default function RemoveFriendConfirmation({
  userObject,
  selectedFriend,
  setShowRemoveFriendConfirmation,
}) {
  const handleCloseButton = () => {
    setShowRemoveFriendConfirmation(false);
  };

  const handleConfirm = () => {
    return;
  }

  return (
    <div className="removeFriendConfirmationContainer">
      <div className="removeFriendConfirmationHeader">
        <h1>Removing friend: {selectedFriend.username}</h1>
        <h2>Are you sure?</h2>
      </div>

      <div className="removeFriendConfirmationButtonsContainer" >
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
