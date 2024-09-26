import { useRef, useState } from "react";
import styles from "../stylesheets/UploadFileForm.module.css";
import { useOutletContext } from "react-router-dom";

const UploadFileForm = () => {
  const [user, setUser, folderList] = useOutletContext();

  const [uploading, setUploading] = useState(false);

  const folderRef = useRef(null);
  const nameRef = useRef(null);
  const fileRef = useRef(null);

  const uploadFile = async (e) => {
    try {
      e.preventDefault();
      setUploading(true);
      const formData = new FormData();
      formData.append("folder", folderRef.current.value);
      formData.append("name", nameRef.current.value);
      formData.append("file", fileRef.current.files[0]);
      const fetchResponse = await fetch(`/api/${user.id}/upload`, {
        method: "POST",
        body: formData
      });
      const data = await fetchResponse.json();
      setUser(data);
      folderRef.current.value = "";
      nameRef.current.value = "";
      fileRef.current.value = "";
      setUploading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    window.location.href = "/";
    return;
  }

  const DisplayUploading = () => {
    if (uploading) {
      return (
        <>
          <h3>UPLOADING FILE...</h3>
        </>
      );
    }
  };

  return (
    <div className={styles.formContainer}>
      <form
        action=""
        className={styles.uploadFileForm}
        onSubmit={uploadFile}
        encType="multipart/form-data"
      >
        <h2>Upload File</h2>
        <div>
          <label htmlFor="folder">Create or Choose a Folder: </label>
          <input type="text" name="folder" id="folder" list="folderList" ref={folderRef} />
          <datalist id="folderList">
            {folderList.map((folder) => (
              <option key={folder.id}>{folder.name}</option>
            ))}
          </datalist>
          <label htmlFor="name">File Name: </label>
          <input type="text" name="name" id="name" ref={nameRef} />
          <label htmlFor="file">File: </label>
          <input type="file" name="file" id="file" ref={fileRef} />
          <button>Upload</button>
        </div>
      </form>
      <DisplayUploading />
    </div>
  );
};

export default UploadFileForm;
