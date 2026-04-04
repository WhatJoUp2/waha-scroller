import { useState, type FC } from "react";
import "./ArmyImporter.css";
import { parseArmyList } from "../../utils/armyListParser";

export const ArmyImporter: FC = () => {
  const [armyList, setArmyList] = useState("");

  const handleImportList = () => {
    parseArmyList(armyList);
  };

  return (
    <div className="importer-container">
      <div className="importer-title">Army Importer</div>
      <textarea
        value={armyList}
        onChange={(ev) => setArmyList(ev.currentTarget.value)}
      />
      <button onClick={handleImportList}>Import</button>
    </div>
  );
};
