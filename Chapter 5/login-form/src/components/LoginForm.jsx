import {useState} from 'react'

function LoginForm() {
  const [showPassword, setShowPassword] = useState();

  function togglePasswordView() {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <div>
        <input className="input" type="text" placeholder="Email" />
      </div>
      <div>
        <input className="input password"
          type={
            showPassword ? 'text' : 'password'
          }
          placeholder="Password" />
        <button onClick={togglePasswordView}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <button className="btn">Login</button>
      <button className="btn">Sign up</button>
    </>
  )
}

export default LoginForm;