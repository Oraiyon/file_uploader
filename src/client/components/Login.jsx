import { useRef } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <>
      <form action="">
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" ref={usernameRef} />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" ref={passwordRef} />
        <button>Login</button>
      </form>
      <Link to={"/signup"}>Sign Up</Link>
    </>
  );
};

export default Login;
