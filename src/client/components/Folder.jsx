import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "../stylesheets/Folder.module.css";

const Folder = () => {
  const [user, setUser, folderList, folderId, setFolderId] = useOutletContext();

  const [files, setFiles] = useState(null);

  useEffect(() => {
    const fetchFolder = async () => {
      const response = await fetch(`/api/${folderId}/files`);
      const data = await response.json();
      console.log(data);
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
      {files
        ? files.map((file) => (
            <div key={file.id}>
              <p>{file.name}</p>
            </div>
          ))
        : ""}
    </>
  );
};

export default Folder;
