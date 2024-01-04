import "./AccountSections.css";
import "./OwnedChats.css";
import getChats from "../../../helpers/getChats";
import { useEffect, useState } from "react";
import OwnedChat from "./OwnedChat";

export default function OwnedChats({ ownedChats }) {
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
        return <OwnedChat chatObject={chatObject} key={chatObject._id} />;
      })}
    </div>
  );
}
