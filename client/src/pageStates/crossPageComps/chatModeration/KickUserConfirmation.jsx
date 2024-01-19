import "./KickUserConfirmation.css";
import globals from "../../../../../publicGlobals/apiGlobals.json";
import PropTypes from "prop-types";
import {
  userObjectProps,
  chatObjectProps,
} from "../../../helpers/propValidation";

KickUserConfirmation.propTypes = {
  userToKick: PropTypes.shape(userObjectProps),
  setUserToKick: PropTypes.func,
  chatObject: PropTypes.shape(chatObjectProps),
};

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
        const message = await response.json();
        if (message.message === "Successfully kicked user") {
          userToKick.username = "Successfully kicked user";
          setUserToKick(null);
        }
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
