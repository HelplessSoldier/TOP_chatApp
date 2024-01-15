import getChats from "../../helpers/getChats";
import { useState } from "react";
import "./FriendOptions.css";
import { useEffect } from "react";

export default function FriendOptions({
  selectedFriend,
  setSelectedFriend,
  setPageState,
  userObject,
}) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getAndSetChats = async () => {
      const foundChats = await getChats(userObject.chats);
      setChats(foundChats);
    };
    getAndSetChats();
  }, [userObject]);

  const handleExitButton = () => {
    setSelectedFriend(null);
    setPageState("Chat");
    return;
  };

  const handleDirectMessageButton = () => {
    console.log("dms not implemented");
    return;
  };

  const handleRemoveFriendButton = () => {
    console.log("remove friend not implemented");
    return;
  };

  return (
    <div className="friendOptionsContainer">
      <div className="friendOptionsHeaderAndExitContainer">
        <h1>{selectedFriend.username}</h1>
        <button className="friendOptionsExitButton" onClick={handleExitButton}>
          <img
            className="friendOptionsExitIcon"
            src="./icons/close-svgrepo-com.svg"
          />
        </button>
      </div>
      <hr />

      <div className="friendActionsContainer">

        <button className="friendActionsButton">
          Direct Message
        </button>

        <div className="friendActionsInviteContainer" >
          <select className="friendActionsInviteDropdown">
            {chats.map((chat) => (
              <option key={chat._id} value={chat._id}>
                {chat.name}
              </option>
            ))}
          </select>
          <button className="friendActionsButton">
            Invite
          </button>
        </div>

        <button className="friendActionsButton">Remove Friend</button>
      </div>
    </div>
  );
}

// what should this include?
// 1: remove friend
//  -- popup confirmation message
//
// 2: send dm? then set a dm icon on friend in sidebar
//  -- add dmRequests to user model
//  -- dmRequests should just be uid
//  -- once accepted create an invite instance
//      of chat with requesting and accepting user
//
// 3: invite to a chat
//  -- need list of current users chats
//  -- dropdown of which chat to invite the user to depending on instance type.
//  -- cannot invite user if not owner and invite.
//  -- add sentby field to chat invites?
