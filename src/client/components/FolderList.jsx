import styles from "../stylesheets/FolderList.module.css";
import Icon from "@mdi/react";
import { mdiFolder, mdiClose, mdiShareVariant, mdiAccount } from "@mdi/js";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useRef, useState } from "react";

const Folders = (props) => {
  const [folderModal, setFolderModal] = useState(false);
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
        setFolderModal(true);
        setDeleteMessage(
          `${folder.name} has ${data.filesLength} ${data.filesLength === 1 ? "file" : "files"} inside. Are you sure you want to delete ${folder.name}?`
        );
        setFolderToBeDeleted(folder);
      } else {
        props.setFolderList(data);
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFolderWithFiles = async () => {
    try {
      const response = await fetch(`/api/${props.user.id}/delete/${folderToBeDeleted.id}/files`, {
        method: "DELETE"
      });
      const data = await response.json();
      props.setFolderList(data);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setFolderModal(false);
    setDeleteMessage("");
  };

  const shareFolder = async () => {
    try {
      //
    } catch (error) {
      console.log(error);
    }
  };

  const DisplayFolderHeader = (props) => {
    if (!deleteMessage) {
      return (
        <div className={styles.folderButtons}>
          <button>
            <Icon path={mdiShareVariant}></Icon>
          </button>
          <p>{props.folder.name}</p>
          <button onClick={() => deleteFolder(props.folder)}>
            <Icon path={mdiClose} title={"Delete"}></Icon>
          </button>
        </div>
      );
    } else {
      return (
        <div className={styles.folderButtons}>
          <button>
            <Icon path={mdiShareVariant}></Icon>
          </button>
          <p>{props.folder.name}</p>
          <button>
            <Icon path={mdiClose}></Icon>
          </button>
        </div>
      );
    }
  };

  const DisplayFolderFooter = (props) => {
    return (
      <div className={styles.folderCreator}>
        <Icon path={mdiAccount}></Icon>
        <p>{props.folder.User.username}</p>
      </div>
    );
  };

  const DisplayFolderModal = (props) => {
    if (props.folderModal) {
      return (
        <div className={styles.folderModal} ref={folderModalRef}>
          <button onClick={closeModal}>
            <Icon path={mdiClose}></Icon>
          </button>
          <p>{deleteMessage}</p>
          <button onClick={deleteFolderWithFiles}>DELETE FOLDER</button>
        </div>
      );
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
                <DisplayFolderHeader folder={folder} />
                <Link to={`/${props.user.id}/${folder.id}`}>
                  <div className={styles.folder} onClick={() => props.setSelectedFolder(folder)}>
                    <Icon path={mdiFolder} className={styles.folderIcon}></Icon>
                  </div>
                </Link>
                <DisplayFolderFooter folder={folder} />
              </div>
            ) : (
              <div key={folder.id} className={styles.invalidFolderCard}>
                <DisplayFolderHeader folder={folder} />
                <div className={styles.folder}>
                  <Icon path={mdiFolder} className={styles.folderIcon}></Icon>
                </div>
                <DisplayFolderFooter folder={folder} />
              </div>
            )
          )}
          <DisplayFolderModal folderModal={folderModal} />
        </div>
      </>
    );
  }
};

export default Folders;
