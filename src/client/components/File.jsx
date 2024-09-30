import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "../stylesheets/File.module.css";
import Navbar from "./Navbar";
import FileButtons from "./FileButtons";

const File = () => {
  const [
    user,
    setUser,
    folderList,
    setFolderList,
    selectedFolder,
    setSelectedFolder,
    selectedFile,
    setSelectedFile,
    files,
    setFiles
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
  }, [selectedFile]);

  if (!user) {
    window.location.href = "/";
    return;
  }

  const DisplayFile = () => {
    if (file) {
      return (
        <div className={styles.fileContainer}>
          <h3>
            {file.name}.{file.format}
          </h3>
          <img src={file.url} alt={file.name} />
          <FileButtons
            file={file}
            user={user}
            selectedFolder={selectedFolder}
            setFiles={setFiles}
          />
        </div>
      );
    }
  };

  return (
    <>
      <Navbar level={3} user={user} selectedFolder={selectedFolder} selectedFile={selectedFile} />
      <DisplayFile />
    </>
  );
};

export default File;
