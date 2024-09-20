import { useState, useEffect } from "react";
import styles from "../stylesheets/Folders.module.css";

const Folders = (props) => {
  const [foldersList, setFoldersList] = useState([]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const foldersResponse = await fetch("/api/get/folders");
        const data = await foldersResponse.json();
        setFoldersList(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (props.user) {
      fetchFolders();
    }
  }, []);

  if (!foldersList.length) {
    return <p>No folders.</p>;
  } else {
    return (
      <div className={styles.folderContainer}>
        {foldersList.map((folder) => (
          <div key={folder.id}>{folder.name}</div>
        ))}
      </div>
    );
  }
};

export default Folders;
