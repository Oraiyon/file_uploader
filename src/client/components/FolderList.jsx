import styles from "../stylesheets/FolderList.module.css";
import Icon from "@mdi/react";
import { mdiFolder } from "@mdi/js";
import { useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";

const Folders = (props) => {
  const folderLinkRef = useRef(null);

  useEffect(() => {
    if (props.folderId) {
      folderLinkRef.current.click();
    }
  }, [props.folderId]);

  if (!props.folderList.length) {
    return <p>No folders.</p>;
  } else {
    return (
      <>
        <div className={styles.folderContainer}>
          {props.folderList.map((folder) => (
            <div
              key={folder.id}
              className={styles.folder}
              onClick={() => props.setFolderId(folder.id)}
            >
              <Icon path={mdiFolder}></Icon>
              <p>{folder.name}</p>
            </div>
          ))}
        </div>
        <Link to={`/${props.user.id}/${props.folderId}`} ref={folderLinkRef}></Link>
      </>
    );
  }
};

export default Folders;
