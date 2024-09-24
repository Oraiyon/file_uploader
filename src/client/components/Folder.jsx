import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "../stylesheets/Folder.module.css";
import Icon from "@mdi/react";
import { mdiFile } from "@mdi/js";

const Folder = () => {
  const [user, setUser, folderList, folderId, setFolderId] = useOutletContext();

  const [files, setFiles] = useState(null);

  useEffect(() => {
    const fetchFolder = async () => {
      const response = await fetch(`/api/${folderId}/files`);
      const data = await response.json();
      setFiles(data);
    };
    fetchFolder();
  }, [folderId]);

  if (!user) {
    window.location.href = "/";
    return;
  }

  return (
    <>
      <div className={styles.fileContainer}>
        {files
          ? files.map((file) => (
              <div key={file.id} className={styles.file}>
                <Icon path={mdiFile}></Icon>
                <p>{file.name}</p>
              </div>
            ))
          : ""}
      </div>
    </>
  );
};

export default Folder;
