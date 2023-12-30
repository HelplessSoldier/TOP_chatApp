import "./FriendRequests.css";
import { useState, useEffect } from "react";
import getUsers from '../../../helpers/getUsers';

export default function FriendRequests({ friendRequests }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersArray = await getUsers(friendRequests)
      setUsers(usersArray);
    }
    fetchUsers();
  }, [friendRequests]);

  return <h1>this is the friendRequests block</h1>;
}
