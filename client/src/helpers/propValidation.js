import PropTypes from "prop-types";

const userObjectProps = {
  _id: PropTypes.string,
  chatInvites: PropTypes.arrayOf(PropTypes.string),
  chats: PropTypes.arrayOf(PropTypes.string),
  currentChat: PropTypes.string,
  email: PropTypes.string,
  friendRequests: PropTypes.arrayOf(PropTypes.string),
  friends: PropTypes.arrayOf(PropTypes.string),
  ownedChats: PropTypes.arrayOf(PropTypes.string),
  sendFriendRequests: PropTypes.arrayOf(PropTypes.string),
  username: PropTypes.string,
};

export { userObjectProps };
