import './SignUp.css'
import globals from '../../../../globals/apiGlobals.json';

const apiUri = globals.apiUri + ":" + globals.apiPort + globals.dbRoute;

export default function SignUp() {

  function handleSubmitButton(e) {
    e.preventDefault();
    console.log('hi from the handle submit func!')
  }

  return (
    <div className="signUpContainer">
      <form className='signUpForm'>
        <label htmlFor='email'>E-Mail</label>
        <input type='email' name='email' />
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' />
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input type='password' name='confirmPassword' />
        <button className='formButton' onClick={handleSubmitButton}>Sign Up!</button>
      </form>
    </div>
  )
}

