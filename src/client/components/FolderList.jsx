import styles from "../stylesheets/FolderList.module.css";
import Icon from "@mdi/react";
import { mdiFolder } from "@mdi/js";
import { Link } from "react-router-dom";

const Folders = (props) => {
  if (!props.folderList.length) {
    return <p>No folders.</p>;
  } else {
    return (
      <>
        <div className={styles.folderContainer}>
          {props.folderList.map((folder) => (
            <Link to={`/${props.user}/${folder.id}`} key={folder.id}>
              <div className={styles.folder} onClick={() => props.setFolderId(folder.id)}>
                <Icon path={mdiFolder}></Icon>
                <p>{folder.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  }
};

export default Folders;
