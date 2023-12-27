import "./SearchBar.css";

export default function SearchBar({ socket }) {

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchTerm = e.target.searchInput.value;
    console.log(searchTerm)
    console.log(socket)
  };

  return (
    <form className="searchbarForm" onSubmit={handleSearchSubmit}>
      <input type="search" name="searchInput" className="searchInput" />
      <button type="submit" className="searchButton">
        <img src="./icons/search-svgrepo-com.svg" className="searchIcon"></img>
      </button>
    </form>
  );
}
