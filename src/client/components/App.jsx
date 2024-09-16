import { Link } from "react-router-dom";

const App = () => {
  return (
    <>
      <h1>HELLO WORLD</h1>
      <Link to={"/signup"}>Sign Up</Link>
      <Link to={"/login"}>Log In</Link>
    </>
  );
};

export default App;
