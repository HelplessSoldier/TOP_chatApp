import "./DeleteChatConfirmation.css";
import globals from "../../../../../publicGlobals/apiGlobals.json";
import { useState } from "react";

export default function DeleteChatConfirmation({
  chatObject,
  setShowDeleteConfirmation,
}) {
  const [currentState, setCurrentState] = useState("standard");
  const [errorDetail, setErrorDetail] = useState("");
  const chatId = chatObject._id;
  const deleteChatUri =
    globals.serverUri +
    ":" +
    globals.serverPort +
    globals.apiVersion +
    "/chat/" +
    String(chatId);

  const handleConfirm = (e) => {
    e.preventDefault();
    deleteChatRequest(deleteChatUri, setErrorDetail, setCurrentState);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="deleteChatConfirmationContainer">
      {currentState === "standard" && (
        <>
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
        </>
      )}

      {currentState === "error" && (
        <>
          <h2>Could not delete chat: {errorDetail}</h2>
          <button className="deleteChatConfirmButton errorCloseButton" onClick={handleCancel}>
            Okay
          </button>
        </>
      )}
    </div>
  );
}

async function deleteChatRequest(uri, setErrorDetail, setCurrentState) {
  const response = await fetch(uri, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    setErrorDetail("No response from server");
    setCurrentState("error");
    return;
  }

  const message = await response.json();
  if (message.message === "Cannot delete") {
    setCurrentState("error");
    setErrorDetail(message.detail);
  }
}
