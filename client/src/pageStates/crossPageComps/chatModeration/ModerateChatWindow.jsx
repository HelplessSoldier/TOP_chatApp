import getUsers from "../../../helpers/getUsers";
import { useEffect, useState } from "react";
import "./ModerateChatWindow.css";
import ParticipantView from "./ParticipantView";
import KickUserConfirmation from "./KickUserConfirmation";
import DeleteChatConfirmation from "./DeleteChatConfirmation";

export default function ModerateChatWindow({ chatObject, setSelectedChat }) {
  const [participants, setParticipants] = useState([]);
  const [userToKick, setUserToKick] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleCloseButton = (e) => {
    e.preventDefault();
    setSelectedChat(null);
  };

  const handleDeleteChatButton = (e) => {
    e.preventDefault();
    setShowDeleteConfirmation(true);
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
      {showDeleteConfirmation && (
        <DeleteChatConfirmation
          chatObject={chatObject}
          setShowDeleteConfirmation={setShowDeleteConfirmation}
        />
      )}
      {userToKick && (
        <KickUserConfirmation
          userToKick={userToKick}
          setUserToKick={setUserToKick}
          chatObject={chatObject}
        />
      )}
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
            <ParticipantView
              userObject={userObject}
              setUserToKick={setUserToKick}
              chatObject={chatObject}
              key={userObject._id}
            />
          );
        })}
      </div>
      <div className="dangerZoneContainer">
        <h2 className="dangerZoneHeader">Danger Zone:</h2>
        <button className="deleteChatButton" onClick={handleDeleteChatButton}>
          Delete Chat
        </button>
      </div>
    </div>
  );
}
