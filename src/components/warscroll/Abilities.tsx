import { type FC } from "react";
import type { Ability } from "../../db/aosDB.types";
import { AbilityBox } from "./AbilityBox";

export interface AbilitiesProps {
  abilities: Ability[];
}

export const Abilities: FC<AbilitiesProps> = ({ abilities }) => {
  return (
    <div className="ws-abilities">
      {abilities.map((a) => (
        <AbilityBox key={a.name} ability={a} />
      ))}
    </div>
  );
};
