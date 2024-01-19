import "./SignOutAreYouSure.css";
import PropTypes from "prop-types";

SignOutAreYouSure.propTypes = {
  setPageState: PropTypes.func,
  setShowSignoutConfirm: PropTypes.func,
  setUserObject: PropTypes.func,
}

export default function SignOutAreYouSure({
  setPageState,
  setShowSignoutConfirm,
  setUserObject
}) {

  const handleConfirm = (e) => {
    e.preventDefault();
    document.cookie = `jwt=; expires=0; path=/`;
    setUserObject(null);
    setPageState("LogIn");
    setShowSignoutConfirm(false);
    window.location.reload();
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setShowSignoutConfirm(false);
  }

  return (
    <div className="signoutConfirmContainer">
      <h2>Log out?</h2>
      <div className="logoutButtonsContainer">
        <button className="logoutButton" onClick={handleConfirm}>
          <img src="./icons/checkmark-svgrepo-com.svg" className="logoutIcon" />
        </button>
        <button className="logoutButton" onClick={handleCancel}>
          <img src="./icons/cancel-svgrepo-com.svg" className="logoutIcon" />
        </button>
      </div>
    </div>
  );
}
