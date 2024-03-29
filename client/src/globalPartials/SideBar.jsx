import "./SideBar.css";
import globals from "../../../publicGlobals/apiGlobals.json";
import { useEffect, useState } from "react";
import Friends from "./sidebarComps/Friends";
import Chats from "./sidebarComps/Chats";
import PropTypes from "prop-types";
import { userObjectProps } from "../helpers/propValidation";

const apiUri =
  globals.serverUri + ":" + globals.serverPort + globals.apiVersion;
const userGetUri = apiUri + "/user";
const chatGetUri = apiUri + "/chat";

SideBar.propTypes = {
  userObject: PropTypes.shape(userObjectProps),
  setPageState: PropTypes.func,
  socket: PropTypes.object,
  setUserObject: PropTypes.func,
  setSelectedFriend: PropTypes.func,
};

export default function SideBar({
  userObject,
  setPageState,
  socket,
  setUserObject,
  setSelectedFriend,
}) {
  const [friendsList, setFriendsList] = useState([]);
  const [chatsList, setChatsList] = useState([]);
  const [updateCountFri, setUpdateCountFri] = useState(0);
  const [updateCountCha, setUpdateCountCha] = useState(0);

  useEffect(() => {
    if (socket) {
      socket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);
        if (message.message === "Successfully joined chat") {
          window.location.reload();
        }
      });
    }
  }, [
    socket,
    setUpdateCountCha,
    setUpdateCountFri,
    setChatsList,
    setFriendsList,
  ]);

  useEffect(() => {
    if (userObject && friendsList.length === 0 && updateCountFri < 3) {
      setUpdateCountFri((a) => a + 1);
      getFriends(userObject.friends, setFriendsList);
    }
  }, [
    friendsList,
    setFriendsList,
    userObject,
    updateCountFri,
    setUpdateCountFri,
  ]);

  useEffect(() => {
    if (userObject && chatsList.length === 0 && updateCountCha < 3) {
      setUpdateCountCha((a) => a + 1);
      getChats(userObject.chats, setChatsList);
    }
  }, [chatsList, setChatsList, userObject, updateCountCha, setUpdateCountCha]);

  return (
    <div className="sideBarContainer">
      <Chats
        setPageState={setPageState}
        chatsList={chatsList}
        userObject={userObject}
        socket={socket}
        setUserObject={setUserObject}
      />
      <Friends
        friendsList={friendsList}
        setSelectedFriend={setSelectedFriend}
        setPageState={setPageState}
      />
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

async function getChats(chatIds, setChatsList) {
  const chatListArr = [];

  for (let chatId of chatIds) {
    const url = chatGetUri + "/" + String(chatId);
    const response = await fetch(url);

    if (!response.ok) {
      continue;
    }

    const chatData = await response.json();

    if (chatData && chatData.message === "Chat found") {
      chatListArr.push({
        chatName: chatData.chat.name,
        _id: chatData.chat._id,
      });
    }
  }

  setChatsList(chatListArr);
}
