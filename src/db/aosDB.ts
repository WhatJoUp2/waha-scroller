import dbJson from "./aosDB.json";
import type { DB, Unit } from "./aosDB.types";

const db: DB = dbJson as any;

export function getByPath() {
  return db.units[0];
}

export function getUnits(): Unit[] {
  return (dbJson as DB).units;
}

function getUnitsFromArmy(army: string): Unit[] {
  return db.armies[army].units;
}

export function getUnitFromArmy(army: string, unit: string): Unit | null {
  return getUnitsFromArmy(army).find((u) => u.name === unit) || null;
}
