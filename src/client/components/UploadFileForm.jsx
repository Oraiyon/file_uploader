import { useRef } from "react";
import styles from "../stylesheets/UploadFileForm.module.css";
import { useOutletContext } from "react-router-dom";

const UploadFileForm = () => {
  const [user, setUser] = useOutletContext();

  const folderRef = useRef(null);
  const nameRef = useRef(null);
  const fileRef = useRef(null);

  const uploadFile = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("file", fileRef.current.files[0]);
      const fetchFile = await fetch(`/api/${user.id}/upload`, {
        method: "POST",
        body: formData
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    window.location.href = "/";
    return;
  }

  return (
    <div className={styles.formContainer}>
      <form action="" className={styles.uploadFileForm} onSubmit={uploadFile}>
        <h2>Upload File</h2>
        <div>
          <label htmlFor="folder">Folder Name: </label>
          <input type="text" name="folder" id="folder" list="folderList" />
          <datalist id="folderList" ref={folderRef}>
            <option value="Hello"></option>
          </datalist>
          <label htmlFor="name">File Name: </label>
          <input type="text" name="name" id="name" ref={nameRef} />
          <label htmlFor="file">File: </label>
          <input type="file" name="file" id="file" ref={fileRef} />
          <button>Upload</button>
        </div>
      </form>
    </div>
  );
};

export default UploadFileForm;
