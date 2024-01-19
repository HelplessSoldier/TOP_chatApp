import { useState } from "react";
import SingleChat from "./SingleChat";
import "./Chats.css";
import PropTypes from 'prop-types';
import { userObjectProps, chatsListProps } from "../../helpers/propValidation";

Chats.propTypes = {
  setPageState: PropTypes.func,
  chatsList: PropTypes.arrayOf(PropTypes.shape(chatsListProps)),
  socket: PropTypes.object,
  userObject: PropTypes.shape(userObjectProps),
  setUserObject: PropTypes.func,
}

export default function Chats({
  setPageState,
  chatsList,
  socket,
  userObject,
  setUserObject,
}) {
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
      {expanded && (
        <div className="friendsListContainer">
          {chatsList.map((chat) => {
            return (
              <SingleChat
                key={chat._id}
                userObject={userObject}
                chatObject={chat}
                socket={socket}
                setUserObject={setUserObject}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
