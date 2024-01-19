import "./ParticipantView.css";
import PropTypes from "prop-types";
import {
  userObjectProps,
  chatObjectModerationProps
} from "../../../helpers/propValidation";

ParticipantView.propTypes = {
  userObject: PropTypes.shape(userObjectProps),
  setUserToKick: PropTypes.func,
  chatObject: PropTypes.shape(chatObjectModerationProps),
}

export default function ParticipantView({
  userObject,
  setUserToKick,
  chatObject,
}) {
  const handleKickButton = (e) => {
    e.preventDefault();
    setUserToKick(userObject);
  };

  return (
    <div className="participantViewContainer">
      <p className="participantViewName">{userObject.username}</p>
      {chatObject.owner !== userObject._id && (
        <button className="participantKickButton" onClick={handleKickButton}>
          Kick User
        </button>
      )}
    </div>
  );
}
