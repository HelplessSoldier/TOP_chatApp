import "./Account.css";
import globals from "../../../../publicGlobals/apiGlobals.json";
import { useEffect, useState } from "react";
import FriendRequests from "./accountComps/FriendRequests";
import ChatInvites from "./accountComps/ChatInvites";
import OwnedChats from "./accountComps/OwnedChats";

const userGetUri =
  globals.serverUri +
  ":" +
  globals.serverPort +
  globals.apiVersion +
  "/current-user";

export default function Account() {
  const [userObject, setUserObject] = useState(null);
  const [hasInfo, setHasInfo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountObject = await getAccountInfo(userGetUri);
        setUserObject(accountObject.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [setHasInfo]);

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
          userObject ? (
            <>
              {userObject.friendRequests.length > 0 && (
                <FriendRequests
                  friendRequests={userObject.friendRequests}
                  currentUser={userObject}
                />
              )}
              {userObject.chatInvites.length > 0 && (
                <ChatInvites chatInvites={userObject.chatInvites} />
              )}
              {userObject.ownedChats.length > 0 && (
                <OwnedChats ownedChats={userObject.ownedChats} />
              )}
            </>
          ) : (
            <p>Nothing to show</p>
          )
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

async function getAccountInfo(url) {
  let data = null;

  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      data = await response.json();
    }
    return data;
  } catch (err) {
    console.error(err);
  }
}
