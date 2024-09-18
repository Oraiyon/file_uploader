import { useOutletContext } from "react-router-dom";
import UploadFileForm from "./UploadFileForm";

const User = () => {
  const [user, setUser] = useOutletContext();

  if (!user) {
    return <h2>UNAUTHORIZED USER</h2>;
  } else {
    return <UploadFileForm />;
  }
};

export default User;
