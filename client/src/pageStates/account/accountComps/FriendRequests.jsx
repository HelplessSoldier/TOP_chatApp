import "./FriendRequests.css";
import { useState, useEffect } from "react";
import getUsers from "../../../helpers/getUsers";
import FriendReq from "./FriendReq";

export default function FriendRequests({ friendRequests, currentUser }) {
  const [requestingUsers, setRequestingUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersArray = await getUsers(friendRequests);
      setRequestingUsers(usersArray);
    };
    fetchUsers();
  }, [friendRequests]);

  return (
    <div className="friendRequestContainer">
      <h2 className="friendRequestHeader">Friend Requests:</h2>
      <hr />
      {requestingUsers.map((requestingUser) => {
        return (
          <FriendReq
            requestingUser={requestingUser}
            currentUser={currentUser}
            key={requestingUser.username}
          />
        );
      })}
    </div>
  );
}
