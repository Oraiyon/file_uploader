import { Link } from "react-router-dom";
import styles from "../stylesheets/Header.module.css";

const Header = (props) => {
  return (
    <>
      <nav className={styles.header}>
        <h1>
          <Link>Hello {props.user ? props.user.username : "World"}</Link>
        </h1>
        {props.user ? (
          <a href="/logout">Log Out</a>
        ) : (
          <div className={styles.header_links}>
            <Link to={"/signup"}>Sign Up</Link>
            <Link to={"/login"}>Log In</Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
