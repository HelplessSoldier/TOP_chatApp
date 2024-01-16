import getChats from "../../helpers/getChats";
import { useState } from "react";
import "./FriendOptions.css";
import { useEffect } from "react";
import RemoveFriendConfirmation from "./RemoveFriendConfirmation";
import globals from "../../../../publicGlobals/apiGlobals.json";

export default function FriendOptions({
  selectedFriend,
  setSelectedFriend,
  setPageState,
  userObject,
}) {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState("");
  const [showRemoveFriendConfirmation, setShowRemoveFriendConfirmation] =
    useState(false);

  useEffect(() => {
    const filterChatsForPrivilage = (chats, userObject) => {
      if (!chats) {
        return;
      }
      const ownerRequiredTypes = ["friends", "invite"];
      let filteredChats = [];
      for (let chat of chats) {
        const ownerid = chat.owner;
        const requiresOwner = ownerRequiredTypes.includes(chat.instanceType);
        if (requiresOwner) {
          if (userObject._id === ownerid) {
            filteredChats.push(chat);
          }
        } else {
          filteredChats.push(chat);
        }
      }
      return filteredChats;
    };

    const getAndSetChats = async () => {
      const foundChats = await getChats(userObject.chats);
      const filteredChats = filterChatsForPrivilage(foundChats, userObject);
      setChats(filteredChats);
    };
    getAndSetChats();
  }, [userObject]);

  const handleExitButton = () => {
    setSelectedFriend(null);
    setPageState("Chat");
    return;
  };

  const handleRemoveFriendButton = () => {
    setShowRemoveFriendConfirmation(true);
  };

  const handleInviteButton = () => {
    if (selectedChat === "") {
      return;
    }
    const sendInviteRequest = async () => {
      const inviteUserUrl =
        globals.serverUri +
        ":" +
        globals.serverPort +
        globals.apiVersion +
        "/user/invite/" +
        selectedChat +
        "/" +
        selectedFriend._id;

      const response = await fetch(inviteUserUrl, {
        method: "PUT",
        credentials: "include",
      });

      if (response.ok) {
        const message = await response.json();
        console.log(message);
      }
    };
    sendInviteRequest();
  };

  const handleChatSelectChange = (e) => {
    setSelectedChat(e.target.value);
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
        <div className="friendActionsInviteContainer">
          <select
            className="friendActionsInviteDropdown"
            onChange={handleChatSelectChange}
          >
            <option value="">Select Chat...</option>
            {chats.map((chat) => (
              <option key={chat._id} value={chat._id}>
                {chat.name}
              </option>
            ))}
          </select>
          <button className="friendActionsButton" onClick={handleInviteButton}>
            Invite
          </button>
        </div>

        <button
          className="friendActionsButton"
          onClick={handleRemoveFriendButton}
        >
          Remove Friend
        </button>
      </div>

      {showRemoveFriendConfirmation && (
        <RemoveFriendConfirmation
          userObject={userObject}
          selectedFriend={selectedFriend}
          setShowRemoveFriendConfirmation={setShowRemoveFriendConfirmation}
          setPageState={setPageState}
        />
      )}
    </div>
  );
}

// what should this include?
// 1: remove friend
//  -- popup confirmation message ✅
//  -- send req ✅
//
// 2: invite to a chat
//  -- need list of current users chats ✅
//  -- dropdown of which chat to invite the user to depending on instance type. ✅
//  -- cannot invite user if not owner and invite.✅ serverside impl still needed
//  -- add sentby field to chat invites?
