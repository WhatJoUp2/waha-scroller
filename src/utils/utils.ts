import type { Model, Unit, Weapon } from "../db/aosDB.types";

export function getWeaponsFromUnit(unit: Unit): Weapon[] {
  return unit.models.reduce<Weapon[]>(
    (prev, m) => [...prev, ...getWeaponsFromModel(m)],
    [],
  );
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

export function getNameAndSubtitle(name: string): string[] {
  const VALID_SEPARATORS = [",", " with ", " on ", "("];
  let separator = "";
  VALID_SEPARATORS.forEach((s) => {
    if (name.includes(s) && separator === "") separator = s;
  });

  if (separator === "") return [name, ""];

  let parsedName = name.split(separator, 2);

  if (separator === ",") return [parsedName[0] + separator, parsedName[1]];

  return [parsedName[0], separator + parsedName[1]];
}
