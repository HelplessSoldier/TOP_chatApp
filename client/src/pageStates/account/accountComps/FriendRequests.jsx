import "./FriendRequests.css";
import { useState, useEffect } from "react";
import getUsers from "../../../helpers/getUsers";
import FriendReq from "./FriendReq";

export default function FriendRequests({ friendRequests }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersArray = await getUsers(friendRequests);
      setUsers(usersArray);
    };
    fetchUsers();
  }, [friendRequests]);

  return (
    <div className="friendRequestContainer">
      <h2 className="friendRequestHeader">Friend Requests:</h2>
      <hr />
      {users.map((requestingUser) => {
        return (
          <FriendReq
            requestingUser={requestingUser}
            key={requestingUser.username}
          />
        );
      })}
    </div>
  );
}
