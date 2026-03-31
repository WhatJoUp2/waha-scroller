import type { FC } from "react";
import type { Unit } from "../../db/aosDB.types";
import { AbilityBox } from "./AbilityBox";

export interface AbilitiesProps {
  unit: Unit;
}

export const Abilities: FC<AbilitiesProps> = ({ unit }) => {
  return (
    <div className="ws-abilities">
      {unit.abilities.map((a) => (
        <AbilityBox key={a.name} ability={a} />
      ))}
    </div>
  );
};
