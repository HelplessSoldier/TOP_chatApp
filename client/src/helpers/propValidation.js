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

const chatsListProps = {
  _id: PropTypes.string,
  chatName: PropTypes.string,
};

const friendsListProps = {
  _id: PropTypes.string,
  username: PropTypes.string,
};

const chatObjectProps = {
  _id: PropTypes.string,
  chatName: PropTypes.string,
};

const messageProps = {
  _id: PropTypes.string,
  messageBody: PropTypes.string,
  sentById: PropTypes.string,
  sentByUsername: PropTypes.string,
  timestamp: PropTypes.string,
};

const searchResultsProps = {
  searchTerm: PropTypes.string,
  chats: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      canJoin: PropTypes.bool,
      instanceType: PropTypes.string,
      invitedUsers: PropTypes.arrayOf(PropTypes.object),
      messages: PropTypes.arrayOf(PropTypes.shape(messageProps)),
      name: PropTypes.string,
      owner: PropTypes.string,
      participants: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  users: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
  }))
};

export {
  userObjectProps,
  chatsListProps,
  friendsListProps,
  chatObjectProps,
  messageProps,
  searchResultsProps,
};
