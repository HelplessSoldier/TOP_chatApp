import { useState } from "react";
import "./SignUp.css";
import globals from "../../../../publicGlobals/apiGlobals.json";

const apiUri =
  globals.serverUri + ":" + globals.serverPort + globals.apiVersion;
const signupUri = apiUri + "/accounts/signup";

export default function SignUp({ setPageState }) {
  const [validationErrors, setValidationErrors] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const formBody = {
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    try {
      const response = await fetch(signupUri, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formBody),
      });
      const responseData = await response.json();
      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setPageState("LogIn");
        }, 3000);
      } else {
        setShowSuccess(false);
        setValidationErrors(responseData.errors);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="signUpContainer">
      <h1>Sign Up</h1>
      <form className="signUpForm" onSubmit={handleSubmit}>
        <label htmlFor="email">E-Mail</label>
        <input type="email" name="email" />
        <label htmlFor="username">Username</label>
        <input type="text" name="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" />
        <button className="formButton">Submit</button>
      </form>
      <div className="signUpSuccessAndErrorContainer">
        {showSuccess ? <p>User successfully saved!</p> : null}
        {validationErrors.length > 0 && (
          <div>
            {validationErrors.map((error) => (
              <p key={error.param}>{error.msg}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
