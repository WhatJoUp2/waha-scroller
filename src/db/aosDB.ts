// import dbJson from "./aosDB.json";
import type { Ability, ArmyEnhancement, DB, Lore, Unit } from "./aosDB.types";

export const ARMY_OTHER = "Manifestations";

let db: DB; //dbJson as any;
let indexedDB: IDBDatabase;
const localStorageName = "savedDB";

// INDEXED DB

export function openDB(successCallback: () => void) {
  const request = window.indexedDB.open(localStorageName);
  request.onsuccess = (ev: any) => {
    if (ev.target) {
      indexedDB = ev.currentTarget.result;
      successCallback();
    }
  };

  request.onupgradeneeded = (event: any) => {
    // Save the IDBDatabase interface
    const db = event.target.result;

    // Create an objectStore for this database
    db.createObjectStore("data", { keyPath: "key" });
  };
}

export function loadDBFromIDB(onLoad: (dataFound: boolean) => void) {
  const transaction = indexedDB.transaction("data", "readwrite");
  const objstore = transaction.objectStore("data");
  const loadedDBRequest = objstore.get("aos");
  loadedDBRequest.onsuccess = () => {
    if (loadedDBRequest.result) {
      db = loadedDBRequest.result.value;
      onLoad(db !== undefined);
    }
  };
  loadedDBRequest.onerror = () => {
    onLoad(false);
  };
}

function saveDB() {
  if (db) {
    const transaction = indexedDB.transaction("data", "readwrite");
    const objstore = transaction.objectStore("data");
    objstore.put({ key: "aos", value: db });
  }
}

export function loadDBFromFile(data: DB): void {
  db = data;
  saveDB();
}

// DB Read

export function getArmyNames(addOther: boolean = true): string[] {
  const keys = Object.keys(db.armies);
  const ret: string[] = [];
  keys.forEach((k) => {
    if (!db.armies[k].isArmyOfRenown) ret.push(k);
  });
  if (addOther) ret.push(ARMY_OTHER);
  return ret;
}

export function getUnitNamesFromArmy(army: string): string[] {
  if (army === ARMY_OTHER) return getUnitsFromUnits().map((u) => u.name);
  return db.armies[army].units.map((u) => u.name);
}

function getUnitsFromArmy(army: string): Unit[] {
  return db.armies[army].units;
}

export function getUnitFromArmy(army: string, unit: string): Unit | null {
  if (army === ARMY_OTHER)
    return getUnitsFromUnits().find((u) => u.name === unit) || null;
  return getUnitsFromArmy(army).find((u) => u.name === unit) || null;
}

function getUnitsFromUnits(): Unit[] {
  return db.units;
}

export function getUnitNamesFromManifestationLore(army: string, lore: string) {
  const armyLore = db.armies[army].upgrades.lores.manifestation.find(
    (m) => m.name === lore,
  );
  if (armyLore) return armyLore.units.map((u) => u.name);
  const loreUni = db.universal.find((u) => u.name === lore);
  if (loreUni === undefined) return [];
  return loreUni.units.map((u) => u.name);
}

export function getEnhancementsFromArmy(army: string): Ability[] {
  if (!db.armies[army]) return [];
  const enhancementObj = db.armies[army].upgrades.enhancements;
  return Object.keys(enhancementObj)
    .map((k) => enhancementObj[k])
    .reduce<ArmyEnhancement[]>((prev, e) => [...prev, ...e], [])
    .reduce<Ability[]>(
      (prev, e) => [
        ...prev,
        ...e.upgrades.reduce<Ability[]>(
          (prev, u) => [...prev, ...u.abilities],
          [],
        ),
      ],
      [],
    );
}

export function getEnhancementFromArmy(
  army: string,
  enhancement: string,
): Ability | undefined {
  return getEnhancementsFromArmy(army).find((u) => u.name === enhancement);
}

export function getLoreFromArmy(army: string, lore: string): Lore | undefined {
  return [
    ...db.armies[army].upgrades.lores.spell,
    ...db.armies[army].upgrades.lores.prayer,
    ...db.armies[army].upgrades.lores.manifestation,
  ].find((l) => l.name.match(lore));
}

export function getBattleTraits(army: string): Ability[] {
  return db.armies[army].upgrades.battleTraits.reduce<Ability[]>(
    (prev, b) => [...prev, ...b.abilities],
    [],
  );
}

export function getBattleFormation(army: string, formation: string): Ability[] {
  return (
    db.armies[army].upgrades.battleFormations.find((f) => f.name === formation)
      ?.abilities || []
  );
}

export function getBattleTraitsWithFormation(
  army: string,
  formation: string,
): Ability[] {
  const markedFormation = getBattleFormation(army, formation).map((f) => ({
    ...f,
    name: "Formation: " + f.name,
  }));
  return [...getBattleTraits(army), ...markedFormation];
}
