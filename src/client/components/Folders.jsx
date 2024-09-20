import styles from "../stylesheets/Folders.module.css";

const Folders = (props) => {
  if (!props.folderList.length) {
    return <p>No folders.</p>;
  } else {
    return (
      <div className={styles.folderContainer}>
        {props.folderList.map((folder) => (
          <div key={folder.id}>{folder.name}</div>
        ))}
      </div>
    );
  }
};

export default Folders;
