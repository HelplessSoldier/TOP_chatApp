import "./Account.css";
import globals from "../../../../publicGlobals/apiGlobals.json";
import { useEffect, useState } from "react";
import FriendRequests from "./accountComps/FriendRequests";
import ChatInvites from "./accountComps/ChatInvites";
import OwnedChats from "./accountComps/OwnedChats";
import ModerateChatWindow from "../crossPageComps/chatModeration/ModerateChatWindow";
import getAccountInfo from "../../helpers/getAccountInfo";

export default function Account({ socket, setSocket }) {
  const [userObject, setUserObject] = useState(null);
  const [hasInfo, setHasInfo] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const wsUri = globals.webSocketUri;
    const socket = new WebSocket(wsUri);
    setSocket(socket);
    return () => socket.close();
  }, [setSocket]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountObject = await getAccountInfo();
        setUserObject(accountObject.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (
      userObject &&
      (userObject.friendRequests.length > 0 ||
        userObject.chatInvites.length > 0 ||
        userObject.ownedChats.length > 0)
    ) {
      setHasInfo(true);
    } else {
      setHasInfo(false);
    }
  }, [setHasInfo, userObject]);

  return (
    <div className="accountRoot">
      <div className="accountContainer">
        {hasInfo ? (
          <>
            {userObject.friendRequests.length > 0 && (
              <FriendRequests
                friendRequests={userObject.friendRequests}
                currentUser={userObject}
                socket={socket}
              />
            )}
            {userObject.chatInvites.length > 0 && (
              <ChatInvites
                chatInvites={userObject.chatInvites}
                userObject={userObject}
                socket={socket}
              />
            )}
            {userObject.ownedChats.length > 0 && (
              <OwnedChats
                ownedChats={userObject.ownedChats}
                setSelectedChat={setSelectedChat}
              />
            )}
            {selectedChat && (
              <ModerateChatWindow
                chatObject={selectedChat}
                setSelectedChat={setSelectedChat}
              />
            )}
          </>
        ) : (
          <p className="noDataMessage">Nothing to show yet.</p>
        )}
      </div>
    </div>
  );
}
