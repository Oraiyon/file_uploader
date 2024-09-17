import { useOutletContext } from "react-router-dom";

const User = () => {
  const [user] = useOutletContext();

  const DisplayPage = () => {
    if (!user) {
      return <h2>APP PAGE</h2>;
    } else {
      return <h2>USER PAGE</h2>;
    }
  };

  return (
    <>
      <DisplayPage />
    </>
  );
};

export default User;
