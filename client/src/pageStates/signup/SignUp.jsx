import './SignUp.css'
import globals from '../../../../publicGlobals/apiGlobals.json';

const apiUri = globals.serverUri + ":" + globals.serverPort + globals.apiVersion;
const singnupUri = apiUri + '/accounts/signup'

export default function SignUp({ setPageState }) {

  function handleSubmit(e) {

    e.preventDefault();

    const formBody = {
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value
    }

    fetch(singnupUri, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formBody),
    })

    console.log(singnupUri);
  }

  function handleHasAccButton(e) {
    e.preventDefault();
    setPageState("LogIn")
  }

  return (
    <div className="signUpContainer">
      <h1>Sign Up</h1>
      <form className='signUpForm' onSubmit={handleSubmit}>
        <label htmlFor='email'>E-Mail</label>
        <input type='email' name='email' />
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' />
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input type='password' name='confirmPassword' />
        <button className='formButton'>Submit</button>
      </form>
      <div className="noAccContainer">
        <p>Already have an account?</p>
        <button className="noAccBtn" onClick={handleHasAccButton}> Log in here!</button>
      </div>
    </div>
  )
}

