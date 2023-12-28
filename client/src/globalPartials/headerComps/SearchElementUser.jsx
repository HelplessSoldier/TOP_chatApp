export default function SearchElementUser(inputs) {

  console.log(inputs);
  const user = inputs.user;
  const socket = inputs.socket;
  const userObject = inputs.userObject;

  const handleFriendRequest = () => {
    const responseObject = {
      message: 'Friend request sent',
      sentById: userObject._id,
      targetId: user._id,
    }
    socket.send(JSON.stringify(responseObject))
  }

  return (
    <div className="searchElementContainer">
      <h2 className="usernameHeader">{user.username}</h2>
      <button className="searchResultButton" onClick={handleFriendRequest}>
        Send Friend Request
      </button>
    </div>
  );
}

