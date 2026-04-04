import { useContext, useMemo, type FC, type RefObject } from "react";
import "./Warscroll.css";
import { Attacks } from "./Attacks";
import { getWeaponsFromUnit, getNameAndSubtitle } from "../../utils/utils";
import { Characteristics } from "./Characteristics";
import { TornEdgeContainer } from "../tornEdgeContainer/TornEdgeContainer";
import { Abilities } from "./Abilities";
import { Keywords } from "./Keywords";
import { ArmyContext } from "../../context/ArmyContext";
import { getUnitFromArmy } from "../../db/aosDB";

export interface WarscrollProps {
  ref: RefObject<HTMLDivElement | null>;
}

export const Warscroll: FC<WarscrollProps> = ({ ref }) => {
  const { selectedUnit, isLowerBrightness } = useContext(ArmyContext);

  const unit = useMemo(
    () => getUnitFromArmy(selectedUnit.army, selectedUnit.unitName),
    [selectedUnit],
  );
  const nameAndSubtitle = useMemo(
    () => (unit ? getNameAndSubtitle(unit.name) : ["", ""]),
    [unit],
  );

  return (
    <div
      className={
        "ws-background " + (isLowerBrightness ? "lower-brightness" : "")
      }
      ref={ref}
    >
      {unit && (
        <>
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
                      <div className="ws-header-point">{unit.points}</div>{" "}
                      Points
                    </>
                  )}
                </div>
              </div>
            </TornEdgeContainer>
          </div>
          <Attacks weapons={getWeaponsFromUnit(unit)} />
          <Abilities unit={unit} />
          <Keywords keywords={unit.keywords} />
        </>
      )}
    </div>
  );
};
