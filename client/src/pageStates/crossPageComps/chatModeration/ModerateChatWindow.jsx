import getUsers from "../../../helpers/getUsers";
import { useEffect, useState } from "react";
import "./ModerateChatWindow.css";
import ParticipantView from "./ParticipantView";

export default function ModerateChatWindow({ chatObject, setSelectedChat }) {
  const [participants, setParticipants] = useState([]);

  const handleCloseButton = () => {
    setSelectedChat(null);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const usersArray = await getUsers(chatObject.participants);
      setParticipants(usersArray);
    };
    fetchUsers();
  }, [chatObject]);

  return (
    <div className="chatModerationRoot">
      <div className="chatModerationHeaderContainer">
        <h2 className="chatModerationName">{chatObject.name}:</h2>
        <button
          className="closeModerationWindowButton"
          onClick={handleCloseButton}
        >
          <img
            src="./icons/close-svgrepo-com.svg"
            className="closeModerationWindowIcon"
          />
        </button>
      </div>
      <div className="participantsContainer">
        <h3 className="moderationSectionHeader">Participants</h3>
        {participants.map((userObject) => {
          return (
            <ParticipantView userObject={userObject} key={userObject._id} />
          );
        })}
      </div>
    </div>
  );
}
