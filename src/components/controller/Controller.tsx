import { useContext, useMemo, type FC } from "react";
import "./Controller.css";
import { ArmyContext } from "../../context/ArmyContext";
import { getArmyNames, getUnitNamesFromArmy } from "../../db/aosDB";

export interface ControllerProps {
  onDownloadImage: () => void;
}

export const Controller: FC<ControllerProps> = ({ onDownloadImage }) => {
  const {
    isLowerBrightness,
    selectedUnit,
    setIsLowerBrightness,
    setSelectedUnit,
    setTheme,
    theme,
    includeTraits,
    setIncludeTraits,
  } = useContext(ArmyContext);

  const armyList = useMemo(() => getArmyNames(), []);
  const unitList = useMemo(
    () =>
      selectedUnit.army !== ""
        ? getUnitNamesFromArmy(selectedUnit.army).sort()
        : [],
    [selectedUnit.army],
  );

  const colors = [
    "Black",
    "Yellow",
    "Gray",
    "Blue",
    "Orange",
    "Red",
    "Purple",
    "Green",
  ];

  return (
    <div className="controller-container">
      <div className="controller-title">Júlia's Wackass Warscroller</div>
      <div>
        <span>Army: </span>
        <select
          name="Army"
          value={selectedUnit.army}
          onChange={(ev) => setSelectedUnit({ army: ev.currentTarget.value })}
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
          value={selectedUnit.unitName}
          onChange={(ev) =>
            setSelectedUnit({ unitName: ev.currentTarget.value })
          }
        >
          {unitList.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </div>
      <div>
        <span>Theme: </span>
        <select
          name="Color"
          value={theme}
          onChange={(ev) => setTheme(ev.currentTarget.value)}
        >
          {colors.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <div>
          <span>Lower Brightness (For TTS): </span>
          <input
            checked={isLowerBrightness}
            type="checkbox"
            onChange={(ev) => setIsLowerBrightness(ev.currentTarget.checked)}
          />
        </div>
        <div>
          <span>Include imported traits: </span>
          <input
            checked={includeTraits}
            onChange={(ev) => setIncludeTraits(ev.currentTarget.checked)}
            type="checkbox"
          />
        </div>
      </div>
      <div>
        {/* <button>Clear Database</button> */}
        <button onClick={onDownloadImage}>Download Warscroll!</button>
      </div>
    </div>
  );
};
