import "./LogIn.css";

export default function LogIn({ setPageState }) {
  function handleSubmitButton(e) {
    e.preventDefault();
    console.log("login submit btn pressed");
  }

  function handleNoAccButton(e) {
    e.preventDefault();
    setPageState("SignUp")
  }

  return (
    <div className="logInContainer">
      <h1>Log In</h1>
      <form className="logInForm">
        <label htmlFor="email">E-Mail</label>
        <input type="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <button className="formButton" onClick={handleSubmitButton}>
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
