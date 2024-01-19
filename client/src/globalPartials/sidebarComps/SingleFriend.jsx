import "./SingleFriend.css";
import PropTypes from "prop-types";
import { friendsListProps } from "../../helpers/propValidation";

SingleFriend.propTypes = {
  friendObject: PropTypes.shape(friendsListProps),
  setSelectedFriend: PropTypes.func,
  setPageState: PropTypes.func,
};

export default function SingleFriend({
  friendObject,
  setSelectedFriend,
  setPageState,
}) {
  const handleOptionsButton = () => {
    setSelectedFriend(friendObject);
    setPageState("FriendOptions");
  };

  return (
    <div className="singleFriendContainer">
      <p className="friendName">{friendObject.username}</p>
      <button className="friendOptionsButton" onClick={handleOptionsButton}>
        <img
          src="./icons/options-lines-svgrepo-com.svg"
          className="friendOptionsIcon"
        />
      </button>
    </div>
  );
}
