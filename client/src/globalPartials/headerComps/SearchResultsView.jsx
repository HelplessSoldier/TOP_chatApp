import "./SearchResultsView.css";
import SearchElementUser from "./SearchElementUser";

export default function SearchResultsView({ searchResults, setSearchResults }) {
  const handleCloseButton = () => {
    setSearchResults(null);
  };

  console.log(searchResults);
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
          return <SearchElementUser key={user.username} />;
        })}
      </div>
    </div>
  );
}
