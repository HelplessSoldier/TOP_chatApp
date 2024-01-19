import "./OwnedChat.css";
import PropTypes from 'prop-types';
import { chatObjectProps } from "../../../helpers/propValidation";

OwnedChat.propTypes = {
  chatObject: PropTypes.shape(chatObjectProps),
  setSelectedChat: PropTypes.func,
}

export default function OwnedChat({ chatObject, setSelectedChat }) {
  const handleOptionsButton = (e) => {
    e.preventDefault();
    setSelectedChat(chatObject);
  };

  return (
    <div className="ownedChatContainer">
      <p className="ownedChatName">{chatObject.name}</p>
      <button className="ownedChatOptionsButton" onClick={handleOptionsButton}>
        <img
          src="./icons/options-lines-svgrepo-com.svg"
          className="ownedChatOptionsIcon"
        />
      </button>
    </div>
  );
}
