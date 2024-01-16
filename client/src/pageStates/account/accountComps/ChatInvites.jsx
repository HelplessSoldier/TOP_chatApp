import './ChatInvites.css';
import ChatInvite from './ChatInvite';

export default function ChatInvites({ ChatInvites, userObject }) {
  return (
    <>
      {userObject.chatInvites.map((chatObject) => (
        <ChatInvite key={chatObject._id} chatObject={chatObject} />
      ))}
    </>
  )
}
