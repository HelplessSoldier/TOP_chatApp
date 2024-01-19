import "./AccountSections.css";
import { useState, useEffect } from "react";
import getUsers from "../../../helpers/getUsers";
import FriendReq from "./FriendReq";
import PropTypes from 'prop-types';
import { userObjectProps } from "../../../helpers/propValidation";

FriendRequests.propTypes = {
  friendRequests: PropTypes.arrayOf(PropTypes.string),
  currentUser: PropTypes.shape(userObjectProps),
  socket: PropTypes.object,
}

export default function FriendRequests({ friendRequests, currentUser, socket }) {
  const [requestingUsers, setRequestingUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersArray = await getUsers(friendRequests);
      setRequestingUsers(usersArray);
    };
    fetchUsers();
  }, [friendRequests]);

  return (
    <div className="accountSectionContainer">
      <h2 className="accountSectionHeader">Friend Requests:</h2>
      <hr />
      {requestingUsers.map((requestingUser) => {
        return (
          <FriendReq
            requestingUser={requestingUser}
            currentUser={currentUser}
            socket={socket}
            key={requestingUser.username}
          />
        );
      })}
    </div>
  );
}
