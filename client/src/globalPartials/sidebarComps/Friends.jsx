import { useState } from "react";
import SingleFriend from "./SingleFriend";
import "./Friends.css";

export default function Friends({ friendsList }) {
  const [expanded, setExpanded] = useState(true);

  const handleExpandButton = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div className="sideBarFriends">
      <div className="sideBarHeaderContainer">
        <h2 className="sidebarHeader">FRIENDS</h2>
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
      {expanded && (
        <div className="friendsListContainer">
          {friendsList.map((friend) => {
            return <SingleFriend key={friend.username} friendObject={friend} />;
          })}
        </div>
      )}
    </div>
  );
}
