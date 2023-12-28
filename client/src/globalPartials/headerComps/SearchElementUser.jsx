export default function SearchElementUser(user, { userObject, socket }) {

  console.log('userObj: ', userObject); // undefined
  console.log('socket: ', socket); // undefined

  const handleFriendRequest = () => {
    const responseObject = {
      message: 'Friend request sent',
      sendById: userObject._id,
      targetId: user._id,
    }
    socket.emit(responseObject.message, responseObject);
  }

  user = user.user; // goofy aah object formatting
  return (
    <div className="searchElementContainer">
      <h2 className="usernameHeader">{user.username}</h2>
      <button className="searchResultButton" onClick={handleFriendRequest}>
        Send Friend Request
      </button>
    </div>
  );
}

