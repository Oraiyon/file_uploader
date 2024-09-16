import { useRef } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const submitLogin = async (e) => {
    try {
      e.preventDefault();
      const fetchData = await fetch("/login", {
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
      if (data) {
        window.location.href = `/${data.id}`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form action="" onSubmit={submitLogin}>
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
