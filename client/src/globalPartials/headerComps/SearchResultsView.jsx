import "./SearchResultsView.css";
import SearchElement from "./SearchElement";

export default function SearchResultsView({ searchResults, setSearchResults }) {
  const handleCloseButton = () => {
    setSearchResults(null);
  };

  console.log(searchResults);

  return (
    <div className="searchResultsContainer">
      <div className="searchResultsHeader">
        <h1>Hi from the results comp!</h1>
        <button className="hiddenButton" onClick={handleCloseButton}>
          <img
            className="searchResultsCloseIcon"
            src="./icons/close-svgrepo-com.svg"
          />
        </button>
      </div>
    </div>
  );
}
