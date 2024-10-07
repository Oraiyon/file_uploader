import { useRef } from "react";
import styles from "../stylesheets/FileButtons.module.css";
import Icon from "@mdi/react";
import { mdiDownload, mdiClose } from "@mdi/js";

const FileButtons = (props) => {
  const downloadLink = useRef(null);

  const downloadFile = () => {
    const start = props.file.url.substr(0, 50);
    const end = props.file.url.slice(49);
    const url = start + `fl_attachment:${props.file.name}` + end;
    downloadLink.current.href = url;
    downloadLink.current.click();
  };

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

  return (
    <div className={styles.file_buttons}>
      <button>
        <Icon path={mdiDownload} title="Download" onClick={downloadFile}></Icon>
      </button>
      <h3>
        {props.file.name}.{props.file.format}
      </h3>
      <button>
        <Icon path={mdiClose} title="Delete" onClick={deleteFile}></Icon>
      </button>
      <a ref={downloadLink} href=""></a>
    </div>
  );
};

export default FileButtons;
