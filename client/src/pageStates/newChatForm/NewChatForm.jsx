import { useState } from "react";
import "./NewChatForm.css";
import getCookie from "../../helpers/getCookie";

export default function NewChatForm({ setPageState }) {
  const [instanceDescriptions, setInstanceDescriptions] = useState(false);
  const [emptyField, setEmptyField] = useState(false);

  const instanceTypes = [
    "public",
    "friends",
    "friendsPlus",
    "invite",
    "invitePlus",
  ];

  const handleChatSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    if (data.name === "") {
      setEmptyField(true);
    }

    const token = getCookie(document.cookie, "jwt");

    const msg = {
      message: "New chat request",
      token,
      data,
    };

    console.log(data);
  };

  const handleInfoButton = (e) => {
    e.preventDefault();
    setInstanceDescriptions(true);
  };

  return (
    <div className="newChatFormRoot">
      <form className="newChatForm" onSubmit={handleChatSubmit}>
        <h2>New Chat</h2>
        <div className="labelInputPairContainer">
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" />
        </div>
        <div className="labelInputPairContainer">
          <label htmlFor="instanceType">Type: </label>
          <select htmlFor="instanceType" name="instanceType" id="instanceType">
            {instanceTypes.map((type) => {
              return (
                <option key={type} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
          <button className="instanceInfoButton" onClick={handleInfoButton}>
            <img
              src="./icons/question-circle-svgrepo-com.svg"
              className="instanceInfoIcon"
            />
          </button>
        </div>
        <button type="submit" className="formButton formButtonOverride">
          Create
        </button>
      </form>
      {instanceDescriptions && (
        <>
          <h3 className="typeHeader">
            Type determines who can join your chat.
          </h3>
          <ul className="typeList">
            <li>Public: Anyone can join.</li>
            <li>Friends: Instance owners friends can join.</li>
            <li>FriendsPlus: Participants friends can join.</li>
            <li>Invite: Instance owner can invite people.</li>
            <li>InvitePlus: Participants can invite people.</li>
          </ul>
        </>
      )}
    </div>
  );
}
