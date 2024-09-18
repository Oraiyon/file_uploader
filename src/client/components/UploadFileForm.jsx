import { useRef } from "react";
import styles from "../stylesheets/UploadFileForm.module.css";

const UploadFileForm = () => {
  const titleRef = useRef(null);
  const fileRef = useRef(null);

  const uploadFile = async (e) => {
    try {
      e.preventDefault();
      const fetchUpload = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: titleRef.current.value,
          file: fileRef.current.value
        })
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form action="" method="POST">
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" id="title" ref={titleRef} />
        <label htmlFor="file">File: </label>
        <input type="file" name="file" id="file" ref={fileRef} />
        <button>Submit</button>
      </form>
    </>
  );
};

export default UploadFileForm;
