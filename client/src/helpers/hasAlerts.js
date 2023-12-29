export default function hasAlerts(userObject) {
  console.log(userObject);
  if (userObject.friendRequests.length > 0) {
    return true;
  }
  return false;
}

