import type { FC } from "react";
import type { Unit } from "../../db/aosDB.types";
import "./Warscroll.css";

interface CharacteristicsProps {
  unit: Unit;
}

export const Characteristics: FC<CharacteristicsProps> = ({ unit }) => {
  return (
    <div className="ws-char-wrapper">
      <div className="ws-char-wrapper-top ">{unit.move}</div>
      <div className="ws-char-wrapper-mid">
        <div className="ws-char-wrapper-mid-left">{unit.health}</div>
        <div className="ws-char-wrapper-mid-right">{unit.save}</div>
      </div>
      <div>{unit.control}</div>
    </div>
  );
};
