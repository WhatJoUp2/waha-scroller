import { useContext, useRef, type FC } from "react";
import { Warscroll } from "../warscroll/Warscroll";
import { toPng } from "@jpinsonneau/html-to-image";
import { Controller } from "../controller/Controller";
import { ArmyContext } from "../../context/ArmyContext";
import { ArmyImporter } from "../armyImporter/ArmyImporter";

interface WarscrollMakerProps {
  onUnload: () => void;
}

export const WarscrollMaker: FC<WarscrollMakerProps> = ({ onUnload }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { selectedUnit, selectedAbilityList } = useContext(ArmyContext);

  const onDownloadImage = () => {
    if (ref.current) {
      toPng(ref.current).then((data) => {
        const link = document.createElement("a");
        link.href = data;
        link.download = selectedAbilityList
          ? selectedAbilityList.name + ".png"
          : selectedUnit.unitName + ".png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };

  return (
    <div className="content">
      <div className="controller">
        <Controller onUnload={onUnload} onDownloadImage={onDownloadImage} />
        <ArmyImporter />
      </div>
      <div className="warscroll-container">
        {selectedUnit.unitName && <Warscroll ref={ref} />}
      </div>
    </div>
  );
};
