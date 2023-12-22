import "./protectedRoutes.css";
import globals from '../../../../publicGlobals/apiGlobals.json';

const apiUri =
  globals.serverUri + ":" + globals.serverPort + globals.apiVersion;
const protectedUri = apiUri + "/protectedRoute";

export default function ProtectedRoutes({ setPageState }) {

  const handleLoginPageClick = (e) => {
    e.preventDefault();
    setPageState('LogIn')
  }

  const handleProtectedButtonClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(protectedUri, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="protectedRoutesContiner">
      <h1>Hi from protectedRoutes pagestate!</h1>
      <p>This is a page for debugging/testing routes.</p>
      <p>
        It's only intended for dev stuff so if you're seeing this something's
        gone wrong lol
      </p>
      <button className="formButton" onClick={handleProtectedButtonClick}>Protected!</button>
      <button className="formButton" onClick={handleLoginPageClick}>login</button>
    </div>
  );
}
