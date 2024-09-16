import { useEffect, useState } from "react";

const User = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const getUser = async () => {
        const fetchUser = await fetch(`/api/get-user`);
        const data = await fetchUser.json();
        if (data === "/") {
          window.location.href = "/";
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
      <h1>HELLO {user ? user.username : ""}</h1>
      <a href="/logout">Log Out</a>
    </>
  );
};

export default User;
