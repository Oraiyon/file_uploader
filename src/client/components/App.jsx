import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const getUser = async () => {
        if (window.location.pathname !== "/") {
          const fetchUser = await fetch(`/api${window.location.pathname}`);
          const data = await fetchUser.json();
          if (!data) {
            window.location.href = "/login";
            return;
          }
          setUser(data);
        }
      };
      getUser();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Header user={user} />
      <Outlet context={[user]} />
    </>
  );
};

export default App;
