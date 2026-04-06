import { useContext, useMemo, type FC, type RefObject } from "react";
import "./Warscroll.css";
import { Attacks } from "./Attacks";
import { getWeaponsFromUnit } from "../../utils/utils";
import { Abilities } from "./Abilities";
import { Keywords } from "./Keywords";
import { ArmyContext } from "../../context/ArmyContext";
import { getEnhancementFromArmy, getUnitFromArmy } from "../../db/aosDB";
import { UnitHeader } from "./UnitHeader";
import type { Ability } from "../../db/aosDB.types";
import { AbilityListHeader } from "./AbilityListHeader";

export interface WarscrollProps {
  ref: RefObject<HTMLDivElement | null>;
}

export const Warscroll: FC<WarscrollProps> = ({ ref }) => {
  const {
    selectedUnit,
    selectedAbilityList,
    isLowerBrightness,
    includeTraits,
  } = useContext(ArmyContext);

  const unit = useMemo(
    () => getUnitFromArmy(selectedUnit.army, selectedUnit.unitName),
    [selectedUnit],
  );

  const abilities = useMemo(() => {
    if (selectedAbilityList) {
      return selectedAbilityList.abilities;
    }
    if (!unit) return [];
    let ret: Ability[] = unit.abilities;
    if (includeTraits && selectedUnit.traits) {
      let traits: Ability[] = [];
      selectedUnit.traits.forEach((t) => {
        let trait = structuredClone(
          getEnhancementFromArmy(selectedUnit.army, t),
        );
        if (trait) {
          trait.name = trait.name + " (Enhancement)";
          traits.push(trait);
        }
      });
      ret = [...ret, ...traits];
    }
    return ret;
  }, [unit, selectedUnit.traits, includeTraits, selectedAbilityList]);

  return (
    <div
      className={
        "ws-background " + (isLowerBrightness ? "lower-brightness" : "")
      }
      ref={ref}
    >
      {selectedAbilityList && (
        <>
          <AbilityListHeader />
          <Abilities abilities={abilities} />
        </>
      )}
      {unit && !selectedAbilityList && (
        <>
          <UnitHeader unit={unit} />
          <Attacks weapons={getWeaponsFromUnit(unit)} />
          <Abilities abilities={abilities} />
          <Keywords keywords={unit.keywords} />
        </>
      )}
    </div>
  );
};
