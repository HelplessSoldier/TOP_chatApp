import "./Account.css";
import globals from "../../../../publicGlobals/apiGlobals.json";
import { useEffect } from "react";

export default function Account() {
  const userGetUri =
    globals.serverUri + ":" + globals.serverPort + globals.apiVersion + "/user";
  useEffect(() => {
    getAccountInfo(userGetUri);
  }, [userGetUri]);

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
  console.log(response);
  return;
}
