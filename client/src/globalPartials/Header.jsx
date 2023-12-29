import { useState } from "react";
import "./Header.css";
import SearchBar from "./headerComps/SearchBar";
import SignOutAreYouSure from "./headerComps/SignOutAreYouSure";

export default function Header({
  setPageState,
  userObject,
  setUserObject,
  socket,
  setSearchResults,
}) {
  const [showSignoutConfirm, setShowSignoutConfirm] = useState(false);
  const isLoggedIn = hasCookieByName(document.cookie, "jwt");

  const handleSignOutClick = (e) => {
    e.preventDefault();
    setShowSignoutConfirm(true);
  };

  const handleLogInButtonClick = (e) => {
    e.preventDefault();
    setPageState("LogIn");
  };

  const handleSignUpButtonClick = (e) => {
    e.preventDefault();
    setPageState("SignUp");
  };

  const handleAccountButtonClick = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="headerContainer">
        <h1 className="headerLogo">SPRK</h1>
        {isLoggedIn && (
          <SearchBar socket={socket} setSearchResults={setSearchResults} />
        )}
        <div className="headerButtonsAndGreetingContainer">
          {userObject !== null && (
            <>
              <p className="headerGreeting">
                Logged in as: {userObject.username}
              </p>
            </>
          )}
          {isLoggedIn && (
            <>
              <button
                className="hiddenHeaderButton"
                onClick={handleAccountButtonClick}
              >
                <img
                  src="./icons/user-svgrepo-com.svg"
                  className="headerIcon"
                />
                <div className="alertCircle"></div>
              </button>
              <button
                className="hiddenHeaderButton"
                onClick={handleSignOutClick}
              >
                <img
                  src="./icons/signout-svgrepo-com.svg"
                  className="headerIcon"
                />
              </button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <button className="headerButton" onClick={handleLogInButtonClick}>
                Log In
              </button>
              <button
                className="headerButton"
                onClick={handleSignUpButtonClick}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
      {showSignoutConfirm && (
        <SignOutAreYouSure
          setPageState={setPageState}
          setShowSignoutConfirm={setShowSignoutConfirm}
          setUserObject={setUserObject}
        />
      )}
    </>
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
