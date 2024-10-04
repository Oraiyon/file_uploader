import { useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import styles from "../stylesheets/Folder.module.css";
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

  const downloadFile = (file) => {
    const start = file.url.substr(0, 50);
    const end = file.url.slice(49);
    const url = start + `fl_attachment:${file.name}` + end;
    downloadLink.current.href = url;
    downloadLink.current.click();
  };

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
              <div className={styles.fileCardHeaders}>
                <button onClick={() => downloadFile(file)}>D</button>
                <p>
                  {file.name}.{file.format}
                </p>
                <button onClick={() => deleteFile(file)}>X</button>
              </div>
              <Link to={`/${user.id}/${selectedFolder.id}/${file.id}`}>
                <div className={styles.file} onClick={() => setSelectedFile(file)}>
                  <img src={file.url}></img>
                </div>
              </Link>
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
