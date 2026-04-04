/* EXAMPLE LIST

Good Neighbors 1.5k v2 1480/1500 pts

Maggotkin of Nurgle
Tallyband of Nurgle
General's Handbook 2025-26
Drops: 3
Wounds: 103
Spell Lore - Lore of Malignance
Prayer Lore - Lore of Virulence
Manifestation Lore - Morbid Conjuration (20)

Battle Tactic Cards: Intercept and Recover, Wrathful Cycles

General's Regiment
Rotigus (Scourge of Ghyran) (430)
• General
Sloven Knights (180)

Regiment 1
Horticulous Slimux (140)
Beast of Nurgle (110)

Regiment 2
Rotbringer Sorcerer (100)
• Gift of Febrile Frenzy
Lord of Plagues (100)
• The Witherstave
Rotswords (400)
• Reinforced

Faction Terrain
Feculent Gnarlmaw


Created with Sigdex: sigdex.io
App Version: 18.0.13
Server Version: 3.0.9
Data Version: v40
*/

export interface ArmyList {
  army: string;
  formation: string;
  spellLore?: string;
  prayerLore?: string;
  manifestationLore?: string;
  regiments: Regiment[];
  factionTerrain?: string;
}

export interface Regiment {
  name: string;
  units: {
    unitName: string;
    traits: string[];
  }[];
}

export function parseArmyList(list: string): ArmyList {
  const listBlocks = list.split(/\n\n/gm);
  const infoLines = listBlocks[1].split(/\n/);
  // TODO REMOVE
  console.log(infoLines);

  const spellLoreLine = infoLines.find((line) => line.match("Spell"));
  // const spellLore = spellLoreLine ?  : "";

  console.log(spellLoreLine);

  return {
    army: infoLines[0],
    formation: infoLines[1],
  };
}
