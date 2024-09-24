import { Link, useOutletContext } from "react-router-dom";
import FolderList from "./FolderList";

const User = () => {
  const [user, setUser, folderList, folderId, setFolderId] = useOutletContext();

  if (!user) {
    return <h2>UNAUTHORIZED USER.</h2>;
  } else {
    return (
      <>
        <Link to={`/${user.id}/upload`}>Upload File</Link>
        <FolderList
          user={user}
          folderList={folderList}
          folderId={folderId}
          setFolderId={setFolderId}
        />
      </>
    );
  }
};

export default User;
