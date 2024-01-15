export default function RemoveFriendConfirmation({
  userObject,
  selectedFriend,
  setShowRemoveFriendConfirmation,
}) {
  const handleCloseButton = () => {
    setShowRemoveFriendConfirmation(false);
  };

  return (
    <div className="removeFriendConfirmationContainer">
      <div className="removeFriendConfirmationHeader">
        <h1>Removing friend: {selectedFriend.username}</h1>
        <button
          className="removeFriendConfirmationCancelButton"
          onClick={handleCloseButton}
        >
          <img src="./icons/close-svgrepo-com.svg" />
        </button>
      </div>
    </div>
  );
}
