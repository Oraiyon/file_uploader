import { Link } from "react-router-dom";
import styles from "../stylesheets/Navbar.module.css";

const Navbar = (props) => {
  if (props.level === 1) {
    return (
      <nav className={styles.navContainer}>
        <Link to={`/${props.user.id}`}>Folder List</Link>
      </nav>
    );
  } else if (props.level === 2) {
    return (
      <nav className={styles.navContainer}>
        <Link to={`/${props.user.id}`}>Folder List</Link>
        <Link to={`/${props.user.id}/${props.selectedFolder.id}`}>{props.selectedFolder.name}</Link>
      </nav>
    );
  } else if (props.level === 3) {
    return (
      <nav className={styles.navContainer}>
        <Link to={`/${props.user.id}`}>Folder List</Link>
        <Link to={`/${props.user.id}/${props.selectedFolder.id}`}>{props.selectedFolder.name}</Link>
        <Link to={`/${props.user.id}/${props.selectedFolder.id}/${props.selectedFile.id}`}>
          {props.selectedFile.name}.{props.selectedFile.format}
        </Link>
      </nav>
    );
  }
};

export default Navbar;
