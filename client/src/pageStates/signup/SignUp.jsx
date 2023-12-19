import './SignUp.css'
import globals from '../../../../publicGlobals/apiGlobals.json';

const apiUri = globals.serverUri + ":" + globals.serverPort + globals.dbRoute;

export default function SignUp({ setPageState }) {

  function handleSubmitButton(e) {
    e.preventDefault();
    console.log('hi from the handle submit func!')
  }

  function handleHasAccButton(e) {
    e.preventDefault();
    setPageState("LogIn")
  }

  return (
    <div className="signUpContainer">
      <h1>Sign Up</h1>
      <form className='signUpForm'>
        <label htmlFor='email'>E-Mail</label>
        <input type='email' name='email' />
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' />
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input type='password' name='confirmPassword' />
        <button className='formButton' onClick={handleSubmitButton}>Submit</button>
      </form>
      <div className="noAccContainer">
        <p>Already have an account?</p>
        <button className="noAccBtn" onClick={handleHasAccButton}> Log in here!</button>
      </div>
    </div>
  )
}

