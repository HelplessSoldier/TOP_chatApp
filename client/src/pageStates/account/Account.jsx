import "./Account.css";
import globals from "../../../../publicGlobals/apiGlobals.json";
import { useEffect } from "react";

const userGetUri =
  globals.serverUri + ":" + globals.serverPort + globals.apiVersion + "/user";

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
  console.log(response);
  return;
}
