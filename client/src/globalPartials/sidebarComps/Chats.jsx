import { useState } from "react";
import "./Chats.css";

export default function Chats({ setPageState }) {
  const [expanded, setExpanded] = useState(true);

  const handleExpandButton = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleNewChatButton = () => {
    setPageState("NewChat");
  };

  return (
    <div className="sideBarChats">
      <div className="sideBarChatsHeaderContainer">
        <h2 className="sidebarHeader">CHATS</h2>
        <div className="chatButtonsContainer">
          <button className="addChatButton" onClick={handleNewChatButton}>
            <img src="./icons/plus-svgrepo-com.svg" className="addChatIcon" />
          </button>
          <button
            className={"sideBarExpandButton" + (expanded ? "" : " rotate")}
            onClick={handleExpandButton}
          >
            <img
              className="sideBarExpandIcon"
              src="./icons/chevron-down-svgrepo-com.svg"
            />
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
}
