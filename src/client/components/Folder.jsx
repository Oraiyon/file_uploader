import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
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
              <Link to={`/${user.id}/${folderId}/${file.id}`} key={file.id}>
                <div className={styles.file}>
                  <Icon path={mdiFile}></Icon>
                  <p>{file.name}</p>
                </div>
              </Link>
            ))
          : ""}
      </div>
    </>
  );
};

export default Folder;
