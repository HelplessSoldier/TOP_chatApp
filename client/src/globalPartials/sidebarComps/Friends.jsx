import { useState } from "react";
import SingleFriend from "./SingleFriend";
import "./Friends.css";

export default function Friends({
  friendsList,
  setSelectedFriend,
  setPageState,
}) {
  const [expanded, setExpanded] = useState(true);

  const handleExpandButton = () => {
    setExpanded((a) => !a);
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
            src="./icons/chevron-down-svgrepo-com.svg"
          />
        </button>
      </div>
      <hr />
      {expanded && (
        <div className="friendsListContainer">
          {friendsList.map((friend) => {
            return (
              <SingleFriend
                key={friend.username}
                friendObject={friend}
                setSelectedFriend={setSelectedFriend}
                setPageState={setPageState}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
