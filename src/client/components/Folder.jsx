import { useOutletContext } from "react-router-dom";

const Folder = () => {
  const [user, setUser, folderList] = useOutletContext();

  if (!user) {
    window.location.href = "/";
    return;
  }

  return (
    <>
      <h2>HELLO WORLD</h2>
    </>
  );
};

export default Folder;
