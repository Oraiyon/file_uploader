import { useEffect, useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useOutletContext();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const redirectRef = useRef(null);

  useEffect(() => {
    if (user) {
      redirectRef.current.click();
    }
  }, [user]);

  const submitLogin = async (e) => {
    try {
      e.preventDefault();
      const fetchUser = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value
        })
      });
      const data = await fetchUser.json();
      if (data) {
        setUser(data);
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
      <Link to={"/"}>Home</Link>
      <Link to={"/signup"}>Sign Up</Link>
      {user ? (
        <Link to={`/${user.id}`} ref={redirectRef} style={{ display: "none" }}>
          TEST
        </Link>
      ) : (
        ""
      )}
    </>
  );
};

export default Login;
