import './KickUserConfirmation.css';

export default function KickUserConfirmation({ userObject, setUserToKick }) {

  const handleConfirm = (e) => {
    e.preventDefault();
    console.log('confirm pressed')
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setUserToKick(null);
  }

  return (
    <div className='kickUserConfirmationContainer'>
      <h1>Kicking: {userObject.username}</h1>
      <h2>Are you sure?</h2>
      <div className='kickUserButtonContainer'>
        <button className="kickUserButton" onClick={handleConfirm}>
          <img src="./icons/checkmark-svgrepo-com.svg" className="kickUserIcon" />
        </button>
        <button className="kickUserButton" onClick={handleCancel}>
          <img src="./icons/cancel-svgrepo-com.svg" className="kickUserIcon" />
        </button>
      </div>
    </div>
  )
}
