import { useState, type FC } from "react";
import "./Controller.css";

export interface ControllerProps {
  army: string;
  onArmyChange: (value: string) => void;
  armyList: string[];
  unitName: string;
  onUnitNameChange: (value: string) => void;
  unitList: string[];
  onDownloadImage: () => void;
  lowerBrightness: boolean;
  onLowerBrightnessChange: (value: boolean) => void;
}

export const Controller: FC<ControllerProps> = ({
  army,
  armyList,
  onArmyChange,
  onDownloadImage,
  onUnitNameChange,
  unitList,
  unitName,
  lowerBrightness,
  onLowerBrightnessChange,
}) => {
  const [colorTheme, setColorTheme] = useState("Black");

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

  const handleChangeColor = (color: string) => {
    setColorTheme(color);
    const r: any = document.querySelector(":root");
    const mainColor = getComputedStyle(r).getPropertyValue(
      "--ability-" + color.toLowerCase(),
    );
    const mainColorFilter = getComputedStyle(r).getPropertyValue(
      "--ability-" + color.toLowerCase() + "-filter",
    );

    r.style.setProperty("--faction-main-color", mainColor);
    r.style.setProperty("--faction-main-color-filter", mainColorFilter);
  };

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
        <span>Theme: </span>
        <select
          name="Color"
          value={colorTheme}
          onChange={(ev) => handleChangeColor(ev.currentTarget.value)}
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
            checked={lowerBrightness}
            type="checkbox"
            onChange={(ev) => onLowerBrightnessChange(ev.currentTarget.checked)}
          />
        </div>
        <button onClick={onDownloadImage}>Download Warscroll!</button>
      </div>
    </div>
  );
};
