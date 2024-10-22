import { useEffect, useState } from "react";

const UnauthorizedFolder = () => {
  const [folder, setFolder] = useState(null);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const link = window.location.href.split("/");
        const response = await fetch(`/api/${link[4]}/share`);
        const data = await response.json();
        setFolder(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFolders();
  }, []);

  return <h1>{folder ? folder.name : "UNAUTHORIZED USER"}</h1>;
};

export default UnauthorizedFolder;
