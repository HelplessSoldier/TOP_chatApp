import { useEffect, useState } from "react";
import "./Header.css";
import SearchBar from "./headerComps/SearchBar";
import SignOutAreYouSure from "./headerComps/SignOutAreYouSure";
import hasAlerts from "../helpers/hasAlerts";
import PropTypes from "prop-types";
import { userObjectProps } from "../helpers/propValidation";

Header.propTypes = {
  setPageState: PropTypes.func,
  userObject: PropTypes.shape(userObjectProps),
  setUserObject: PropTypes.func,
  socket: PropTypes.object,
  setSearchResults: PropTypes.func,
};

export default function Header({
  setPageState,
  userObject,
  setUserObject,
  socket,
  setSearchResults,
}) {
  const [showSignoutConfirm, setShowSignoutConfirm] = useState(false);
  const [showAccountAlert, setShowAccountAlert] = useState(false);
  const isLoggedIn = hasCookieByName(document.cookie, "jwt");

  useEffect(() => {
    if (userObject) {
      setShowAccountAlert(hasAlerts(userObject));
    }
  }, [userObject]);

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
    setPageState("Account");
  };

  const handleChatButtonClick = (e) => {
    e.preventDefault();
    setPageState("Chat");
  };

  return (
    <>
      <div className="headerContainer">
        <h1 className="headerLogo" onClick={handleChatButtonClick}>
          SPRK
        </h1>
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
                onClick={handleChatButtonClick}
              >
                <img
                  src="./icons/chat-round-line-svgrepo-com.svg"
                  className="headerIcon"
                />
              </button>
              <button
                className="hiddenHeaderButton"
                onClick={handleAccountButtonClick}
              >
                <img
                  src="./icons/user-svgrepo-com.svg"
                  className="headerIcon"
                />
                {showAccountAlert && <div className="alertCircle"></div>}
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
