import { useContext, useRef } from "react";
import { Warscroll } from "../warscroll/Warscroll";
import { toPng } from "@jpinsonneau/html-to-image";
import { Controller } from "../controller/Controller";
import { ArmyContext } from "../../context/ArmyContext";

export const WarscrollMaker = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { selectedUnit } = useContext(ArmyContext);

  const onDownloadImage = () => {
    if (ref.current) {
      toPng(ref.current).then((data) => {
        const link = document.createElement("a");
        link.href = data;
        link.download = selectedUnit.unitName + ".png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };

  return (
    <div className="content">
      <div className="controller">
        <Controller onDownloadImage={onDownloadImage} />
      </div>
      <div className="warscroll-container">
        {selectedUnit.unitName && <Warscroll ref={ref} />}
      </div>
    </div>
  );
};
