import SingleFriend from "./SingleFriend";

export default function Friends({ friendsList }) {
  console.log(friendsList); // []
  return (
    <div className="friendsListContainer">
      <p>hi! this is the Friends comp!</p>
      {friendsList.map((friend) => {
        return <SingleFriend key={friend.username} friendObject={friend} />;
      })}
    </div>
  )
}
