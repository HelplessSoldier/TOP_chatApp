import globals from '../../.../../../../../../publicGlobals/apiGlobals.json';

export default async function getUsers(friendRequests) {
  let usersArray = [];
  for (let friendRequestId of friendRequests) {
    const res = await fetchUser(friendRequestId);
    if (res.message === "User found") {
      console.log(res.user.username);
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
