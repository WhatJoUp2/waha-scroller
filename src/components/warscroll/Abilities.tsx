import { useContext, useMemo, type FC } from "react";
import type { Ability, Unit } from "../../db/aosDB.types";
import { AbilityBox } from "./AbilityBox";
import { ArmyContext } from "../../context/ArmyContext";
import { getEnhancementFromArmy } from "../../db/aosDB";

export interface AbilitiesProps {
  unit: Unit;
}

export const Abilities: FC<AbilitiesProps> = ({ unit }) => {
  const { selectedUnit, includeTraits } = useContext(ArmyContext);
  const abilities = useMemo(() => {
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
  }, [unit, selectedUnit.traits, includeTraits]);

  return (
    <div className="ws-abilities">
      {abilities.map((a) => (
        <AbilityBox key={a.name} ability={a} />
      ))}
    </div>
  );
};
