import { useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import styles from "../stylesheets/Folder.module.css";
import Navbar from "./Navbar";
import FileButtons from "./FileButtons";

const Folder = () => {
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

  return (
    <>
      <Navbar level={2} user={user} selectedFolder={selectedFolder} />
      <div className={styles.fileContainer}>
        {files && files.length ? (
          files.map((file) => (
            <div className={styles.fileCard} key={file.id}>
              <p>
                {file.name}.{file.format}
              </p>
              <Link to={`/${user.id}/${selectedFolder.id}/${file.id}`}>
                <div className={styles.file} onClick={() => setSelectedFile(file)}>
                  <img src={file.url}></img>
                </div>
              </Link>
              <FileButtons
                file={file}
                user={user}
                selectedFolder={selectedFolder}
                setFiles={setFiles}
              />
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
