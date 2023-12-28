import "./SearchResultsView.css";

export default function SearchResultsView({ searchResults }) {
  return (
    <div className="searchResultsContainer">
      <h1>Hi from the results comp!</h1>
      <button className="hiddenButton">
        <img
          className="searchResultsCloseIcon"
          src="./icons/close-svgrepo-com.svg"
        />
      </button>
    </div>
  );
}
