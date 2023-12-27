import './SearchBar.css';

export default function SearchBar() {
  return (
    <form className="searchbarForm">
      <input type="search" className='searchInput' />
      <button type='submit' className='searchButton'>
        <img src='./icons/search-svgrepo-com.svg' className='searchIcon'></img>
      </button>
    </form>
  )
}
