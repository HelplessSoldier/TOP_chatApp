import "./AccountSections.css";
import "./OwnedChats.css";
import getChats from "../../../helpers/getChats";
import { useEffect, useState } from "react";
import OwnedChat from "./OwnedChat";
import PropTypes from 'prop-types';

OwnedChats.propTypes = {
  ownedChats: PropTypes.arrayOf(PropTypes.string),
  setSelectedChat: PropTypes.func,
}

export default function OwnedChats({ ownedChats, setSelectedChat }) {
  const [ownedChatObjects, setOwnedChatObjects] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const chatsArray = await getChats(ownedChats);
      setOwnedChatObjects(chatsArray);
    };
    fetchChats();
  }, [ownedChats]);

  return (
    <div className="accountSectionContainer">
      <h2 className="accountSectionHeader">Owned Chats</h2>
      <hr />
      {ownedChatObjects.map((chatObject) => {
        return (
          <OwnedChat
            chatObject={chatObject}
            setSelectedChat={setSelectedChat}
            key={chatObject._id}
          />
        );
      })}
    </div>
  );
}
