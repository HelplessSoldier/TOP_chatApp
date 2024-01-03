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
        <button
          className={"sideBarExpandButton" + (expanded ? "" : " rotate")}
          onClick={handleExpandButton}
        >
          <img
            className="sideBarExpandIcon"
            src="./icons/chevron-down-square-svgrepo-com.svg"
          />
        </button>
      </div>
      <hr />
    </div>
  );
}
