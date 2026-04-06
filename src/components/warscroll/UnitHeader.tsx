import { useContext, useMemo, type FC } from "react";
import type { Unit } from "../../db/aosDB.types";
import { ArmyContext } from "../../context/ArmyContext";
import { Characteristics } from "./Characteristics";
import { TornEdgeContainer } from "../tornEdgeContainer/TornEdgeContainer";
import { getNameAndSubtitle } from "../../utils/utils";

export interface UnitHeaderProps {
  unit: Unit;
}

export const UnitHeader: FC<UnitHeaderProps> = ({ unit }) => {
  const { selectedUnit } = useContext(ArmyContext);

  const nameAndSubtitle = useMemo(
    () => (unit ? getNameAndSubtitle(unit.name) : ["", ""]),
    [unit],
  );

  return (
    <div className="ws-header">
      <Characteristics unit={unit} />
      <TornEdgeContainer className="ws-header-container">
        <div className="ws-header-title">
          <div className="ws-header-title-side"></div>
          <div className="ws-header-title-mid">
            <div>
              <div>• {selectedUnit.army} Warscroll •</div>
            </div>
            <div className="ws-header-name">{nameAndSubtitle[0]}</div>
            <div>{nameAndSubtitle[1]}</div>
          </div>
          <div className="ws-header-title-side">
            {unit.points > 0 && (
              <>
                <div className="ws-header-point">{unit.points}</div> Points
              </>
            )}
          </div>
        </div>
      </TornEdgeContainer>
    </div>
  );
};
