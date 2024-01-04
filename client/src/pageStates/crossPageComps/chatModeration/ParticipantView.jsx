import './ParticipantView.css';

export default function ParticipantView({ userObject }) {
  console.log(userObject);
  return (
    <div className='participantViewContainer'>
      <p className='participantViewName'>{userObject.username}</p>
    </div>
  )
}
