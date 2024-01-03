import "./SideBar.css";
import globals from "../../../publicGlobals/apiGlobals.json";
import { useEffect, useState } from "react";
import Friends from "./sidebarComps/Friends";
import Chats from "./sidebarComps/Chats";

const userGetUri =
  globals.serverUri + ":" + globals.serverPort + globals.apiVersion + "/user";

export default function SideBar({ userObject }) {
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    if (userObject && friendsList.length === 0) {
      getFriends(userObject.friends, setFriendsList);
    }
  }, [friendsList, setFriendsList, userObject]);

  return (
    <div className="sideBarContainer">
      <Chats />
      <Friends friendsList={friendsList} />
    </div>
  );
}

async function getFriends(friendIds, setFriendsList) {
  const friendsListArr = [];

  for (let friendId of friendIds) {
    const url = userGetUri + "/" + String(friendId);
    const response = await fetch(url);

    if (!response.ok) {
      continue;
    }

    const userData = await response.json();

    if (userData && userData.message === "User found") {
      friendsListArr.push({
        username: userData.user.username,
        _id: userData.user._id,
      });
    }
  }

  setFriendsList(friendsListArr);
}
