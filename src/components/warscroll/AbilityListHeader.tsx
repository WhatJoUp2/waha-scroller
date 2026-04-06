import { useContext } from "react";
import { TornEdgeContainer } from "../tornEdgeContainer/TornEdgeContainer";
import { ArmyContext } from "../../context/ArmyContext";

export const AbilityListHeader = () => {
  const { selectedAbilityList } = useContext(ArmyContext);
  const parsedName = selectedAbilityList!.name.split("/");

  return (
    <div className="ws-header-as">
      <TornEdgeContainer className="ws-header-container-as">
        <div className="ws-header-title">
          <div className="ws-header-title-side"></div>
          <div className="ws-header-title-mid">
            <div>
              <div>• {selectedAbilityList!.army} Warscroll •</div>
            </div>
            <div className="ws-header-name">{parsedName[0]}</div>
            <div>{parsedName[1]}</div>
          </div>
          <div className="ws-header-title-side"></div>
        </div>
      </TornEdgeContainer>
    </div>
  );
};
