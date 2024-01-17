import "./KickUserConfirmation.css";
import globals from "../../../../../publicGlobals/apiGlobals.json";

export default function KickUserConfirmation({
  userToKick,
  setUserToKick,
  chatObject,
}) {
  const handleConfirm = () => {
    const kickUserUri =
      globals.serverUri +
      ":" +
      globals.serverPort +
      globals.apiVersion +
      "/chat/kick/" +
      chatObject._id +
      "/" +
      userToKick._id;

    const sendKickRequest = async () => {
      const response = await fetch(kickUserUri, {
        method: "PUT",
        credentials: "include",
      });

      if (response.ok) {
        console.log("kick successful?");
      }
    };

    sendKickRequest();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setUserToKick(null);
  };

  return (
    <div className="kickUserConfirmationContainer">
      <h1>Kicking: {userToKick.username}</h1>
      <h2>Are you sure?</h2>
      <div className="kickUserButtonContainer">
        <button className="kickUserButton" onClick={handleConfirm}>
          <img
            src="./icons/checkmark-svgrepo-com.svg"
            className="kickUserIcon"
          />
        </button>
        <button className="kickUserButton" onClick={handleCancel}>
          <img src="./icons/cancel-svgrepo-com.svg" className="kickUserIcon" />
        </button>
      </div>
    </div>
  );
}
