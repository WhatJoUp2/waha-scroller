import {
  createContext,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import { getUnitNamesFromArmy } from "../db/aosDB";
import type { Ability } from "../db/aosDB.types";

interface ArmyContextI {
  selectedUnit: {
    army: string;
    unitName: string;
    traits?: string[];
  };
  setSelectedUnit: (
    selectedUnit: Partial<{ army: string; unitName: string; traits: string[] }>,
  ) => void;
  selectedAbilityList?: {
    army: string;
    name: string;
    abilities: Ability[];
  };
  setSelectedAbilityList: (
    army: string,
    name: string,
    abilities: Ability[],
  ) => void;
  theme: string;
  setTheme: (value: string) => void;
  isLowerBrightness: boolean;
  setIsLowerBrightness: (value: boolean) => void;
  includeTraits: boolean;
  setIncludeTraits: (value: boolean) => void;
}

const initialArmyContext: ArmyContextI = {
  selectedUnit: {
    army: "Beasts of Chaos",
    unitName: "Beastlord",
  },
  setSelectedUnit: () => {},
  selectedAbilityList: {
    army: "",
    name: "",
    abilities: [],
  },
  setSelectedAbilityList: () => {},
  theme: "Black",
  setTheme: () => {},
  isLowerBrightness: true,
  setIsLowerBrightness: () => {},
  includeTraits: true,
  setIncludeTraits: () => {},
};

export const ArmyContext = createContext<ArmyContextI>(initialArmyContext);

export const ArmyContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedUnit, setSelectedUnit] = useState<{
    army: string;
    unitName: string;
    traits?: string[];
  }>(initialArmyContext.selectedUnit);
  const [selectedAbilityList, setSelectedAbilityList] = useState<
    | {
        army: string;
        name: string;
        abilities: Ability[];
      }
    | undefined
  >();
  const [theme, setTheme] = useState(initialArmyContext.theme);
  const [isLowerBrightness, setIsLowerBrightness] = useState(
    initialArmyContext.isLowerBrightness,
  );
  const [includeTraits, setIncludeTraits] = useState(
    initialArmyContext.includeTraits,
  );

  const handleSetSelectedUnit = (
    value: Partial<{ army: string; unitName: string; traits: string[] }>,
  ) => {
    const newTraits = value.traits || [];
    if (value.army && value.unitName) {
      setSelectedUnit({
        army: value.army,
        unitName: value.unitName,
        traits: newTraits,
      });
    } else if (value.unitName) {
      setSelectedUnit({
        army: selectedUnit.army,
        unitName: value.unitName,
        traits: newTraits,
      });
    } else if (value.army) {
      setSelectedUnit({
        army: value.army,
        unitName: getUnitNamesFromArmy(value.army)[0],
        traits: newTraits,
      });
    }
    setSelectedAbilityList(undefined);
  };

  const handleSetSelectAbilityList = (
    army: string,
    name: string,
    abilities: Ability[],
  ) => {
    setSelectedAbilityList({ army, abilities, name });
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
        selectedAbilityList,
        setSelectedAbilityList: handleSetSelectAbilityList,
        theme,
        setTheme: handleSetTheme,
        isLowerBrightness,
        setIsLowerBrightness,
        includeTraits,
        setIncludeTraits,
      }}
    >
      {children}
    </ArmyContext.Provider>
  );
};
