import styles from "../stylesheets/SignUp.module.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <form action="" method="POST">
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" name="confirmPassword" id="confirmPassword" />
        <button>Sign Up</button>
      </form>
      <Link to={"/"}>Home</Link>
      <Link to={"/login"}>Log In</Link>
    </>
  );
};

export default SignUp;
