import "./FriendRequests.css";
import { useState, useEffect } from "react";
import getUsers from '../../../helpers/getUsers';
import FriendReq from "./FriendReq";

export default function FriendRequests({ friendRequests }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersArray = await getUsers(friendRequests)
      setUsers(usersArray);
    }
    fetchUsers();
  }, [friendRequests]);

  return (
    <div className="friendRequestContainer">
      <h2 className="friendRequestHeader">Friend Requests:</h2>
      <hr />
      {
        users.map((user) => {
          return (
            <FriendReq user={user} key={user.username} />
          )
        })
      }
    </div>
  )
}
