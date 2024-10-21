import styles from "../stylesheets/FolderList.module.css";
import Icon from "@mdi/react";
import { mdiFolder, mdiClose, mdiShareVariant, mdiAccount } from "@mdi/js";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useRef, useState } from "react";

const Folders = (props) => {
  const [displayDeleteFolderModal, setDisplayDeleteFolderModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [folderToBeDeleted, setFolderToBeDeleted] = useState(null);
  const [displayShareFolderModal, setDisplayShareFolderModal] = useState(false);
  const [folderToBeShared, setFolderTobeShared] = useState(null);

  const deleteFolderModal = useRef(null);
  const shareFolderModal = useRef(null);

  const DisplayFolderHeader = (props) => {
    if (!modalMessage) {
      return (
        <div className={styles.folderButtons}>
          <button onClick={() => shareFolderButton(props.folder)}>
            <Icon path={mdiShareVariant}></Icon>
          </button>
          <p>{props.folder.name}</p>
          <button onClick={() => deleteFolderButton(props.folder)}>
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

  const deleteFolderButton = async (folder) => {
    try {
      const response = await fetch(`/api/${props.user.id}/delete/${folder.id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      if (data.filesLength) {
        setDisplayDeleteFolderModal(true);
        setModalMessage(
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

  const DisplayDeleteFolderModal = (props) => {
    if (props.displayDeleteFolderModal) {
      return (
        <div className={styles.deleteFolderModal} ref={deleteFolderModal}>
          <button onClick={closeModal}>
            <Icon path={mdiClose}></Icon>
          </button>
          <p>{modalMessage}</p>
          <button onClick={deleteFolderWithFiles}>DELETE FOLDER</button>
        </div>
      );
    }
  };

  const shareFolderButton = async (folder) => {
    try {
      setDisplayShareFolderModal(true);
      setFolderTobeShared(folder);
      setModalMessage("Share");
    } catch (error) {
      console.log(error);
    }
  };

  const DisplayShareFolderModal = (props) => {
    const [shareLink, setShareLink] = useState("");
    const [shareDuration, setShareDuration] = useState(null);

    const shareDurationRef = useRef(null);

    const submitShareDuration = async () => {
      try {
        const response = await fetch(`/api/${props.user.id}/share/${props.folderToBeShared.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            length: shareDurationRef.current.value
          })
        });
        const data = await response.json();
        setShareLink(window.location.origin + "/folder/" + data.id + "/share");
        setShareDuration(shareDurationRef.current.value);
      } catch (error) {
        console.log(error);
      }
    };

    if (props.displayShareFolderModal) {
      return (
        <div className={styles.shareFolderModal} ref={shareFolderModal}>
          <button onClick={closeModal}>
            <Icon path={mdiClose}></Icon>
          </button>
          {!shareDuration ? (
            <div>
              <label htmlFor="shareDuration">Share Duration: </label>
              <select name="shareDuration" id="shareDuration" ref={shareDurationRef}>
                <option value="1">1 Day</option>
                <option value="5">5 Days</option>
                <option value="7">7 Days</option>
              </select>
              <button onClick={submitShareDuration}>Send</button>
            </div>
          ) : (
            <div>
              <p>Share Link: {shareLink}</p>
            </div>
          )}
        </div>
      );
    }
  };

  const closeModal = () => {
    setDisplayDeleteFolderModal(false);
    setModalMessage("");
    setDisplayShareFolderModal(false);
  };

  if (!props.folderList.length) {
    return <p>No folders.</p>;
  } else {
    return (
      <>
        <Navbar level={1} user={props.user} />
        <div className={styles.folderContainer}>
          {props.folderList.map((folder) =>
            !modalMessage ? (
              <div key={folder.id} className={styles.folderCard}>
                <DisplayFolderHeader folder={folder} />
                <Link to={`/${props.user.id}/folder/${folder.id}`}>
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
          <DisplayDeleteFolderModal displayDeleteFolderModal={displayDeleteFolderModal} />
          <DisplayShareFolderModal
            user={props.user}
            displayShareFolderModal={displayShareFolderModal}
            folderToBeShared={folderToBeShared}
          />
        </div>
      </>
    );
  }
};

export default Folders;
