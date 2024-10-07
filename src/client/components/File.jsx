import { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "../stylesheets/File.module.css";
import Navbar from "./Navbar";
import DisplayFileSize from "./DisplayFileSize";
import Icon from "@mdi/react";
import { mdiDownload, mdiClose } from "@mdi/js";

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

  const downloadLink = useRef(null);

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

  const downloadFile = () => {
    const start = file.url.substr(0, 50);
    const end = file.url.slice(49);
    const url = start + `fl_attachment:${file.name}` + end;
    downloadLink.current.href = url;
    downloadLink.current.click();
  };

  const deleteFile = async () => {
    const response = await fetch(`/api/${props.user.id}/${selectedFolder.id}/delete/${file.id}`, {
      method: "DELETE"
    });
    const data = await response.json();
    setFiles(data);
  };

  const DisplayFile = () => {
    if (file) {
      return (
        <div className={styles.fileContainer}>
          <div>
            <div className={styles.file_buttons}>
              <button>
                <Icon path={mdiDownload} title="Download" onClick={downloadFile}></Icon>
              </button>
              <h3>
                {file.name}.{file.format}
              </h3>
              <button>
                <Icon path={mdiClose} title="Delete" onClick={deleteFile}></Icon>
              </button>
              <a ref={downloadLink} href=""></a>
            </div>
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
