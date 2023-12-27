import "./SearchBar.css";

export default function SearchBar({ socket }) {
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const searchTerm = e.target.searchInput.value;

    socket.send(
      JSON.stringify({ message: "hello c:", searchTerm: searchTerm })
    );

    socket.addEventListener("message", (e) => {
      const message = e.data;
      console.log(message);
    });
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
