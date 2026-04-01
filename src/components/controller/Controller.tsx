import type { FC } from "react";
import "./Controller.css";

export interface ControllerProps {
  army: string;
  onArmyChange: (value: string) => void;
  armyList: string[];
  unitName: string;
  onUnitNameChange: (value: string) => void;
  unitList: string[];
  onDownloadImage: () => void;
}

export const Controller: FC<ControllerProps> = ({
  army,
  armyList,
  onArmyChange,
  onDownloadImage,
  onUnitNameChange,
  unitList,
  unitName,
}) => {
  return (
    <div className="controller-container">
      <div className="controller-title">Júlia's Wackass Warscroller</div>
      <div>
        <span>Army: </span>
        <select
          name="Army"
          value={army}
          onChange={(ev) => onArmyChange(ev.currentTarget.value)}
        >
          {armyList.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </div>
      <div>
        <span>Unit: </span>
        <select
          name="Unit"
          value={unitName}
          onChange={(ev) => onUnitNameChange(ev.currentTarget.value)}
        >
          {unitList.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={onDownloadImage}>Download Warscroll!</button>
      </div>
    </div>
  );
};
