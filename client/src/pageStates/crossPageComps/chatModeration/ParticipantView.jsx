import "./ParticipantView.css";

export default function ParticipantView({ userObject, setUserToKick }) {
  const handleKickButton = (e) => {
    e.preventDefault();
    setUserToKick(userObject);
  };

  return (
    <div className="participantViewContainer">
      <p className="participantViewName">{userObject.username}</p>
      <button className="participantKickButton" onClick={handleKickButton}>
        Kick User
      </button>
    </div>
  );
}
