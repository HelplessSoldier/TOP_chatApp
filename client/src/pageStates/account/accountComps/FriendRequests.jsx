import "./FriendRequests.css";
import globals from "../../../../../publicGlobals/apiGlobals.json";

export default function FriendRequests({ friendRequests }) {
  const users = getUsers(friendRequests);
  return <h1>this is the friendRequests block</h1>;
}

async function getUsers(friendRequests) {
  let usersArray = [];
  for (let friendRequestId of friendRequests) {
    const user = await fetchUser(friendRequestId);
    console.log(user);
  }
  return usersArray;
}

async function fetchUser(userId) {
  const userUri =
    globals.serverUri + ":" + globals.serverPort + globals.apiVersion + "/user";

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
