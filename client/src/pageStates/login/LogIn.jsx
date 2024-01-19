import "./LogIn.css";
import globals from "../../../../publicGlobals/apiGlobals.json";
import { useState } from "react";
import PropTypes from "prop-types";

LogIn.propTypes = {
  setPageState: PropTypes.func,
};

const apiUri =
  globals.serverUri + ":" + globals.serverPort + globals.apiVersion;
const loginUri = apiUri + "/accounts/login";

export default function LogIn({ setPageState }) {
  const [validationErrors, setValidationErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formBody = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await fetch(loginUri, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formBody),
      });

      const responseData = await response.json();
      const { token } = responseData;
      document.cookie = `jwt=${token}; max-age=${7 * 24 * 60 * 60}; path=/; SameSite=None`;

      if (response.ok && responseData.message !== "Validation error") {
        setValidationErrors([]);
        setPageState("Chat");
      } else {
        setValidationErrors(responseData.errors);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`logInContainer ${loading ? "loading-cursor" : ""}`}>
      <h1>Log In</h1>
      <form className={`logInForm `} onSubmit={handleSubmit}>
        <label htmlFor="email">E-Mail</label>
        <input type="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <button className={`formButton ${loading ? "loading-cursor" : ""}`}>
          Submit
        </button>
      </form>
      <div className="validationErrorContainer">
        {validationErrors.length > 0 &&
          validationErrors.map((error) => <p key={error.msg}>{error.msg}</p>)}
      </div>
    </div>
  );
}
