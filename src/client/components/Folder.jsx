const Folder = () => {
  if (!user) {
    window.location.href = "/";
    return;
  }

  return (
    <>
      <h2>HELLO WORLD</h2>
    </>
  );
};

export default Folder;
