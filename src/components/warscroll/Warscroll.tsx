import { useMemo, type FC } from "react";
import type { Unit } from "../../db/aosDB.types";
import "./Warscroll.css";
import { Attacks } from "./Attacks";
import { getWeaponsFromUnit, getNameAndSubtitle } from "../../utils/utils";
import { Characteristics } from "./Characteristics";
import { TornEdgeContainer } from "../tornEdgeContainer/TornEdgeContainer";
import { Abilities } from "./Abilities";
import { Keywords } from "./Keywords";

export interface WarscrollProps {
  army: string;
  unit: Unit;
}

export const Warscroll: FC<WarscrollProps> = ({ unit, army }) => {
  const nameAndSubtitle = useMemo(() => getNameAndSubtitle(unit.name), [unit]);

  return (
    <div className="ws-background">
      <div className="ws-header">
        <Characteristics unit={unit} />
        <TornEdgeContainer className="ws-header-container">
          <div className="ws-header-title">
            <div className="ws-header-title-side"></div>
            <div className="ws-header-title-mid">
              <div>
                <div>• {army} Warscroll •</div>
              </div>
              <div className="ws-header-name">{nameAndSubtitle[0]}</div>
              <div>{nameAndSubtitle[1]}</div>
            </div>
            <div className="ws-header-title-side">
              <div className="ws-header-point">{unit.points}</div> Points
            </div>
          </div>
        </TornEdgeContainer>
      </div>
      <Attacks weapons={getWeaponsFromUnit(unit)} />
      <Abilities unit={unit} />
      <Keywords keywords={unit.keywords} />
    </div>
  );
};
