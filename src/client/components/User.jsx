import { useOutletContext } from "react-router-dom";

const User = () => {
  const [user, setUser] = useOutletContext();

  if (!user) {
    return <h2>APP PAGE</h2>;
  } else {
    return <h2>USER PAGE</h2>;
  }
};

export default User;
