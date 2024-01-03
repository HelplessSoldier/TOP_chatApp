import { useState } from "react";
import "./Chats.css";

export default function Chats() {
  const [expanded, setExpanded] = useState(true);

  const handleExpandButton = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div className="sideBarChats">
      <div className="sideBarChatsHeaderContainer">
        <h2 className="sidebarHeader">CHATS</h2>
        <button className="addChatButton">
          <img
            src="./icons/plus-svgrepo-com.svg"
            className="addChatIcon"
          />
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
      <hr />
    </div>
  );
}
