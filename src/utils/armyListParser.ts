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

import type { Ability } from "../db/aosDB.types";

export interface ArmyList {
  army: string;
  formation: string;
  spellLore?: string;
  prayerLore?: string;
  manifestationLore?: string;
  regiments: Regiment[];
}

export interface Regiment {
  name: string;
  units: {
    unitName: string;
    traits: string[];
  }[];
}

function withoutCost(line: string) {
  return line.split(/ \(\d*\)/)[0];
}

function getRegimentFromBlock(block: string): Regiment | null {
  const lines = block.split(/\n/);
  if (
    lines[0].match("Regiment") ||
    lines[0].match("Auxiliary") ||
    lines[0].match("Faction Terrain")
  ) {
    const name = lines[0];
    let units: { unitName: string; traits: string[] }[] = [];
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].match("• ")) {
        units[units.length - 1].traits.push(lines[i].split("• ")[1]);
      } else {
        units.push({ unitName: withoutCost(lines[i]), traits: [] });
      }
    }
    return { name, units };
  }
  return null;
}

export function parseArmyList(list: string): ArmyList {
  const listBlocks = list.split(/\n\n/gm);
  const infoLines = listBlocks[1].split(/\n/);
  const regiments: Regiment[] = [];

  const spellLoreLine = infoLines.find((line) => line.match("Spell"));
  const spellLore = spellLoreLine
    ? withoutCost(spellLoreLine.split(" - ")[1])
    : undefined;

  const prayerLoreLine = infoLines.find((line) => line.match("Prayer"));
  const prayerLore = prayerLoreLine
    ? withoutCost(prayerLoreLine.split(" - ")[1])
    : undefined;

  const manifestationLoreLine = infoLines.find((line) =>
    line.match("Manifestation"),
  );
  const manifestationLore = manifestationLoreLine
    ? withoutCost(manifestationLoreLine.split(" - ")[1])
    : undefined;

  for (let i = 2; i < listBlocks.length; i++) {
    const regiment = getRegimentFromBlock(listBlocks[i]);
    if (regiment) regiments.push(regiment);
  }

  return {
    army: infoLines[0],
    formation: withoutCost(infoLines[1]),
    regiments: regiments,
    manifestationLore,
    prayerLore,
    spellLore,
  };
}

export function splitGimicks(list: Ability[]): Ability[][] {
  const nonGimick = list.filter((a) => a.keywords.length === 0);
  const gimick = list.filter((a) => a.keywords.length !== 0);
  return [nonGimick, gimick];
}
