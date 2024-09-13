import styles from "../stylesheets/SignUp.module.css";

const SignUp = () => {
  return (
    <>
      <form action="" method="post">
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" />
        <button>Sign Up</button>
      </form>
    </>
  );
};

export default SignUp;
