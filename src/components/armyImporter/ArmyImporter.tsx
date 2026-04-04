import { useContext, useMemo, useState, type FC } from "react";
import "./ArmyImporter.css";
import { parseArmyList, type ArmyList } from "../../utils/armyListParser";
import { ArmyContext } from "../../context/ArmyContext";
import { ARMY_OTHER, getUnitNamesFromManifestationLore } from "../../db/aosDB";

export const ArmyImporter: FC = () => {
  const { selectedUnit, setSelectedUnit } = useContext(ArmyContext);
  const [armyListText, setArmyListText] = useState("");
  const [armyList, setArmyList] = useState<ArmyList | null>(null);

  const manifestationUnits = useMemo(
    () =>
      armyList?.manifestationLore
        ? getUnitNamesFromManifestationLore(armyList.manifestationLore)
        : [],
    [armyList],
  );

  const handleImportList = () => {
    setArmyList(parseArmyList(armyListText));
  };

  const handleClickUnit = (
    unitName: string,
    isManifestation: boolean = false,
  ) => {
    setSelectedUnit({
      army: isManifestation ? ARMY_OTHER : armyList?.army,
      unitName: unitName,
    });
  };

  const isActive = (unit: string) => {
    return unit === selectedUnit.unitName ? "active" : "";
  };

  return (
    <div className="importer-container">
      <div className="importer-title">
        Army Importer{" "}
        {armyList && <button onClick={() => setArmyList(null)}>X</button>}
      </div>
      {armyList && (
        <div className="importer-parsed-container">
          <div>
            <b>
              {armyList.army} ({armyList.formation}):
            </b>
            <button disabled>Faction Rules</button>
          </div>
          {armyList.spellLore && (
            <div>
              <b>Spell Lore: </b>
              <button disabled>{armyList.spellLore}</button>
            </div>
          )}
          {armyList.prayerLore && (
            <div>
              <b>Prayer Lore: </b>
              <button disabled>{armyList.prayerLore}</button>
            </div>
          )}
          {armyList.manifestationLore && (
            <div>
              <b>Manifestation Lore ({armyList.manifestationLore}): </b>
              {manifestationUnits.map((u) => (
                <button
                  className={isActive(u)}
                  onClick={() => handleClickUnit(u, true)}
                >
                  • {u}
                </button>
              ))}
            </div>
          )}
          {armyList.regiments.map((regiment) => (
            <div key={regiment.name}>
              <b>{regiment.name}:</b>
              {regiment.units.map((unit) => (
                <div key={unit.unitName}>
                  <button
                    className={isActive(unit.unitName)}
                    onClick={() => handleClickUnit(unit.unitName)}
                  >
                    • {unit.unitName}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {!armyList && (
        <>
          <textarea
            value={armyListText}
            onChange={(ev) => setArmyListText(ev.currentTarget.value)}
          />
          <button className="importer-import-button" onClick={handleImportList}>Import</button>
        </>
      )}
    </div>
  );
};
