import './FriendRequests.css';

export default function FriendRequests({ friendRequests }) {

  getUsernames(friendRequests)

  return (
    <h1>this is the friendRequests block</h1>
  )
}

function getUsernames(friendRequests) {
  let usersArray = [];
  for (let friendRequestId of friendRequests) {
    console.log(friendRequestId);
  }
  return usersArray;
}

function getUsername(uid) {
  return
}
