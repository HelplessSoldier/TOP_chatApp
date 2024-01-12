import globals from '../../../publicGlobals/apiGlobals.json';

export default async function getAccountInfo() {
  const url =
    globals.serverUri +
    ":" +
    globals.serverPort +
    globals.apiVersion +
    "/current-user";

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


