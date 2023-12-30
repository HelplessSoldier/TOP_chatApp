import "./FriendRequests.css";
import globals from "../../../../../publicGlobals/apiGlobals.json";
import { useState, useEffect } from "react";

export default function FriendRequests({ friendRequests }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(getUsers(friendRequests));
    console.log("setusers called"); // logs twice?
  }, [friendRequests]);

  return <h1>this is the friendRequests block</h1>;
}

async function getUsers(friendRequests) {
  let usersArray = [];
  for (let friendRequestId of friendRequests) {
    const res = await fetchUser(friendRequestId);
    if (res.message === "User found") {
      usersArray.push(res.user);
    } else {
      console.error(`User not found with id: ${friendRequestId}`);
    }
  }
  return usersArray;
}

async function fetchUser(userId) {
  const userUri =
    globals.serverUri +
    ":" +
    globals.serverPort +
    globals.apiVersion +
    "/user/" +
    userId;

  try {
    const response = await fetch(userUri, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
