import dbJson from "./aosDB.json";
import type { DB, Unit } from "./aosDB.types";

const db: DB = dbJson as any;

export function getArmyNames(): string[] {
  const keys = Object.keys(db.armies);
  const ret: string[] = [];
  keys.forEach((k) => {
    if (!db.armies[k].isArmyOfRenown) ret.push(k);
  });
  return ret;
}

export function getUnitNamesFromArmy(army: string) {
  return db.armies[army].units.map((u) => u.name);
}

function getUnitsFromArmy(army: string): Unit[] {
  return db.armies[army].units;
}

export function getUnitFromArmy(army: string, unit: string): Unit | null {
  return getUnitsFromArmy(army).find((u) => u.name === unit) || null;
}
