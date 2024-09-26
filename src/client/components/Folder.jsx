import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import styles from "../stylesheets/Folder.module.css";
import Icon from "@mdi/react";
import { mdiFile } from "@mdi/js";
import Navbar from "./Navbar";

const Folder = () => {
  const [
    user,
    setUser,
    folderList,
    setFolderList,
    selectedFolder,
    setSelectedFolder,
    selectedFile,
    setSelectedFile
  ] = useOutletContext();

  const [files, setFiles] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      const response = await fetch(`/api/${selectedFolder.id}/files`);
      const data = await response.json();
      setFiles(data);
    };
    if (user) {
      fetchFiles();
    }
  }, [selectedFolder]);

  if (!user) {
    window.location.href = "/";
    return;
  }

  const deleteFile = async (file) => {
    const response = await fetch(`/api/${user.id}/${selectedFolder.id}/delete/${file.id}`, {
      method: "DELETE"
    });
    const data = await response.json();
    setFiles(data);
  };

  return (
    <>
      <Navbar level={2} user={user} selectedFolder={selectedFolder} />
      <div className={styles.fileContainer}>
        {files && files.length ? (
          files.map((file) => (
            <div className={styles.fileCard} key={file.id}>
              <Link to={`/${user.id}/${selectedFolder.id}/${file.id}`}>
                <div className={styles.file} onClick={() => setSelectedFile(file)}>
                  <Icon path={mdiFile}></Icon>
                </div>
              </Link>
              <p>{file.name}</p>
              <div className={styles.file_buttons}>
                <button>Download</button>
                <button onClick={() => deleteFile(file)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>NO FILES.</p>
        )}
      </div>
    </>
  );
};

export default Folder;
