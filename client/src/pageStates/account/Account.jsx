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
    getAccountInfo(userGetUri);
  }, []);

  return (
    <div className="accountRoot">
      <h1>hello from the account comp!</h1>
    </div>
  );
}

async function getAccountInfo(url) {
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  console.log(response.body);
  return;
}
