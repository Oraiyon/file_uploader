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
    selectedFolder,
    setSelectedFolder,
    selectedFile,
    setSelectedFile
  ] = useOutletContext();

  const [files, setFiles] = useState(null);

  useEffect(() => {
    const fetchFolder = async () => {
      const response = await fetch(`/api/${selectedFolder.id}/files`);
      const data = await response.json();
      setFiles(data);
    };
    if (user) {
      fetchFolder();
    }
  }, [selectedFolder]);

  if (!user) {
    window.location.href = "/";
    return;
  }

  return (
    <>
      <Navbar type={2} user={user} selectedFolder={selectedFolder} />
      <div className={styles.fileContainer}>
        {files
          ? files.map((file) => (
              <Link to={`/${user.id}/${selectedFolder.id}/${file.id}`} key={file.id}>
                <div className={styles.file} onClick={() => setSelectedFile(file)}>
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
