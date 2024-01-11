import './DeleteChatConfirmation.css';

export default function DeleteChatConfirmation({ chatObject }) {
  const handleConfirm = (e) => {
    e.preventDefault();
    console.log('delete chat confirm button pressed')
  }

  const handleCancel = (e) => {
    e.preventDefault();
    console.log('delete chat cancel button pressed')
  }

  return (
    <div className='deleteChatConfirmationContainer'>
      <h1>Deleting: {chatObject.name}</h1>
      <h2>Are you sure?</h2>
      <div className='deleteChatConfirmButtonContainer'>
        <button className="deleteChatConfirmButton" onClick={handleConfirm}>
          <img src="./icons/checkmark-svgrepo-com.svg" className="deleteChatConfirmIcon" />
        </button>
        <button className="deleteChatConfirmButton" onClick={handleCancel}>
          <img src="./icons/cancel-svgrepo-com.svg" className="deleteChatConfirmIcon" />
        </button>
      </div>
    </div>
  )
}
