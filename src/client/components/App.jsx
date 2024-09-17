import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (window.location.pathname !== "/") {
          const fetchUser = await fetch(`/api${window.location.pathname}`);
          const data = await fetchUser.json();
          if (!data) {
            window.location.href = "/login";
            return;
          }
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <>
      <Header user={user} />
      <Outlet context={[user]} />
    </>
  );
};

export default App;
