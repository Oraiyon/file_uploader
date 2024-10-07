import styles from "../stylesheets/FolderList.module.css";
import Icon from "@mdi/react";
import { mdiFolder, mdiClose } from "@mdi/js";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useRef, useState } from "react";

const Folders = (props) => {
  const [displayFolderModal, setDisplayFolderModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [folderToBeDeleted, setFolderToBeDeleted] = useState(null);

  const folderModalRef = useRef(null);

  const deleteFolder = async (folder) => {
    try {
      const response = await fetch(`/api/${props.user.id}/delete/${folder.id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      if (data.filesLength) {
        setDisplayFolderModal(true);
        setDeleteMessage(
          `${folder.name} has ${data.filesLength} ${data.filesLength === 1 ? "file" : "files"} inside. Are you sure you want to delete ${folder.name}?`
        );
        setFolderToBeDeleted(folder);
      } else {
        props.setFolderList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setDisplayFolderModal(false);
    setDeleteMessage("");
  };

  const deleteFolderWithFiles = async () => {
    try {
      const response = await fetch(`/api/${props.user.id}/delete/${folderToBeDeleted.id}/files`, {
        method: "DELETE"
      });
      const data = await response.json();
      props.setFolderList(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!props.folderList.length) {
    return <p>No folders.</p>;
  } else {
    return (
      <>
        <Navbar level={1} user={props.user} />
        <div className={styles.folderContainer}>
          {props.folderList.map((folder) =>
            !deleteMessage ? (
              <div key={folder.id} className={styles.folderCard}>
                <button onClick={() => deleteFolder(folder)}>
                  <Icon path={mdiClose} title={"Delete"}></Icon>
                </button>
                <Link to={`/${props.user.id}/${folder.id}`}>
                  <div className={styles.folder} onClick={() => props.setSelectedFolder(folder)}>
                    <Icon path={mdiFolder} className={styles.folderIcon}></Icon>
                    <p>{folder.name}</p>
                  </div>
                </Link>
              </div>
            ) : (
              <div key={folder.id} className={styles.invalidFolderCard}>
                <button>X</button>
                <div className={styles.folder}>
                  <Icon path={mdiFolder} className={styles.folderIcon}></Icon>
                  <p>{folder.name}</p>
                </div>
              </div>
            )
          )}
          {displayFolderModal ? (
            <div className={styles.folderModal} ref={folderModalRef}>
              <button onClick={closeModal}>
                <Icon path={mdiClose} title={"Delete"}></Icon>
              </button>
              <p>{deleteMessage}</p>
              <button onClick={deleteFolderWithFiles}>DELETE FOLDER</button>
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
};

export default Folders;
