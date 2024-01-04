import globals from '../../../publicGlobals/apiGlobals.json';

export default async function getChats(chatIds) {
  let chatArray = [];
  for (let chatId of chatIds) {
    const res = await fetchChat(chatId);
    if (res.message === "Chat found") {
      chatArray.push(res.chat);
    } else {
      console.error(`Chat not found with id: ${chatId}`);
    }
  }
  return chatArray;
}

async function fetchChat(chatId) {
  const chatUri =
    globals.serverUri +
    ":" +
    globals.serverPort +
    globals.apiVersion +
    "/chat/" +
    chatId;

  try {
    const response = await fetch(chatUri, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
