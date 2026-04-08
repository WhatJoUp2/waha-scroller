import { useContext, useMemo, useState, type FC } from "react";
import "./ArmyImporter.css";
import {
  parseArmyList,
  splitGimicks,
  type ArmyList,
} from "../../utils/armyListParser";
import { ArmyContext } from "../../context/ArmyContext";
import {
  ARMY_OTHER,
  getBattleTraitsWithFormation,
  getLoreFromArmy,
  getUnitNamesFromArmy,
  getUnitNamesFromManifestationLore,
} from "../../db/aosDB";
import { removeMarkup } from "../../utils/utils";

export const ArmyImporter: FC = () => {
  const {
    selectedUnit,
    setSelectedUnit,
    setSelectedAbilityList,
    selectedAbilityList,
  } = useContext(ArmyContext);
  const [armyListText, setArmyListText] = useState("");
  const [armyList, setArmyList] = useState<ArmyList | null>(null);

  const armyUnitList = useMemo(() => {
    if (armyList?.army) return getUnitNamesFromArmy(armyList.army);
    return [];
  }, [armyList]);

  const [nonGimicks, gimicks] = useMemo(() => {
    if (armyList?.army)
      return splitGimicks(
        getBattleTraitsWithFormation(armyList.army, armyList.formation),
      );
    return [[], []];
  }, [armyList]);

  const manifestationUnits = useMemo(
    () =>
      armyList?.manifestationLore
        ? getUnitNamesFromManifestationLore(
            armyList.army,
            armyList.manifestationLore,
          )
        : [],
    [armyList],
  );

  const handleImportList = () => {
    setArmyList(parseArmyList(armyListText));
  };

  const handleClickUnit = (unitName: string, traits?: string[]) => {
    setSelectedUnit({
      army: armyUnitList.includes(unitName) ? armyList?.army : ARMY_OTHER,
      unitName: unitName,
      traits,
    });
  };

  const isActive = (item: string) => {
    if (selectedAbilityList)
      return item === selectedAbilityList.name ? "active" : "";
    return item === selectedUnit.unitName ? "active" : "";
  };

  return (
    <div className="importer-container">
      <div className="importer-title">
        Army Importer
        {armyList && (
          <button
            className="importer-import-button"
            onClick={() => setArmyList(null)}
          >
            &lt; Back
          </button>
        )}
      </div>
      {armyList && (
        <div className="importer-parsed-container">
          <div>
            <b>
              {armyList.army} ({armyList.formation}):
            </b>
            <button
              className={isActive("Battle Traits /" + armyList.formation)}
              onClick={() => {
                setSelectedAbilityList(
                  armyList.army,
                  "Battle Traits /" + armyList.formation,
                  nonGimicks,
                );
              }}
            >
              Faction Rules
            </button>
            {gimicks.length > 0 && (
              <button
                className={isActive(removeMarkup(gimicks[0].keywords[0]))}
                onClick={() => {
                  setSelectedAbilityList(
                    armyList.army,
                    removeMarkup(gimicks[0].keywords[0]),
                    gimicks,
                  );
                }}
              >
                {removeMarkup(gimicks[0].keywords[0])}
              </button>
            )}
          </div>
          {armyList.spellLore && (
            <div>
              <b>Spell Lore: </b>
              <button
                className={isActive(armyList.spellLore)}
                onClick={() =>
                  setSelectedAbilityList(
                    armyList.army,
                    armyList.spellLore || "",
                    getLoreFromArmy(armyList.army, armyList.spellLore || "")
                      ?.abilities || [],
                  )
                }
              >
                {armyList.spellLore}
              </button>
            </div>
          )}
          {armyList.prayerLore && (
            <div>
              <b>Prayer Lore: </b>
              <button
                className={isActive(armyList.prayerLore)}
                onClick={() =>
                  setSelectedAbilityList(
                    armyList.army,
                    armyList.prayerLore || "",
                    getLoreFromArmy(armyList.army, armyList.prayerLore || "")
                      ?.abilities || [],
                  )
                }
              >
                {armyList.prayerLore}
              </button>
            </div>
          )}
          {armyList.manifestationLore && (
            <div>
              <b>Manifestation Lore ({armyList.manifestationLore}): </b>
              {manifestationUnits.map((u) => (
                <div key={u}>
                  <button
                    className={isActive(u)}
                    onClick={() => handleClickUnit(u, undefined)}
                  >
                    • {u}
                  </button>
                </div>
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
                    onClick={() => handleClickUnit(unit.unitName, unit.traits)}
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
          <button className="importer-import-button" onClick={handleImportList}>
            Import
          </button>
        </>
      )}
    </div>
  );
};
