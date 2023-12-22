import "./LogIn.css";
import globals from "../../../../publicGlobals/apiGlobals.json";
import { useState } from "react";

const apiUri =
  globals.serverUri + ":" + globals.serverPort + globals.apiVersion;
const loginUri = apiUri + "/accounts/login";
const logoutUri = apiUri + "/accounts/logout";

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
      console.log(responseData.errors);

      if (response.ok && responseData.message !== "Validation error") {
        setValidationErrors([]);
      } else {
        setValidationErrors(responseData.errors);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleNoAccButton(e) {
    e.preventDefault();
    setPageState("SignUp");
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
      <div className="noAccContainer">
        <p>Don&apos;t have an account?</p>
        <button className="noAccBtn" onClick={handleNoAccButton}>
          {" "}
          Create one here!
        </button>
      </div>
      <div className="validationErrorContainer">
        {validationErrors.length > 0 &&
          validationErrors.map((error) => <p key={error.msg}>{error.msg}</p>)}
      </div>
    </div>
  );
}
