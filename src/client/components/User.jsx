import { Link, useOutletContext } from "react-router-dom";
import Folders from "./Folders";

const User = () => {
  const [user, setUser] = useOutletContext();

  if (!user) {
    return <h2>UNAUTHORIZED USER.</h2>;
  } else {
    return (
      <>
        <Link to={`/${user.id}/upload`}>Upload File</Link>
        <Folders user={user} />
      </>
    );
  }
};

export default User;
