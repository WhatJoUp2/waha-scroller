import {
  createContext,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import { getUnitNamesFromArmy } from "../db/aosDB";

interface ArmyContextI {
  selectedUnit: {
    army: string;
    unitName: string;
  };
  setSelectedUnit: (
    selectedUnit: Partial<{ army: string; unitName: string }>,
  ) => void;
  theme: string;
  setTheme: (value: string) => void;
  isLowerBrightness: boolean;
  setIsLowerBrightness: (value: boolean) => void;
}

const initialArmyContext: ArmyContextI = {
  selectedUnit: {
    army: "Beasts of Chaos",
    unitName: "Beastlord",
  },
  setSelectedUnit: () => {},
  theme: "Black",
  setTheme: () => {},
  isLowerBrightness: true,
  setIsLowerBrightness: () => {},
};

export const ArmyContext = createContext<ArmyContextI>(initialArmyContext);

export const ArmyContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedUnit, setSelectedUnit] = useState<{
    army: string;
    unitName: string;
  }>(initialArmyContext.selectedUnit);
  const [theme, setTheme] = useState(initialArmyContext.theme);
  const [isLowerBrightness, setIsLowerBrightness] = useState(
    initialArmyContext.isLowerBrightness,
  );

  const handleSetSelectedUnit = (
    value: Partial<{ army: string; unitName: string }>,
  ) => {
    if (value.army && value.unitName) {
      setSelectedUnit({
        army: value.army,
        unitName: value.unitName,
      });
    } else if (value.unitName) {
      setSelectedUnit({
        army: selectedUnit.army,
        unitName: value.unitName,
      });
    } else if (value.army) {
      setSelectedUnit({
        army: value.army,
        unitName: getUnitNamesFromArmy(value.army)[0],
      });
    }
  };

  const handleSetTheme = (color: string) => {
    setTheme(color);
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
    <ArmyContext.Provider
      value={{
        selectedUnit,
        setSelectedUnit: handleSetSelectedUnit,
        theme,
        setTheme: handleSetTheme,
        isLowerBrightness: isLowerBrightness,
        setIsLowerBrightness: setIsLowerBrightness,
      }}
    >
      {children}
    </ArmyContext.Provider>
  );
};
