import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "../stylesheets/File.module.css";
import Navbar from "./Navbar";

const File = () => {
  const [
    user,
    setUser,
    folderList,
    selectedFolder,
    setSelectedFolder,
    selectedFile,
    setSelectedFile
  ] = useOutletContext();

  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      const response = await fetch(`/api/${selectedFile.id}/file`);
      const data = await response.json();
      setFile(data);
    };
    if (user) {
      fetchFile();
    }
  }, []);

  if (!user) {
    window.location.href = "/";
    return;
  }

  return (
    <>
      <Navbar level={3} user={user} selectedFolder={selectedFolder} selectedFile={selectedFile} />
      <div className={styles.fileContainer}>
        <h3>{file ? file.name : ""}</h3>
      </div>
    </>
  );
};

export default File;
