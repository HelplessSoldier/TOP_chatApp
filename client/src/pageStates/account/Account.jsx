import "./Account.css";
import globals from "../../../../publicGlobals/apiGlobals.json";
import { useEffect } from "react";

const userGetUri =
  globals.serverUri + ":" + globals.serverPort + globals.apiVersion + "/user";

// TODO: get user account info for:
// 1- friend requests
// 2- chat invites
// 3- owned chats
// 4- friends
// 5- username and password change
// 6- delete account

export default function Account() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountObject = await getAccountInfo(userGetUri);
        console.log(accountObject);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="accountRoot">
      <h1>hello from the account comp!</h1>
    </div>
  );
}

async function getAccountInfo(url) {
  let data = null;

  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      data = await response.json();
    }
    return data;
  } catch (err) {
    console.error(err);
  }
}
