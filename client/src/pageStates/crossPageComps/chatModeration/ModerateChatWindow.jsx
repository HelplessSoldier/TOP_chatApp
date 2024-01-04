import './ModerateChatWindow.css';

export default function ModerateChatWindow({ chatObject }) {
  return (
    <div className='chatModerationRoot'>
      <p>Hi! this is the chat moderation window for chat: {chatObject.name}</p>
    </div>
  )
}
