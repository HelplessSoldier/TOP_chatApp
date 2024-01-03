import './SingleFriend.css'

export default function SingleFriend({ friendObject }) {
  return (
    <div className="singleFriendContainer">
      <p className="friendName">{friendObject.username}</p>
    </div>
  )
}
