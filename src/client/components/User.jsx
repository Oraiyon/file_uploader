import { useEffect, useState } from "react";

const User = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const getUser = async () => {
        // const fetchUser = await fetch(`/api/user/${}`);
        // const data = fetchUser.json();
        // setUser(data);
      };
      getUser();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logout = async () => {
    try {
      const fetchUser = await fetch("/logout");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>HELLO {user.username}</h1>
      <button onClick={logout}>Log Out</button>
    </>
  );
};

export default User;
