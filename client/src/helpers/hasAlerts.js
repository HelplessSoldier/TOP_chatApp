export default function hasAlerts(userObject) {
  if (userObject === undefined) {
    return false;
  }
  if (userObject.friendRequests.length > 0) {
    return true;
  }
  if (userObject.chatInvites.length > 0) {
    return true;
  }
  return false;
}

