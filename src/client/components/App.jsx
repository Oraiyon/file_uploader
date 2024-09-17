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

  const DisplayPage = () => {
    if (user) {
      return <Outlet />;
    } else {
      return <h2>APP PAGE</h2>;
    }
  };

  return (
    <>
      <Header user={user} />
      <DisplayPage />
    </>
  );
};

export default App;
