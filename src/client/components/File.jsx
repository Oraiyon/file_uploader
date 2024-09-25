import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const File = () => {
  const [user, setUser, folderList, folderId, setFolderId, fileId, setFileId] = useOutletContext();

  const [file, setFile] = useState(null);

  // Create bar that displays previous tabs
  // Folders > files > file
  useEffect(() => {
    const fetchFile = async () => {
      const response = await fetch(`/api/${fileId}/file`);
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
      <h3>{file ? file.name : ""}</h3>
    </>
  );
};

export default File;
