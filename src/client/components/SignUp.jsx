import { useRef } from "react";
import styles from "../stylesheets/SignUp.module.css";

const SignUp = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

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
          password: passwordRef.current.value
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
        <button>Sign Up</button>
      </form>
    </>
  );
};

export default SignUp;
