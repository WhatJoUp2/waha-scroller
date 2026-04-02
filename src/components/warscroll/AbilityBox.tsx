import { useMemo, type FC } from "react";
import type { Ability } from "../../db/aosDB.types";
import { ParseMarkdown } from "../parseMarkdown/ParseMarkdown";
import { getAbilityTypeImage } from "../../assets/images/abilityTypes";
import { TornEdgeContainer } from "../tornEdgeContainer/TornEdgeContainer";
import { getCostTypeFromKeywords } from "../../utils/utils";

export interface AbilityBoxProps {
  ability: Ability;
}

export const AbilityBox: FC<AbilityBoxProps> = ({ ability }) => {
  const costType = useMemo(
    () => (ability.cost ? getCostTypeFromKeywords(ability.keywords) : ""),
    [ability],
  );
  return (
    <div className="ws-ability-wrapper">
      <div className={"ws-ability-container " + ability.color + "-border"}>
        <TornEdgeContainer
          className={"ws-ability-timing-torn " + ability.color + "-filter"}
          horizontal
        >
          <div className={"ws-ability-timing " + ability.color}>
            <img src={getAbilityTypeImage(ability.typeAttribute)} />
            <ParseMarkdown markdown={ability.timing} />
          </div>
        </TornEdgeContainer>
        {ability.cost && (
          <div className={"ws-cost " + costType}>{ability.cost}</div>
        )}
        <div className="ws-ability-body">
          <div className="ws-ability-name">
            <b>{ability.name}</b>
          </div>
          {ability.declare && (
            <div>
              <span className="smallcaps">
                <b>Declare:</b>
              </span>{" "}
              <ParseMarkdown markdown={ability.declare} />
            </div>
          )}
          <div>
            <span className="smallcaps">
              <b>Effect:</b>
            </span>{" "}
            <ParseMarkdown markdown={ability.effect} />
          </div>
        </div>
        {ability.keywords.length > 0 && (
          <div
            className={
              "ws-ability-keywords-container " + ability.color + "-border"
            }
          >
            <div className={"ws-ability-keywords-title " + ability.color}>
              Keywords
            </div>
            <div className="ws-ability-keywords-list">
              <ParseMarkdown
                markdown={ability.keywords.reduce(
                  (prev, k) => prev + (prev.length > 0 ? ", " : "") + k,
                  "",
                )}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
