import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "../stylesheets/File.module.css";
import Navbar from "./Navbar";
import FileButtons from "./FileButtons";
import DisplayFileSize from "./DisplayFileSize";

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
          <div>
            <FileButtons
              file={file}
              user={user}
              selectedFolder={selectedFolder}
              setFiles={setFiles}
            />
            <img src={file.url} alt={file.name} />
            <DisplayFileSize file={file} />
          </div>
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
