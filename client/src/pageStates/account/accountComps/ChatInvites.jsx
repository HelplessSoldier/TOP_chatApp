import ChatInvite from "./ChatInvite";
import "./AccountSections.css";
import PropTypes from 'prop-types';
import { userObjectProps } from "../../../helpers/propValidation";

ChatInvites.propTypes = {
  userObject: PropTypes.shape(userObjectProps),
  socket: PropTypes.object,
}

export default function ChatInvites({ userObject, socket }) {
  return (
    <div className="accountSectionContainer">
      <h2 className="accountSectionHeader">Chat invites:</h2>
      <hr />
      {userObject.chatInvites.map((chatObject) => (
        <ChatInvite
          key={chatObject._id}
          chatObject={chatObject}
          userObject={userObject}
          socket={socket}
        />
      ))}
    </div>
  );
}
