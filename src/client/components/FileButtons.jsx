import { useRef } from "react";
import styles from "../stylesheets/FileButtons.module.css";
import Icon from "@mdi/react";
import { mdiDownloadBox, mdiTrashCan } from "@mdi/js";

const FileButtons = (props) => {
  const downloadLink = useRef(null);

  const deleteFile = async () => {
    const response = await fetch(
      `/api/${props.user.id}/${props.selectedFolder.id}/delete/${props.file.id}`,
      {
        method: "DELETE"
      }
    );
    const data = await response.json();
    props.setFiles(data);
  };

  const downloadFile = () => {
    const start = props.file.url.substr(0, 50);
    const end = props.file.url.slice(49);
    const url = start + `fl_attachment:${props.file.name}` + end;
    downloadLink.current.href = url;
    downloadLink.current.click();
  };

  const DisplayFileSize = (props) => {
    // Using base 2 conversion
    if (props.file.size / 1048576 < 1024) {
      return <p>{(props.file.size / 1048576).toFixed(2)} MB</p>;
    } else {
      return <p>{(props.file.size / 1073741824).toFixed(2)} GB</p>;
    }
  };

  return (
    <div className={styles.file_buttons}>
      <Icon path={mdiDownloadBox} title="Download" onClick={downloadFile}></Icon>
      <DisplayFileSize file={props.file} />
      <Icon path={mdiTrashCan} title="Delete" onClick={deleteFile}></Icon>
      <a ref={downloadLink} href=""></a>
    </div>
  );
};

export default FileButtons;
