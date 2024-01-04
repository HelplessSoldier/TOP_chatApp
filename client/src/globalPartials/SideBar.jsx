import "./SideBar.css";
import globals from "../../../publicGlobals/apiGlobals.json";
import { useEffect, useState } from "react";
import Friends from "./sidebarComps/Friends";
import Chats from "./sidebarComps/Chats";

const userGetUri =
  globals.serverUri + ":" + globals.serverPort + globals.apiVersion + "/user";

export default function SideBar({ userObject, setPageState }) {
  const [friendsList, setFriendsList] = useState([]);
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    if (userObject && friendsList.length === 0 && updateCount < 3) {
      setUpdateCount((a) => a + 1);
      getFriends(userObject.friends, setFriendsList);
    }
  }, [friendsList, setFriendsList, userObject, updateCount, setUpdateCount]);

  return (
    <div className="sideBarContainer">
      <Chats setPageState={setPageState} />
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
