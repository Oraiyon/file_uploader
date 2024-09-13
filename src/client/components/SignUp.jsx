import { useRef } from "react";
import styles from "../stylesheets/SignUp.module.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const submitSignUp = async (e) => {
    try {
      e.preventDefault();
      const fetchData = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
          confirmPassword: confirmPasswordRef.current.value
        })
      });
      const data = await fetchData.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form action="" onSubmit={submitSignUp}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" ref={usernameRef} />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" ref={passwordRef} />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          ref={confirmPasswordRef}
        />
        <button>Sign Up</button>
      </form>
      <Link to={"/login"}>Login</Link>
    </>
  );
};

export default SignUp;
