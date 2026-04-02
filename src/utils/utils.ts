import type { Model, Unit, Weapon } from "../db/aosDB.types";

export function getWeaponsFromUnit(unit: Unit): Weapon[] {
  const weapons = unit.models.reduce<Weapon[]>(
    (prev, m) => [...prev, ...getWeaponsFromModel(m)],
    [],
  );
  return uniqueWeapons(weapons);
}

function getWeaponsFromModel(model: Model): Weapon[] {
  const basic = Object.keys(model.weapons.basic).reduce<Weapon[]>(
    (prev, key) => [...prev, ...model.weapons.basic[key].weapons],
    [],
  );
  const advanced = Object.keys(model.weapons.advanced).reduce<Weapon[]>(
    (prev, key) => [...prev, ...model.weapons.advanced[key].weapons],
    [],
  );

  return [...basic, ...advanced];
}

function uniqueWeapons(weapons: Weapon[]): Weapon[] {
  return weapons.reduce<Weapon[]>((prev: Weapon[], w) => {
    if (prev.findIndex((ww) => ww.name === w.name) === -1) return [...prev, w];
    return prev;
  }, []);
}

export function getNameAndSubtitle(name: string): string[] {
  const VALID_SEPARATORS = [",", " with ", " on ", "(", "["];
  let separator = "";
  VALID_SEPARATORS.forEach((s) => {
    if (name.includes(s) && separator === "") separator = s;
  });

  if (separator === "") return [name, ""];

  let parsedName = name.split(separator, 2);

  if (separator === ",") return [parsedName[0] + separator, parsedName[1]];

  return [parsedName[0], separator + parsedName[1]];
}

export function getCostTypeFromKeywords(keywords: string[]): string {
  for (const k of keywords) {
    if (k.includes("Spell")) return "spell";
    if (k.includes("Prayer")) return "prayer  ";
  }
  return "command";
}
