import { useEffect, useState } from "react";
import Header from "./Header";

const User = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const getUser = async () => {
        const fetchUser = await fetch(`/api${window.location.pathname}`);
        const data = await fetchUser.json();
        if (!data) {
          window.location.href = "/login";
          return;
        }
        setUser(data);
      };
      getUser();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Header user={user} />
      <h2>USER PAGE</h2>
    </>
  );
};

export default User;
