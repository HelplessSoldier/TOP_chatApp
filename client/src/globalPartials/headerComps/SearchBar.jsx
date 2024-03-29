import { useEffect, useState } from "react";
import "./SearchBar.css";
import getCookie from "../../helpers/getCookie";
import PropTypes from 'prop-types';

SearchBar.propTypes = {
  socket: PropTypes.object,
  setSearchResults: PropTypes.func,
}

export default function SearchBar({ socket, setSearchResults }) {
  const [noResults, setNoResults] = useState(false);

  const handleShowNoResults = (time) => {
    setNoResults(true);
    const timeoutId = setTimeout(() => {
      setNoResults(false);
    }, time);

    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
    if (socket) {
      socket.addEventListener("message", (e) => {
        const message = JSON.parse(e.data);
        if (message.message === "Found items") {
          setSearchResults({
            searchTerm: message.searchTerm,
            users: message.users,
            chats: message.chats,
          });
        } else if (message.message === "No items found") {
          setSearchResults(null);
          handleShowNoResults(3000);
        }
      });
    }
  }, [socket, setSearchResults]);

  const handleSearchSubmit = (e) => {
    const token = getCookie(document.cookie, "jwt");
    e.preventDefault();

    const searchTerm = e.target.searchInput.value;

    socket.send(
      JSON.stringify({
        message: "Search request",
        searchTerm: searchTerm,
        token,
      })
    );
  };

  return (
    <form className="searchbarForm" onSubmit={handleSearchSubmit}>
      <input type="search" name="searchInput" className="searchInput" />
      <button type="submit" className="searchButton">
        <img src="./icons/search-svgrepo-com.svg" className="searchIcon"></img>
      </button>
      <img
        src="./icons/folder-no-access-svgrepo-com.svg"
        className={`noResultsIcon ${noResults ? "show" : ""}`}
      />
    </form>
  );
}
