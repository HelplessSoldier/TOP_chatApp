import './ChatInvite.css';

export default function ChatInvite({ chatObject }) {
  return (
    <div className='chatInviteContainer'>
      <p>{JSON.stringify(chatObject)}</p>
    </div>
  )
}
