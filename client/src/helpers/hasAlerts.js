export default function hasAlerts(userObject) {
  if (userObject.friendRequests.length > 0) {
    return true;
  }
  return false;
}

