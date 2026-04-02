import { useRef, type FC } from "react";
import { loadDBFromFile } from "../../db/aosDB";
import "./Loader.css";

interface LoaderProps {
  onLoad: () => void;
}

export const Loader: FC<LoaderProps> = ({ onLoad }) => {
  const ref = useRef<HTMLInputElement>(null);
  const handleLoad = () => {
    if (ref.current && ref.current.files) {
      const reader = new FileReader();
      reader.onload = onReaderLoad;
      reader.readAsText(ref.current.files[0]);
    } else console.log("ERROR");
  };

  const onReaderLoad = (event: ProgressEvent<FileReader>) => {
    if (event.target && event.target.result) {
      var obj = JSON.parse(event.target.result as string);
      console.log(obj);
      loadDBFromFile(obj);
      onLoad();
    }
  };

  return (
    <div className="content">
      <div className="loader-container">
        <div className="loader-title">
          No data detected, please upload unit information
        </div>
        <div>
          <span>Data File:</span>
          <input type="file" accept=".json" ref={ref} />
        </div>
        <button onClick={handleLoad}>Load</button>
      </div>
    </div>
  );
};
