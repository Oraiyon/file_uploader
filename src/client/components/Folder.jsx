import { useEffect, useRef, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import styles from "../stylesheets/Folder.module.css";
import Navbar from "./Navbar";
import Icon from "@mdi/react";
import { mdiDownloadBox, mdiTrashCan } from "@mdi/js";

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

  const downloadLink = useRef(null);

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

  const downloadFile = (file) => {
    const start = file.url.substr(0, 50);
    const end = file.url.slice(49);
    const url = start + `fl_attachment:${file.name}` + end;
    downloadLink.current.href = url;
    downloadLink.current.click();
  };

  return (
    <>
      <Navbar level={2} user={user} selectedFolder={selectedFolder} />
      <div className={styles.fileContainer}>
        {files && files.length ? (
          files.map((file) => (
            <div className={styles.fileCard} key={file.id}>
              <p>{file.name}</p>
              <Link to={`/${user.id}/${selectedFolder.id}/${file.id}`}>
                <div className={styles.file} onClick={() => setSelectedFile(file)}>
                  <img src={file.url}></img>
                </div>
              </Link>
              <div className={styles.file_buttons}>
                <Icon path={mdiDownloadBox} title="Download">
                  <button onClick={() => downloadFile(file)}></button>
                </Icon>
                <Icon path={mdiTrashCan} title="Delete">
                  <button onClick={() => deleteFile(file)}>Delete</button>
                </Icon>
              </div>
              <a ref={downloadLink} href=""></a>
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
