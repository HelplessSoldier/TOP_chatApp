import "./Header.css";
import SearchBar from "./headerComps/SearchBar";

export default function Header({ setPageState, userObject, setUserObject }) {
  const isLoggedIn = hasCookieByName(document.cookie, "jwt");

  const handleSignOutClick = (e) => {
    e.preventDefault();
    document.cookie = `jwt=; expires=0; path=/`;
    setPageState("LogIn");
    setUserObject(null);
  };

  const handleChatButtonClick = (e) => {
    e.preventDefault();
    setPageState("Chat");
  };

  const handleLogInButtonClick = (e) => {
    e.preventDefault();
    setPageState("LogIn");
  };

  const handleSignUpButtonClick = (e) => {
    e.preventDefault();
    setPageState("SignUp");
  };

  return (
    <div className="headerContainer">
      <h1 className="headerLogo">SPRK</h1>
      {isLoggedIn && (
        <SearchBar />
      )}
      <div className="headerButtonsAndGreetingContainer">
        {userObject !== null && (
          <>
            <p className="headerGreeting">Logged in as: {userObject.username}</p>
          </>
        )}
        {isLoggedIn && (
          <>
            <button className="headerButton" onClick={handleSignOutClick}>
              Sign out
            </button>
          </>
        )}
        {!isLoggedIn && (
          <>
            <button className="headerButton" onClick={handleLogInButtonClick}>
              Log In
            </button>
            <button className="headerButton" onClick={handleSignUpButtonClick}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function hasCookieByName(cookiesString, name) {
  const cookies = cookiesString.split(";");
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name && cookieValue !== "") {
      return true;
    }
  }
  return false;
}
