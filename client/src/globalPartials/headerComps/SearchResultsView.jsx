import "./SearchResultsView.css";
import SearchElementUser from "./SearchElementUser";
import SearchElementChat from "./SearchElementChat";
import PropTypes from "prop-types";
import {
  searchResultsProps,
  userObjectProps,
} from "../../helpers/propValidation";

SearchResultsView.propTypes = {
  searchResults: PropTypes.shape(searchResultsProps),
  setSearchResults: PropTypes.func,
  userObject: PropTypes.shape(userObjectProps),
  socket: PropTypes.object,
};

export default function SearchResultsView({
  searchResults,
  setSearchResults,
  userObject,
  socket,
}) {
  const handleCloseButton = () => {
    setSearchResults(null);
  };

  const hasUsers = searchResults.users.length > 0;
  const hasChats = searchResults.chats.length > 0;

  return (
    <div className="searchResultsContainer">
      <div className="searchResultsHeader">
        <h1>{`Searching for: ${searchResults.searchTerm}`}</h1>
        <button className="hiddenButton" onClick={handleCloseButton}>
          <img
            className="searchResultsCloseIcon"
            src="./icons/close-svgrepo-com.svg"
          />
        </button>
      </div>
      <hr />

      <div className="usersAndChatsContainer">
        {hasUsers && <h2>Users: </h2>}
        {searchResults.users.map((user) => {
          if (user._id === userObject._id) {
            return null;
          }
          return (
            <SearchElementUser
              key={user._id}
              user={user}
              userObject={userObject}
              socket={socket}
            />
          );
        })}

        {hasChats && <h2>Public Chats: </h2>}
        {searchResults.chats.map((chat) => {
          return (
            <SearchElementChat
              key={chat._id}
              chatObject={chat}
              userObject={userObject}
              socket={socket}
            />
          );
        })}
      </div>
    </div>
  );
}
