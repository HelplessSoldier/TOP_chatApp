export default function SearchElementUser(user) {
  user = user.user; // goofy aah object formatting
  return (
    <div className="searchElementContainer">
      <h2 className="usernameHeader">{user.username}</h2>
      <button className="searchResultButton">Send Friend Request</button>
    </div>
  );
}
