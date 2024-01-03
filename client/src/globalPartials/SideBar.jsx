import "./SideBar.css";
import globals from "../../../publicGlobals/apiGlobals.json";
import { useEffect, useState } from "react";

const userGetUri =
  globals.serverUri +
  ":" +
  globals.serverPort +
  globals.apiVersion +
  "/user";

export default function SideBar({ userObject }) {
  const [friendsList, setFriendsList] = useState([]);
  const [getAttemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    if (userObject && friendsList.length === 0 && getAttemptCount < 3) {
      console.log(userObject);
      getFriends(userObject.friends, setFriendsList)
    }
  }, [userObject, friendsList, getAttemptCount])

  return (
    <div className="sideBarContainer">
      <div className="sideBarChats">
        <h2 className="sidebarHeader">CHATS</h2>
        <hr />
      </div>
      <div className="sideBarFriends">
        <h2 className="sidebarHeader">FRIENDS</h2>
        <hr />
      </div>
    </div>
  );
}

async function getFriends(friendIds, setFriendsList) {
  const friendsListArr = [];
  for (let friendId of friendIds) {
    const url = userGetUri + String(friendId);
    const response = await fetch(url);
    if (response.ok) {
      console.log(response.data)
    }
  }
  return;
}
