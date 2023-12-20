import "./LogIn.css";
import globals from '../../../../publicGlobals/apiGlobals.json';

const apiUri = globals.serverUri + ":" + globals.serverPort + globals.apiVersion;
const loginUri = apiUri + '/accounts/login'

export default function LogIn({ setPageState }) {

  async function handleSubmit(e) {
    e.preventDefault();

    const formBody = {
      email: e.target.email.value,
      password: e.target.password.value,
    }

    try {
      const response = await fetch(loginUri, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formBody),
      })

      const responseData = await response.json();

      if (response.ok) {
        console.log(responseData);
      } else {
        console.log(responseData);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleNoAccButton(e) {
    e.preventDefault();
    setPageState("SignUp")
  }

  return (
    <div className="logInContainer">
      <h1>Log In</h1>
      <form className="logInForm" onSubmit={handleSubmit}>
        <label htmlFor="email">E-Mail</label>
        <input type="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <button className="formButton" >
          Submit
        </button>
      </form>
      <div className="noAccContainer">
        <p>Don&apos;t have an account?</p>
        <button className="noAccBtn" onClick={handleNoAccButton}> Create one here!</button>
      </div>
    </div>
  );
}
