import "./Header.css";

export default function Header({ setPageState }) {
  const isLoggedIn = hasCookieByName(document.cookie, "jwt");

  const handleSignOutClick = (e) => {
    e.preventDefault();
    document.cookie = `jwt=; expires=0; path=/`;
    setPageState('LogIn')
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
      <div className="headerButtonsContainer">
        {isLoggedIn && (
          <>
            <button className="headerButton" onClick={handleChatButtonClick}>
              Chat
            </button>
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
    console.log(cookieValue);
    if (cookieName === name && cookieValue !== "") {
      return true;
    }
  }
  return false;
}
