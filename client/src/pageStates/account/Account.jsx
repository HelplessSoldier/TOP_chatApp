import "./Account.css";
import globals from "../../../../publicGlobals/apiGlobals.json";

const userGetUri =
  globals.serverUri + ":" + globals.serverPort + globals.apiVersion + "/user";

export default function Account() {
  getAccountInfo(userGetUri)

  return (
    <div className="accountRoot">
      <h1>hello from the account comp!</h1>
    </div>
  );
}

async function getAccountInfo(url) {
  const response = await fetch(url);
  console.log(response);
  return
}
