import { Link } from "react-router-dom";
import styles from "../stylesheets/Header.module.css";

const Header = (props) => {
  return (
    <>
      <nav className={styles.header}>
        <h1>
          <Link to={props.user ? `/${props.user.id}` : "/"}>Home</Link>
        </h1>
        {props.user ? (
          <div className={styles.right_header_links}>
            <Link to={`/${props.user.id}/upload`}>Upload File</Link>
            <a href="/logout">Log Out</a>
          </div>
        ) : (
          <div className={styles.right_header_links}>
            <Link to={"/signup"}>Sign Up</Link>
            <Link to={"/login"}>Log In</Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
