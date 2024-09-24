import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";

const App = () => {
  const [user, setUser] = useState(null);
  const [folderList, setFoldersList] = useState([]);
  const [folderId, setFolderId] = useState(null);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const foldersResponse = await fetch("/api/get/folders");
        const data = await foldersResponse.json();
        setFoldersList(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      fetchFolders();
    }
  }, [user]);

  return (
    <>
      <Header user={user} />
      <Outlet context={[user, setUser, folderList, folderId, setFolderId]} />
    </>
  );
};

export default App;
