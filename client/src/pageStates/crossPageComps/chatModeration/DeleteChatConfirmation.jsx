import "./DeleteChatConfirmation.css";
import globals from "../../../../../publicGlobals/apiGlobals.json";
import { useState } from "react";
import PropTypes from 'prop-types';
import { chatObjectProps } from "../../../helpers/propValidation";

DeleteChatConfirmation.propTypes = {
  chatObject: PropTypes.shape(chatObjectProps),
  setShowDeleteConfirmation: PropTypes.func,
}

export default function DeleteChatConfirmation({
  chatObject,
  setShowDeleteConfirmation,
}) {
  const [currentState, setCurrentState] = useState("standard");
  const [success, setSuccess] = useState(false);
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
    deleteChatRequest(
      deleteChatUri,
      setErrorDetail,
      setCurrentState,
      setSuccess
    );
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

      {success && <p>Chat deleted!</p>}

      {currentState === "error" && (
        <>
          <h2 className="couldNotDeleteChatHeader">Could not delete chat: {errorDetail}</h2>
          <button
            className="deleteChatConfirmButton errorCloseButton"
            onClick={handleCancel}
          >
            Okay
          </button>
        </>
      )}
    </div>
  );
}

async function deleteChatRequest(
  uri,
  setErrorDetail,
  setCurrentState,
  setSuccess
) {
  const response = await fetch(uri, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const message = await response.json();
    if (message.message === "Cannot delete") {
      setSuccess(false);
      setCurrentState("error");
      setErrorDetail(message.detail);
      return;
    } else {
      setSuccess(false);
      setErrorDetail("No response from server");
      setCurrentState("error");
      return;
    }
  }

  const message = await response.json();
  if (message.message === "Successfully deleted chat") {
    setSuccess(true);
  }
}
