import "./DeleteChatConfirmation.css";
import globals from "../../../../../publicGlobals/apiGlobals.json";

export default function DeleteChatConfirmation({
  chatObject,
  setShowDeleteConfirmation,
}) {
  const chatId = chatObject._id;
  const deleteChatUri =
    globals.serverUri +
    ":" +
    globals.serverPort +
    globals.apiVersion +
    "/" +
    "/chat/" +
    String(chatId);

  const handleConfirm = (e) => {
    e.preventDefault();
    deleteChatRequest(deleteChatUri);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="deleteChatConfirmationContainer">
      <h1>Deleting: {chatObject.name}</h1>
      <h2>Are you sure?</h2>
      <div className="deleteChatConfirmButtonContainer">
        <button className="deleteChatConfirmButton" onClick={handleConfirm}>
          <img
            src="./icons/checkmark-svgrepo-com.svg"
            className="deleteChatConfirmIcon"
          />
        </button>
        <button className="deleteChatConfirmButton" onClick={handleCancel}>
          <img
            src="./icons/cancel-svgrepo-com.svg"
            className="deleteChatConfirmIcon"
          />
        </button>
      </div>
    </div>
  );
}

async function deleteChatRequest(uri) {
  console.log(`uri: ${uri}`);
  const response = await fetch(uri, {
    method: "DELETE",
  });
  if (response.ok) {
    console.log("finish this nerd");
  }
}
