import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <>
      <Header user={user} />
      <Outlet context={[user, setUser]} />
    </>
  );
};

export default App;
